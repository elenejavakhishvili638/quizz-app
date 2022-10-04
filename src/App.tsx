import React, {useEffect, useState} from 'react';
import './App.css';
import Loading from './components/Loading';
import Questions from './components/Questions';
import {shuffleArray} from "./components/utils"

interface Data {
  category: string
  correct_answer: string
  difficulty: string
  incorrect_answers: string[]
  question: string
  type: string
}

type QuestionState = Data & {answers: string[]}

interface UserAnswer {
  question: string
  answer: string
  isCorrect: boolean
  correctAnswer: string
}

const App: React.FC = () => {

  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<QuestionState[]>([])
  const [questionNr, setQuestionNr] = useState<number>(0)
  const [score, setScore] = useState<number>(0)
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([])
  // const [questions, setQuestions] = useState([])
  const [gameOver, setGameOver] = useState(true)
  const [start, setStart] = useState(false)

  const fetchQuestions = () => {
    setLoading(true)
    fetch("https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple").then((res) => res.json()).then((data) => {
      setData(data.results.map((question: Data) => (
        {...question, answers: shuffleArray([...question.incorrect_answers, question.correct_answer])}
      )))
      // setData(data.results)
      setLoading(false)
    })
  }

  // useEffect(() => {
  //   fetchQuestions()
  // },[])

  console.log(data)

  // const {question} = data[questionNr]

  const startGame = () => {
    fetchQuestions()
                setStart(true)
                setGameOver(false)
                setScore(0)
                setQuestionNr(0)
  }

  const checkAnswer = () => {}


  return (
    <div className='main'>
      <h1>Quiz</h1>
      {gameOver || userAnswers.length === data.length ? (
              <button onClick={startGame}>Start</button>
      ) : null}
      {!gameOver && <p>Score:</p>}
      {loading && <Loading />}
      {data.length > 1 && (
        <Questions 
        questionNr={questionNr + 1}
        question={data[questionNr] && data[questionNr].question}
        answers={data[questionNr] && data[questionNr].answers}
        totalQuestions={data.length}
        userAnswer={userAnswers ? userAnswers[questionNr] : undefined}
        callback={checkAnswer}
      />
      )}

      {/* {loading ? <Loading /> : (
        <div>
          <p>Score:</p>
          <Questions 
          questionNr={questionNr + 1}
          question={data[questionNr] && data[questionNr].question}
          answers={data[questionNr] && data[questionNr].answers}
          totalQuestions={data.length}
          userAnswer={userAnswers ? userAnswers[questionNr] : undefined}
          callback={checkAnswer}
        />
        </div>
      )} */}

      {/* {start ? 
      (
      <div>
        <p>Score:</p>
        {loading ? <Loading /> : <Questions 
          questionNr={questionNr + 1}
          question={data[questionNr] && data[questionNr].question}
          answers={data[questionNr] && data[questionNr].answers}
          totalQuestions={data.length}
          userAnswer={userAnswers ? userAnswers[questionNr] : undefined}
          callback={checkAnswer}
        />}
        
        <button onClick={() => setQuestionNr((prevValue) => prevValue + 1)}>Next question</button>
      </div>) : null
    } */}
      {!gameOver && !loading &&  (questionNr < data.length - 1 ?<button onClick={() => setQuestionNr((prevValue) => prevValue + 1)}>Next question</button> : <button onClick={startGame}>start over</button>)}
      
    </div>
  )
}

export default App
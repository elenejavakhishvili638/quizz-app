import React, {useState} from 'react';
import './App.css';
import Loading from './components/Loading';
import {shuffleArray} from "./components/utils"
import Questions from "./components/Questions"
import {Data, QuestionState, UserAnswer} from "./components/interfaces/dataInterface"

const App: React.FC = () => {

  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<QuestionState[]>([])
  const [questionNr, setQuestionNr] = useState<number>(0)
  const [score, setScore] = useState<number>(0)
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([])
  const [gameOver, setGameOver] = useState(true)
  const [show, setShow] = useState(false);


  const fetchQuestions = () => {
    setLoading(true)
    fetch("https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple").then((res) => res.json()).then((data) => {
      setData(data.results.map((question: Data) => (
        {...question, answers: shuffleArray([...question.incorrect_answers, question.correct_answer])}
      )))
      setLoading(false)
    })
  }



  const startGame = () => {
    fetchQuestions()
    setGameOver(false)
    setScore(0)
    setQuestionNr(0)
  }

  const checkAnswer = (userAnswer: string) => {
    setShow(true)
    const correctAnswer = data[questionNr].correct_answer === userAnswer
    if (correctAnswer) {
      setScore((prevValue) => prevValue + 1)
      
    } 

    let holdAnswers = userAnswers.filter((item) => item.answer !== userAnswer)

    const answer = {
      question: data[questionNr].question,
      answer: userAnswer,
      isCorrect: correctAnswer,
      correctAnswer: data[questionNr].correct_answer
    }
    setUserAnswers([...holdAnswers, answer])
  }



  const manageClassName = (userAnswer: string) => {
    if(data[questionNr].correct_answer === userAnswer) {
      // console.log("correct");
      return "correct";
    } else {

      for (let i = 0; i<userAnswers.length; i++) {
        if (userAnswers[i] && userAnswers[i].answer === userAnswer) {
          console.log(userAnswers[i])
          return "wrong"
        }
      }
    }
   

    return "";
  }

  

  return (
    <div className='main'> 
      <h1>Quiz</h1>
      {/* || userAnswers.length === data.length */}
      {gameOver  ? (
              <button className='start' onClick={startGame}>Start</button>
      ) : null}
      {!gameOver && <p className='score'>{`Score: ${score}`}</p>}
      {loading && <Loading />}
      {data.length > 1 && (
         <div className='questions-container'>
          <Questions 
            question={data[questionNr] && data[questionNr].question}
            answers={data[questionNr] && data[questionNr].answers}
            callback={checkAnswer}
            show={show}
            manageClassName={manageClassName}
            questionNr={questionNr + 1}
            totalQuestions={data.length}
            userAnswer={userAnswers ? userAnswers[questionNr] : undefined}
          />
       </div>
      )}

     
      {!gameOver && !loading &&  (questionNr < data.length - 1 ? <button className='next-question' onClick={() => {
        if(show) {

          setQuestionNr((prevValue) => prevValue + 1)
          setShow(false)
        } else {
          return 
        }
        }}>Next question</button> : <button className='start-over' onClick={() => {window.location.reload();}}>start over</button>)}
      
    </div>
  )
}


export default App

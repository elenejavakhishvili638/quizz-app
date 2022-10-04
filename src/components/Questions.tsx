import React from 'react'
import "./Questions.css" 
import {Props} from "./interfaces/propsInterface"

const Questions: React.FC<Props> = ({question, answers, questionNr, totalQuestions, callback, userAnswer}) => {
  return (
    <div>
      <p>{`Question: ${questionNr}/${totalQuestions}`}</p>
      <p>{question}</p>
      {answers && answers.map((answer, index) => (
        <button key={index} >{answer}</button>
      ))}
    </div>
  )
}


export default Questions

// {question, answers, questionNr, totalQuestions, callback, userAnswer}
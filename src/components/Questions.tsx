import React from 'react'
import "./Questions.css" 
import {Props} from "./interfaces/propsInterface"
import {decodeHtml} from "./utils"

const Questions: React.FC<Props> = ({question, answers, callback, show, manageClassName, questionNr, totalQuestions, userAnswer}) => {
  
  
  return (
    <div className='questions-content'>
      <p className='question-number'>{`Question: ${questionNr}/${totalQuestions}`}</p>
      <p className='question'>{decodeHtml(question)}</p>
      <div className='btn-container'>
      {answers && answers.map((answer, index) => (
          <button key={index} value={answer} disabled={userAnswer ? true : false} onClick={() => callback(answer)} className={`default ${show && manageClassName(answer)}`} >{decodeHtml(answer)}</button>
          ))}
          </div>
    </div>
  )
}


export default Questions
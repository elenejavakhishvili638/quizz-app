import React from 'react'
import "./Questions.css" 
import {Props} from "./interfaces/propsInterface"
import {decodeHtml} from "./utils"

const Questions: React.FC<Props> = ({question, answers, callback, show, manageClassName, questionNr, totalQuestions}) => {
  
  
  return (
    <div>
      <p>{`Question: ${questionNr}/${totalQuestions}`}</p>
      <p>{decodeHtml(question)}</p>
      {answers && answers.map((answer, index) => (
        <button key={index} value={answer} onClick={() => callback(answer)} className={`default ${show && manageClassName(answer)}`} >{decodeHtml(answer)}</button>
      ))}
    </div>
  )
}


export default Questions
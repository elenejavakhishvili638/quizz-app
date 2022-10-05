import { UserAnswer } from "../interfaces/dataInterface"

export interface Props {
    question: string
    answers: string[]
    callback: any
    show: boolean
    manageClassName: any
    questionNr: number
    totalQuestions: number
    userAnswer: UserAnswer | undefined
}
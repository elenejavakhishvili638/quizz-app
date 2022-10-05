export interface Data {
    category: string
    correct_answer: string
    difficulty: string
    incorrect_answers: string[]
    question: string
    type: string
}

export type QuestionState = Data & { answers: string[] }

export interface UserAnswer {
    question: string
    answer: string
    isCorrect: boolean
    correctAnswer: string
}
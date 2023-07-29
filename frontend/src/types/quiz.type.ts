export type QuizType = {
    id: number,
    name: string,
    questions: Array<{ id: number, questioin: string, answers: Array<{ id: number, answer: string}> }>

}
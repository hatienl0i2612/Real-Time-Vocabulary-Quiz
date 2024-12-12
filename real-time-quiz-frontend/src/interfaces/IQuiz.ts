export interface IQuestion {
    question: string;
    options: string[];
    id: string;
}

export interface IQuestionForm {
    questionId: string;
    answer: string;
}

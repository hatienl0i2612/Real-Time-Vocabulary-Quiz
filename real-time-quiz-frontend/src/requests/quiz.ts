import { IQuestionForm } from '../interfaces/IQuiz';
import { axiosInstance } from './base';

export const getQuestionsByQuizId = async (quizId: string) => {
    try {
        const resp = await axiosInstance.get('/quiz/questions', {
            params: { quizId },
        });
        return resp.data;
    } catch {
        return [];
    }
};

export const submitQuiz = async (
    userId: string,
    quizId: string,
    questionForm: IQuestionForm[]
) => {
    try {
        const resp = await axiosInstance.post('/quiz/submit', {
            userId,
            quizId,
            answers: questionForm,
        });
        return resp.data;
    } catch {
        return [];
    }
};

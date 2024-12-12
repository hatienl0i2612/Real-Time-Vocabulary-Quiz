import { create } from 'zustand';
import { IParticipant } from '../interfaces/IParticipant';
import { IQuestion, IQuestionForm } from '../interfaces/IQuiz';

type QuizStoreState = {
    quizId: string;
    setQuizId: (value: string) => void;
    userId: string;
    setUserId: (value: string) => void;
    questions: IQuestion[];
    setQuestions: (value: IQuestion[]) => void;
    participants: IParticipant[];
    setParticipants: (value: IParticipant[]) => void;
    joined: boolean;
    setJoined: (value: boolean) => void;
    questionForm: IQuestionForm[];
    setQuestionForm: (value: IQuestionForm[]) => void;
};

const useQuizStore = create<QuizStoreState>((set) => ({
    quizId: '',
    setQuizId: (value: string) => set({ quizId: value }),

    userId: '',
    setUserId: (value: string) => set({ userId: value }),

    questions: [],
    setQuestions: (value: IQuestion[]) => set({ questions: value }),

    participants: [],
    setParticipants: (value: IParticipant[]) => set({ participants: value }),

    joined: false,
    setJoined: (value: boolean) => set({ joined: value }),

    questionForm: [],
    setQuestionForm: (value: IQuestionForm[]) => set({ questionForm: value }),
}));

export default useQuizStore;

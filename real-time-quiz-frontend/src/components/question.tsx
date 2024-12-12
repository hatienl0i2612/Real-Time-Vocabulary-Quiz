import { IQuestion } from '../interfaces/IQuiz';
import useQuizStore from '../stores/quiz';

type Props = {
    question: IQuestion;
};
const Question = (props: Props) => {
    const quizStore = useQuizStore();
    const { question } = props;

    const onChange = (option: string) => {
        const questionForm = [...quizStore.questionForm];
        const idx = quizStore.questionForm.findIndex(
            (v) => v.questionId === question.id
        );
        if (idx === -1) {
            questionForm.push({ questionId: question.id, answer: option });
            quizStore.setQuestionForm(questionForm);
        } else {
            questionForm[idx] = { questionId: question.id, answer: option };
            quizStore.setQuestionForm(questionForm);
        }
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                {question.question}
            </h2>
            <div className="space-y-2">
                {question.options.map((option) => (
                    <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                            type="radio"
                            name={`${question.id}`}
                            className="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-400 focus:ring-2"
                            onChange={() => onChange(option)}
                        />
                        <span className="text-gray-700">{option}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default Question;

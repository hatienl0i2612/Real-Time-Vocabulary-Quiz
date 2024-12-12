import React, { useEffect } from 'react';
import Button from '../_core/button';
import { SocketEvent } from '../constants';
import { getQuestionsByQuizId, submitQuiz } from '../requests/quiz';
import socket from '../services/socket';
import useQuizStore from '../stores/quiz';
import Leaderboard from './leader-board';
import Question from './question';
const Quiz: React.FC = () => {
    const quizStore = useQuizStore();

    useEffect(() => {
        initData();

        return () => {
            handleOutQuiz();
        };
    }, [quizStore.quizId]);

    const initData = async () => {
        const questions = await getQuestionsByQuizId(quizStore.quizId);
        quizStore.setQuestions(questions);
    };

    const handleOutQuiz = () => {
        socket.emit(SocketEvent.OUT_QUIZ, {
            quizId: quizStore.quizId,
            userId: quizStore.userId,
        });
    };

    const outQuiz = () => {
        quizStore.setJoined(false);
        quizStore.setQuizId('');
        quizStore.setUserId('');
    };

    const submitAnswer = async () => {
        const resp = await submitQuiz(
            quizStore.userId,
            quizStore.quizId,
            quizStore.questionForm
        );
        console.log(resp);
    };

    return (
        <div>
            <Button onClick={outQuiz} label="Out Quiz" />
            <div className="grid grid-cols-6 grid-rows-1 gap-4">
                <div>
                    <h1>Participants</h1>
                    <ul>
                        {quizStore.participants.map((participant) => (
                            <li key={participant.id}>
                                UserID: {participant.userId}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-span-3">
                    <h1>Questions</h1>
                    {quizStore.questions.map((question) => (
                        <Question question={question} />
                    ))}
                    <Button label="Submit form" onClick={submitAnswer} />
                </div>
                <div className="col-span-2 col-start-5">
                    <h1>Leaderboard</h1>
                    <Leaderboard />
                </div>
            </div>
        </div>
    );
};

export default Quiz;

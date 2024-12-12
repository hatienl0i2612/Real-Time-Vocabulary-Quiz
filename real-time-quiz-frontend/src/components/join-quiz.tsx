import Button from '../_core/button';
import { SocketEvent } from '../constants';
import socket from '../services/socket';
import useQuizStore from '../stores/quiz';

const JoinQuiz = () => {
    const quizStore = useQuizStore();

    const joinQuiz = () => {
        socket.emit(SocketEvent.JOIN_QUIZ, {
            quizId: quizStore.quizId,
            userId: quizStore.userId,
        });
        quizStore.setJoined(true);
    };

    return (
        <div className="w-96 mt-10 p-10 border-2 border-solid border-gray-200 rounded">
            <div className="flex flex-col gap-3">
                <div className="flex flex-col space-y-2">
                    <label
                        htmlFor="quizId"
                        className="text-sm font-medium text-gray-700"
                    >
                        Quiz ID
                    </label>
                    <input
                        type="text"
                        id="quizId"
                        placeholder="Type something..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        onChange={(e) => quizStore.setQuizId(e.target.value)}
                        value={quizStore.quizId}
                    />
                </div>
                <div className="flex flex-col space-y-2">
                    <label
                        htmlFor="userId"
                        className="text-sm font-medium text-gray-700"
                    >
                        User ID
                    </label>
                    <input
                        type="text"
                        id="userId"
                        placeholder="Type something..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        onChange={(e) => quizStore.setUserId(e.target.value)}
                        value={quizStore.userId}
                    />
                </div>
            </div>
            <Button onClick={joinQuiz} label="Join Quiz" />
        </div>
    );
};

export default JoinQuiz;

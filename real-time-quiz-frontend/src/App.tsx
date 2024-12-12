import { useEffect } from 'react';
import JoinQuiz from './components/join-quiz';
import Quiz from './components/quiz';
import { SocketEvent } from './constants';
import { IParticipant } from './interfaces/IParticipant';
import socket from './services/socket';
import useQuizStore from './stores/quiz';

function App() {
    const quizStore = useQuizStore();

    useEffect(() => {
        socket.on(SocketEvent.UPDATE_PARTICIPANTS, (data: IParticipant[]) => {
            console.log(data);
            quizStore.setParticipants(data);
        });

        return () => {
            socket.off(SocketEvent.UPDATE_PARTICIPANTS);
        };
    }, []);

    return (
        <div className="w-full flex flex-col items-center justify-center">
            {!quizStore.joined ? <JoinQuiz /> : <Quiz />}
        </div>
    );
}

export default App;

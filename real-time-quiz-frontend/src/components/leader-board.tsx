import { orderBy } from 'lodash';
import React, { useMemo } from 'react';
import useQuizStore from '../stores/quiz';

const Leaderboard: React.FC = () => {
    const quizStore = useQuizStore();

    const participants = useMemo(() => {
        console.log('quizStore.participants', quizStore.participants);
        return orderBy(
            quizStore.participants.map((participant) => ({
                ...participant,
                score: participant.score ? participant.score : 0,
            })),
            ['score'],
            ['desc']
        );
    }, [quizStore.participants]);

    return (
        <div>
            <ul>
                {participants.map((p) => (
                    <li
                        key={p.userId}
                        className={
                            p.userId === quizStore.userId ? 'font-bold' : ''
                        }
                    >{`${p.userId}: ${p.score || ''}`}</li>
                ))}
            </ul>
        </div>
    );
};

export default Leaderboard;

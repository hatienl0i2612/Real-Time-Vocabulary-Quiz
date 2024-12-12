import { orderBy } from 'lodash';
import React, { useMemo } from 'react';
import useQuizStore from '../stores/quiz';

const Leaderboard: React.FC = () => {
    const quizStore = useQuizStore();

    const participants = useMemo(() => {
        return orderBy(quizStore.participants, ['score'], ['desc']);
    }, [quizStore.participants]);

    return (
        <div>
            <ul>
                {participants.map((p) => (
                    <li key={p.userId}>{`${p.userId}: ${p.score || ''}`}</li>
                ))}
            </ul>
        </div>
    );
};

export default Leaderboard;

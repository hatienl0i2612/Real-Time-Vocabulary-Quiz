export const EnvConfig = {
    API: import.meta.env.VITE_API,
};

export const SocketEvent = {
    JOIN_QUIZ: 'joinQuiz',
    OUT_QUIZ: 'outQuiz',
    UPDATE_PARTICIPANTS: 'updateParticipants',
};

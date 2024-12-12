import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Server } from 'socket.io';
import { SocketEvent } from 'src/constants';
import { QuizSubmit } from './quiz.interface';
import { Quiz } from './quiz.schema';

@Injectable()
export class QuizService {
    private server: Server;

    constructor(@InjectModel(Quiz.name) private quizModel: Model<Quiz>) {}

    setWebSocketServer(server: Server) {
        this.server = server;
    }

    async addParticipant(quizId: string, userId: string) {
        let quiz = await this.quizModel.findOne({ quizId });
        if (quiz.participants.some((v) => v.userId === userId)) {
            return quiz;
        }
        quiz = await this.quizModel.findOneAndUpdate(
            { quizId },
            { $addToSet: { participants: { userId } } },
            { new: true, upsert: true },
        );
        return quiz;
    }

    async removeParticipant(quizId: string, userId: string) {
        const quiz = await this.quizModel.findOneAndUpdate(
            { quizId },
            { $pull: { participants: { userId } } },
            { new: true },
        );
        if (!quiz) return [];
        return quiz.participants;
    }

    async getParticipants(quizId: string): Promise<{ userId: string }[]> {
        const quiz = await this.quizModel.findOne({ quizId });
        return quiz ? quiz.participants : [];
    }

    async getQuestionByQuizId(quizId: string) {
        const quiz = await this.quizModel.findOne({ quizId });
        if (!quiz) return [];

        const questions = quiz.questions;
        return questions.map((question) => ({
            id: question.id,
            question: question.question,
            options: question.options,
        }));
    }

    async submitQuiz(userId: string, quizId: string, quizSubmit: QuizSubmit[]) {
        const quiz = await this.quizModel.findOne({ quizId });
        if (!quiz) return [];
        let score = 0;
        quiz.questions.forEach((question) => {
            const submit = quizSubmit.find(
                (ques) => ques.questionId === question.id,
            );
            if (submit?.answer === question.correctAnswer) {
                score += 1;
            }
        });
        quiz.participants = quiz.participants.map((p) =>
            p.userId === userId ? { ...p, score: score } : p,
        );
        await quiz.save();
        this.server
            .to(quizId)
            .emit(SocketEvent.UPDATE_PARTICIPANTS, quiz.participants);
        return { success: true };
    }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quiz } from './quiz/quiz.schema';

@Injectable()
export class SeederService {
    constructor(
        @InjectModel(Quiz.name) private readonly quizModel: Model<Quiz>,
    ) {}

    async seed() {
        const existingQuiz = await this.quizModel.findOne({ quizId: 'abcdef' });
        if (!existingQuiz) {
            const quiz = new this.quizModel({
                quizId: 'loi',
                questions: [
                    {
                        question: 'What is the capital of France?',
                        options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
                        correctAnswer: 'Paris',
                    },
                    {
                        question: 'Which planet is known as the Red Planet?',
                        options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
                        correctAnswer: 'Mars',
                    },
                    {
                        question: 'What is the capital of VietNam?',
                        options: ['Ninh Binh', 'HCM', 'Hue', 'Ha Noi'],
                        correctAnswer: 'Ha Noi',
                    },
                    {
                        question: '1 + 1 = ?',
                        options: ['2', '3', '4', '5'],
                        correctAnswer: '2',
                    },
                    {
                        question: '2 * 5 = ?',
                        options: ['32', '3', '10', '5'],
                        correctAnswer: '10',
                    },
                    {
                        question: '5 + 6 = ?',
                        options: ['111', '11', '1', '22'],
                        correctAnswer: '11',
                    },
                    {
                        question: '9 - 7 = ?',
                        options: ['4', '2', '6', '34'],
                        correctAnswer: '2',
                    },
                    {
                        question: '111 * 2 = ?',
                        options: ['2', '22', '2422', '222'],
                        correctAnswer: '222',
                    },
                    {
                        question: '10 + 10 = ?',
                        options: ['70', '32', '20', '56'],
                        correctAnswer: '20',
                    },
                    {
                        question: '10 / 2 = ?',
                        options: ['5', '2', '8', '10'],
                        correctAnswer: '5',
                    },
                ],
            });
            await quiz.save();
            console.log('Quiz data seeded successfully!');
        } else {
            console.log('Quiz data already exists!');
        }
    }
}

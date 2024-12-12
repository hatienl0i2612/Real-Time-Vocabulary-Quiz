import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { QuizSubmit } from './quiz.interface';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
    constructor(private readonly quizService: QuizService) {}

    @Post('submit')
    async joinRoom(
        @Body() body: { quizId: string; answers: QuizSubmit[]; userId: string },
    ) {
        return this.quizService.submitQuiz(
            body.userId,
            body.quizId,
            body.answers,
        );
    }

    @Get('questions')
    async getQuestions(@Query('quizId') quizId: string) {
        return this.quizService.getQuestionByQuizId(quizId);
    }
}

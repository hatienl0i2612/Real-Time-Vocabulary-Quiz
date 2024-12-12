import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizService } from './quiz.service';
import { QuizGateway } from './quiz.gateway';
import { Quiz, QuizSchema } from './quiz.schema';
import { QuizController } from './quiz.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Quiz.name, schema: QuizSchema }]),
  ],
  providers: [QuizService, QuizGateway],
  controllers: [QuizController],
})
export class QuizModule {}

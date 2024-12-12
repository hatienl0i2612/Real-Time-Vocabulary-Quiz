import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Quiz, QuizSchema } from './quiz/quiz.schema';
import { SeederService } from './seeder.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://admin:password@localhost:27018/admin'),
    MongooseModule.forFeature([{ name: Quiz.name, schema: QuizSchema }]),
  ],
  providers: [SeederService],
})
export class SeederModule {}

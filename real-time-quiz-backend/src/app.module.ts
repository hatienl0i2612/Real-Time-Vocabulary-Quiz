import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './quiz/quiz.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
    imports: [
        MongooseModule.forRoot(
            'mongodb://admin:password@localhost:27018/admin',
        ),
        RedisModule.forRoot({
            url: 'redis://127.0.0.1:6379',
            type: 'single',
        }),

        QuizModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

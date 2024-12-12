import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './quiz/quiz.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisModule } from '@nestjs-modules/ioredis';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
        }),
        MongooseModule.forRoot(configuration().DB_URI),
        RedisModule.forRoot({
            url: configuration().REDIS_URI,
            type: 'single',
        }),

        QuizModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

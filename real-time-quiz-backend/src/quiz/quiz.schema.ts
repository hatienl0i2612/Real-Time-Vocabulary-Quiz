import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Question extends Document {
    @Prop({ required: true })
    question: string;

    @Prop({ required: true, type: [String] })
    options: string[];

    @Prop({ required: true })
    correctAnswer: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);

@Schema({
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id; // Map _id to id
            delete ret._id;
            delete ret.__v;
            return ret;
        },
    },
})
export class Quiz extends Document {
    @Prop({ required: true, unique: true })
    quizId: string;

    @Prop({ type: [QuestionSchema], required: true })
    questions: Question[];

    @Prop({ type: [{ userId: String, score: Number }], default: [] })
    participants: { userId: string; score: number }[];
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);

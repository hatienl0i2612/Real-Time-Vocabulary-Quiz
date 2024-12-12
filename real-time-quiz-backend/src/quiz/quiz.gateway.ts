import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketEvent } from 'src/constants';
import { QuizService } from './quiz.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class QuizGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
    private clientToUserMap = new Map<
        string,
        { quizId: string; userId: string }
    >();

    constructor(private readonly quizService: QuizService) {}

    afterInit() {
        // Pass the server instance to the service
        this.quizService.setWebSocketServer(this.server);
    }

    handleConnection(client: Socket) {
        console.log('Client connected:', client.id);
    }

    async handleDisconnect(client: Socket) {
        this.outQuiz(client);
    }

    @SubscribeMessage(SocketEvent.JOIN_QUIZ)
    async handleJoinQuiz(
        @MessageBody() data: { quizId: string; userId: string },
        @ConnectedSocket() client: Socket,
    ) {
        const quiz = await this.quizService.addParticipant(
            data.quizId,
            data.userId,
        );
        client.join(data.quizId);

        // Map the client ID to the user and quiz for tracking
        this.clientToUserMap.set(client.id, {
            quizId: data.quizId,
            userId: data.userId,
        });

        this.server
            .to(data.quizId)
            .emit(SocketEvent.UPDATE_PARTICIPANTS, quiz.participants);
    }

    @SubscribeMessage(SocketEvent.OUT_QUIZ)
    async handleOutQuiz(@ConnectedSocket() client: Socket) {
        this.outQuiz(client);
    }

    private outQuiz = async (client: Socket) => {
        console.log('Client disconnected:', client.id);
        const userData = this.clientToUserMap.get(client.id);

        if (userData) {
            const { quizId, userId } = userData;

            // Remove the user from the quiz participants
            const participants = await this.quizService.removeParticipant(
                quizId,
                userId,
            );

            // Notify other users in the quiz room
            this.server
                .to(quizId)
                .emit(SocketEvent.UPDATE_PARTICIPANTS, participants);

            // Remove the client from the map
            this.clientToUserMap.delete(client.id);
        }
    };
}

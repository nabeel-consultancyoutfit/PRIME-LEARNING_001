import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

interface AuthSocket extends Socket {
  userId?: string;
  role?: string;
}

@WebSocketGateway({
  cors: { origin: '*', credentials: true },
  namespace: '/chat',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(ChatGateway.name);
  private connectedUsers = new Map<string, string>(); // userId -> socketId

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async handleConnection(client: AuthSocket) {
    try {
      const token =
        client.handshake.auth?.token ||
        client.handshake.headers?.authorization?.split(' ')[1];

      if (!token) {
        client.disconnect();
        return;
      }

      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('jwt.accessSecret'),
      });

      client.userId = payload.sub;
      client.role = payload.role;
      this.connectedUsers.set(payload.sub, client.id);

      // Join personal room for direct notifications
      client.join(`user:${payload.sub}`);
      this.logger.log(`Chat client connected: ${payload.sub}`);
    } catch {
      client.disconnect();
    }
  }

  handleDisconnect(client: AuthSocket) {
    if (client.userId) {
      this.connectedUsers.delete(client.userId);
      this.logger.log(`Chat client disconnected: ${client.userId}`);
    }
  }

  @SubscribeMessage('join-conversation')
  handleJoinConversation(
    @MessageBody() data: { conversationId: string },
    @ConnectedSocket() client: AuthSocket,
  ) {
    client.join(`conversation:${data.conversationId}`);
    return { event: 'joined', conversationId: data.conversationId };
  }

  @SubscribeMessage('leave-conversation')
  handleLeaveConversation(
    @MessageBody() data: { conversationId: string },
    @ConnectedSocket() client: AuthSocket,
  ) {
    client.leave(`conversation:${data.conversationId}`);
    return { event: 'left', conversationId: data.conversationId };
  }

  @SubscribeMessage('send-message')
  handleSendMessage(
    @MessageBody() data: { conversationId: string; content: string; type?: string },
    @ConnectedSocket() client: AuthSocket,
  ) {
    if (!client.userId) return { error: 'Unauthorized' };

    const messagePayload = {
      conversationId: data.conversationId,
      senderId: client.userId,
      content: data.content,
      type: data.type || 'text',
      createdAt: new Date().toISOString(),
    };

    // Broadcast to all in the conversation room except sender
    client.to(`conversation:${data.conversationId}`).emit('new-message', messagePayload);

    return { event: 'message-sent', ...messagePayload };
  }

  @SubscribeMessage('typing')
  handleTyping(
    @MessageBody() data: { conversationId: string; isTyping: boolean },
    @ConnectedSocket() client: AuthSocket,
  ) {
    client.to(`conversation:${data.conversationId}`).emit('user-typing', {
      userId: client.userId,
      isTyping: data.isTyping,
    });
  }

  // Called by MessagesService after DB save
  emitNewMessage(conversationId: string, message: any) {
    this.server.to(`conversation:${conversationId}`).emit('new-message', message);
  }

  isUserOnline(userId: string): boolean {
    return this.connectedUsers.has(userId);
  }
}

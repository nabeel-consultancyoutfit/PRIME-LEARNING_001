import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
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
  namespace: '/notifications',
})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(NotificationsGateway.name);

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
      client.join(`user:${payload.sub}`);
      this.logger.log(`Notifications client connected: ${payload.sub}`);
    } catch {
      client.disconnect();
    }
  }

  handleDisconnect(client: AuthSocket) {
    this.logger.log(`Notifications client disconnected: ${client.userId}`);
  }

  @SubscribeMessage('mark-read')
  handleMarkRead(
    @MessageBody() data: { notificationId: string },
    @ConnectedSocket() client: AuthSocket,
  ) {
    return { event: 'marked-read', notificationId: data.notificationId };
  }

  // Called by NotificationsService after creating a notification in DB
  sendNotificationToUser(userId: string, notification: any) {
    this.server.to(`user:${userId}`).emit('notification', notification);
  }

  // Broadcast system-wide notification to a role group
  broadcastToRole(role: string, notification: any) {
    this.server.to(`role:${role}`).emit('notification', notification);
  }
}

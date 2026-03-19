import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ChatGateway } from './chat.gateway';
import { NotificationsGateway } from './notifications.gateway';

@Module({
  imports: [ConfigModule, JwtModule.register({})],
  providers: [ChatGateway, NotificationsGateway],
  exports: [ChatGateway, NotificationsGateway],
})
export class WebsocketModule {}

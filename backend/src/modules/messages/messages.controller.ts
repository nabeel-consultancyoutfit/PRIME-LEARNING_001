import {
  Controller, Get, Post, Delete, Body, Param, Query,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { MessagesService } from './messages.service';
import { SendMessageDto } from './dto/send-message.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Messages')
@ApiBearerAuth()
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get('conversations')
  @ApiOperation({ summary: 'Get my conversations' })
  getMyConversations(@CurrentUser() user: any) {
    return this.messagesService.getMyConversations(user._id);
  }

  @Post('conversations/start')
  @ApiOperation({ summary: 'Start or get conversation with a user' })
  startConversation(@CurrentUser() user: any, @Body() body: { userId: string }) {
    return this.messagesService.getOrCreateConversation(user._id, body.userId);
  }

  @Get('conversations/:conversationId')
  @ApiOperation({ summary: 'Get messages in a conversation' })
  getMessages(
    @Param('conversationId') conversationId: string,
    @CurrentUser() user: any,
    @Query() pagination: PaginationDto,
  ) {
    return this.messagesService.getMessages(conversationId, user._id, pagination);
  }

  @Post()
  @ApiOperation({ summary: 'Send a message' })
  send(@Body() dto: SendMessageDto, @CurrentUser() user: any) {
    return this.messagesService.sendMessage(dto, user._id);
  }

  @Delete(':messageId')
  @ApiOperation({ summary: 'Delete (soft) a message' })
  delete(@Param('messageId') messageId: string, @CurrentUser() user: any) {
    return this.messagesService.deleteMessage(messageId, user._id);
  }
}

/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { Request } from 'express';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { GetCurrentUser } from 'src/auth/decorators/get-current-user.decorator';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Post('private')
  @UseGuards(AccessTokenGuard)
  createPrivate(@Body('targetUserId') targetUserId,@Req()req:Request) {
    const currentUserId: string = (req.user as any).sub;
    return this.conversationsService.createPrivateConversation(currentUserId, targetUserId);
  }

  @Post('group')
  @UseGuards(AccessTokenGuard)
  createGroup(@Body() body: CreateConversationDto, @Req() req: Request) {
    const { memberIds,name } = body;
    let {avatar} = body;
    if(!avatar || avatar===null){
      avatar ="https://www.shutterstock.com/image-vector/simple-line-drawing-depicts-group-260nw-2659899583.jpg"
    }
    const currentUserId: string = (req.user as any).sub;
    return this.conversationsService.createGroupConversation(currentUserId, name, avatar , memberIds);
  }

  @Get()
  @UseGuards(AccessTokenGuard)
  GetMyConversations(@GetCurrentUser('sub') userId: string) {
    return this.conversationsService.getUserConversations(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conversationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConversationDto: UpdateConversationDto) {
    return this.conversationsService.update(+id, updateConversationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conversationsService.remove(+id);
  }
}

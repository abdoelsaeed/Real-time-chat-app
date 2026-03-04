/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { Request } from 'express';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ConversationsService {
  constructor(private prisma: PrismaService){}

  async createPrivateConversation(currentUserId: string, targetUserId: string) {
    if (currentUserId === targetUserId) throw new BadRequestException('Cannot create chat with yourself')
    const existUser = await this.prisma.user.findUnique({
      where: { id: targetUserId },
      select: { id: true }
    });

    if (!existUser) {
      throw new BadRequestException("This user doesn't exist");
    }
    const existing = await this.prisma.conversation.findFirst({
    where:{
      isGroup:false,
      participants:{
        some:{userId:currentUserId}
      },
      AND:{
        participants:{
          some: { userId: targetUserId }
        }
      }
    },
    include:{
      participants: true
    }
    })
    if (existing) {
      return existing;
    }
    return this.prisma.conversation.create({
      data:{
        isGroup:false,
        participants:{
          create:[
            { userId: currentUserId },
            { userId: targetUserId }
          ]
        },
        
      }, 
      include: {
        participants: true
      }
    })
  }
  async createGroupConversation(
    currentUserId: string,
    name: string,
    avatar:string,
    memberIds: string[],
  ) {
    if (!memberIds.length) {
      throw new BadRequestException('Group must have members');
    }
    memberIds = [...new Set(memberIds)];
    memberIds = memberIds.filter(id => id !== currentUserId);
    const users = await this.prisma.user.findMany({
      where: {
        id: {
          in: memberIds
        }
      },
      select: {
        id: true
      }
    });

    if (users.length !== memberIds.length) {
      throw new BadRequestException("Some users do not exist");
    }
    return this.prisma.conversation.create({
      data:{
        isGroup:true,
        name,
        avatar,
        participants:{
          create: [
            { userId: currentUserId, role: 'admin' },
            ...memberIds.map(id => ({
              userId: id,
              role: 'member'
            }))
          ]
        }
      },
      include: {
        participants: true
      }
    })
  }

  async getUserConversations(userId: string) {
    const conversations = await this.prisma.conversation.findMany({
      where: {
        participants: {
          some: {
            userId
          }
        },
        deletedAt: null
      },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true
              }
            }
          }
        },
        messages: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 1
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    const res = conversations?.map(con=>{
      if(!con.isGroup){
        const otherUser = con.participants.find(p => p.userId !== userId)
        return {
          ...con,
          displayName: otherUser?.user?.name
        }
      }
      return {
        ...con,
        displayName: con.name
      };
    })
    return res;
  }

  findOne(id: number) {
    return `This action returns a #${id} conversation`;
  }

  update(id: number, updateConversationDto: UpdateConversationDto) {
    return `This action updates a #${id} conversation`;
  }

  remove(id: number) {
    return `This action removes a #${id} conversation`;
  }
}

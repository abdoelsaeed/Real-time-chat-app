/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStoryDto } from './dto/create-story.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class StoriesService {
  constructor(private prisma: PrismaService) { }

  async create(createStoryDto: CreateStoryDto, userId: string) {
    const story = await this.prisma.storie.create({
      data: {
        authorId: userId,
        media_url: createStoryDto.media_url,
        media_type: createStoryDto.media_type,
        caption: createStoryDto.caption,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
      }
    });

    return story
  }
  async getMyStories(userId: string) {
    const stories = await this.prisma.storie.findMany({
      where: {
        authorId: userId,
        expiresAt: {
          gt: new Date()
        },
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        storyViews: {
          include: {
            viewer: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      }
    })
    return stories
  }

  async getFriendStories(userId: string) {

    const participants = await this.prisma.participant.findMany({
      where: {
        conversation: {
          participants: {
            some: { userId }
          }
        },
        NOT: { userId }
      },
      select: { userId: true },
      distinct: ['userId']
    });

    const userIds = participants.map(p => p.userId);

    const stories = await this.prisma.storie.findMany({
      where: {
        authorId: { in: userIds },
        expiresAt: { gt: new Date() }
      },
      include: {
        author: {
          select: {
            id: true,
            name: true
          }
        },
        storyViews: {
          where: {
            viewerId: userId
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const groupedStories = Object.values(
      stories.reduce((acc, story) => {

        const userId = story.author.id;

        if (!acc[userId]) {
          acc[userId] = {
            user: story.author,
            stories: []
          };
        }

        acc[userId].stories.push(story);

        return acc;

      }, {} as Record<string, any>)
    );

    return groupedStories;
  }

  async getStory(storyId: string, userId: string) {

    const story = await this.prisma.storie.findFirst({
      where: {
        id: storyId,
        expiresAt: {
          gt: new Date()
        }
      }
    });

    if (!story) {
      throw new NotFoundException('Story not found or expired');
    }

    const existingView = await this.prisma.storyView.findUnique({
      where: {
        storyId_viewerId: {
          storyId,
          viewerId: userId,
        }
      }
    });

    if (!existingView && story.authorId !== userId) {
      await this.prisma.storyView.create({
        data: {
          storyId,
          viewerId: userId
        }
      });
    }

    return story;
  }

  async getStoryViews(storyId: string, userId: string) {
    const story = await this.prisma.storie.findUnique({
      where: { id: storyId }
    })
    if (!story) {
      throw new NotFoundException('Story not found');
    }

    if (story.authorId !== userId) {
      throw new ForbiddenException('You cannot view this story views');
    }
    const views = await this.prisma.storyView.findMany({
      where: {
        storyId
      },
      orderBy: {
        viewedAt: 'desc',
      },
      include: {
        viewer: {
          select: {
            name: true
          }
        },
        
      }
    })
    return {
      count:views.length,
      views
    }
  }

  async remove(storyId: string, userId: string) {
    const story = await this.prisma.storie.findUnique({
      where: {
        id: storyId,
      }
    })
    if (!story) {
      throw new NotFoundException('Story not found');
    }

    if (story.authorId !== userId) {
      throw new ForbiddenException('You cannot delete this story');
    }
    await this.prisma.storie.delete({
      where: { id: storyId }
    });

  }
}

/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, UseGuards, HttpCode } from '@nestjs/common';
import { StoriesService } from './stories.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { GetCurrentUser } from 'src/auth/decorators/get-current-user.decorator';

@Controller('stories')
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  create(@Body() createStoryDto: CreateStoryDto, @GetCurrentUser('sub') userId: string) {
    return this.storiesService.create(createStoryDto, userId);
  }

  @UseGuards(AccessTokenGuard)
  @Get('me')
  getMyStories(@GetCurrentUser('sub') userId: string) {
    return this.storiesService.getMyStories(userId);
  }

  @UseGuards(AccessTokenGuard)
  @Get('feed')
  getFriendStories(@GetCurrentUser('sub') userId: string) {
    return this.storiesService.getFriendStories(userId)
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  getStory(@Param('id') storyId: string, @GetCurrentUser('sub') userId: string
) {
    return this.storiesService.getStory(storyId, userId);
  }
  
  @UseGuards(AccessTokenGuard)
  @Get(':id/view')
  getStoryViews(@Param('id') storyId: string, @GetCurrentUser('sub') userId: string
  ) {
    return this.storiesService.getStoryViews(storyId, userId);
  }

  @HttpCode(204)
  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') storyId: string, @GetCurrentUser('sub') userId: string) {
    return this.storiesService.remove(storyId, userId);
  }
}

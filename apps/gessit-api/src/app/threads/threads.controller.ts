import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { Types } from 'mongoose';
import { ThreadsService } from './threads.service';
import { Thread } from './thread.schema';
import { UpdateThreadDto } from './update-thread.dto';
import { CreateThreadDto } from './create-thread.dto';
import { Public } from '../app.module';

@Controller('community')
export class ThreadsController {
  constructor(private readonly threadService: ThreadsService) {}

  @Public()
  @Get(':communityId/thread')
  async getThreads(@Param('communityId') communityId: string): Promise<Thread[]> {
    return await this.threadService.getThreads(new Types.ObjectId(communityId));
  }

  @Public()
  @Get(':communityId/thread/:threadId')
  async getThreadById(@Param('communityId') communityId: string, @Param('threadId') threadId: string): Promise<Thread> {
    return await this.threadService.getThreadById(new Types.ObjectId(communityId), new Types.ObjectId(threadId));
  }

  @Post(':communityId/thread')
  async createThread(@Req() req, @Body() createThreadDto: CreateThreadDto, @Param('communityId') communityId: string): Promise<Thread> {
    return await this.threadService.createThread(req, new Types.ObjectId(communityId), createThreadDto);
  }

  @Patch(':communityId/thread/:threadId')
  async updateThread(@Param('communityId') communityId: string, @Param('threadId') threadId: string, @Body() updateThreadDto: UpdateThreadDto): Promise<Thread> {
    return await this.threadService.updateThread(new Types.ObjectId(communityId), new Types.ObjectId(threadId), updateThreadDto);
  }

  @Delete(':communityId/thread/:threadId')
  async deleteThread(@Param('communityId') communityId: string, @Param('threadId') threadId: string): Promise<Thread> {
    return await this.threadService.deleteThread(new Types.ObjectId(communityId), new Types.ObjectId(threadId));
  }
}

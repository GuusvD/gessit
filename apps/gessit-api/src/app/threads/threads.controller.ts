import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { Thread } from './thread.schema';
import { UpdateThreadDto } from './update-thread.dto';
import { CreateThreadDto } from './create-thread.dto';
import { Public } from '../app.module';
import { ObjectIdPipe } from '../shared/pipes/object.id.pipe';

@Controller('community')
export class ThreadsController {
  constructor(private readonly threadService: ThreadsService) {}

  @Public()
  @Get(':communityId/thread')
  async getThreads(@Param('communityId', ObjectIdPipe) communityId: string): Promise<Thread[]> {
    return await this.threadService.getThreads(communityId);
  }

  @Public()
  @Get(':communityId/thread/:threadId')
  async getThreadById(@Param('communityId', ObjectIdPipe) communityId: string, @Param('threadId', ObjectIdPipe) threadId: string): Promise<Thread> {
    return await this.threadService.getThreadById(communityId, threadId);
  }

  @Post(':communityId/thread')
  async createThread(@Req() req, @Body() createThreadDto: CreateThreadDto, @Param('communityId', ObjectIdPipe) communityId: string): Promise<Thread> {
    return await this.threadService.createThread(req, communityId, createThreadDto);
  }

  @Post(':communityId/thread/:threadId/like')
  async likeThread(@Req() req, @Param('communityId', ObjectIdPipe) communityId: string, @Param('threadId', ObjectIdPipe) threadId: string) {
    return await this.threadService.likeThread(req, communityId, threadId);
  }

  @Public()
  @Post(':communityId/thread/:threadId/view')
  async viewThread(@Param('communityId', ObjectIdPipe) communityId: string, @Param('threadId', ObjectIdPipe) threadId: string) {
    return await this.threadService.viewThread(communityId, threadId);
  }

  @Patch(':communityId/thread/:threadId')
  async updateThread(@Req() req, @Param('communityId', ObjectIdPipe) communityId: string, @Param('threadId', ObjectIdPipe) threadId: string, @Body() updateThreadDto: UpdateThreadDto): Promise<Thread> {
    return await this.threadService.updateThread(req, communityId, threadId, updateThreadDto);
  }

  @Delete(':communityId/thread/:threadId')
  async deleteThread(@Req() req, @Param('communityId', ObjectIdPipe) communityId: string, @Param('threadId', ObjectIdPipe) threadId: string): Promise<Thread> {
    return await this.threadService.deleteThread(req, communityId, threadId);
  }
}

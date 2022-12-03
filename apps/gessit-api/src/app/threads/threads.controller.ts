import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Types } from 'mongoose';
import { ThreadsService } from './threads.service';
import { Thread } from './thread.schema';
import { UpdateThreadDto } from './update-thread.dto';
import { CreateThreadDto } from './create-thread.dto';

@Controller('thread')
export class ThreadsController {
  constructor(private readonly threadService: ThreadsService) {}

  @Get()
  async getThreads(): Promise<Thread[]> {
    return await this.threadService.getThreads();
  }

  @Get(':id')
  async getThreadById(@Param('id') id: string): Promise<Thread> {
    return await this.threadService.getThreadById(new Types.ObjectId(id));
  }

  @Post()
  async createThread(@Body() createThreadDto: CreateThreadDto): Promise<Thread> {
    return await this.threadService.createThread(createThreadDto.communityId, createThreadDto.title, createThreadDto.content, createThreadDto.image);
  }

  @Patch(':id')
  async updateThread(@Param('id') id: string, @Body() updateThreadDto: UpdateThreadDto): Promise<Thread> {
    return await this.threadService.updateThread(id, updateThreadDto);
  }

  @Delete(':id')
  async deleteThread(@Param('id') id: string): Promise<Thread> {
    return await this.threadService.deleteThread(new Types.ObjectId(id));
  }
}

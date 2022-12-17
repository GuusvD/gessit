import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommunitiesModule } from '../communities/communities.module';
import { UsersModule } from '../users/users.module';
import { Thread, ThreadSchema } from './thread.schema';
import { ThreadsController } from './threads.controller';
import { ThreadsService } from './threads.service';
import { forwardRef } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Thread.name, schema: ThreadSchema }]),
    forwardRef(() => UsersModule),
    forwardRef(() => CommunitiesModule),
  ],
  controllers: [ThreadsController],
  providers: [ThreadsService],
})
export class ThreadsModule {}
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommunitiesModule } from '../communities/communities.module';
import { Message, MessageSchema } from './message.schema';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { forwardRef } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    forwardRef(() => CommunitiesModule),
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
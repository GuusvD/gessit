import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from "@nestjs/common";
import { ObjectIdPipe } from "../shared/pipes/object.id.pipe";
import { CreateMessageDto } from "./create-message.dto";
import { Message } from "./message.schema";
import { MessagesService } from "./messages.service";
import { UpdateMessageDto } from "./update-message.dto";

@Controller('community')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) {}

    @Get(':communityId/thread/:threadId/message')
    async getMessages(
        @Param('communityId', ObjectIdPipe) communityId: string,
        @Param('threadId', ObjectIdPipe) threadId: string): Promise<Message[]> {
        return await this.messagesService.getMessages(communityId, threadId);
    }

    @Get(':communityId/thread/:threadId/message/:messageId')
    async getMessageById(
        @Param('communityId', ObjectIdPipe) communityId: string, 
        @Param('threadId', ObjectIdPipe) threadId: string, 
        @Param('messageId', ObjectIdPipe) messageId: string): Promise<Message> {
        return await this.messagesService.getMessageById(communityId, threadId, messageId);
    }

    @Post(':communityId/thread/:threadId/message')
    async createMessage(
        @Req() req, 
        @Param('communityId', ObjectIdPipe) communityId: string, 
        @Param('threadId', ObjectIdPipe) threadId: string, 
        @Body() createMessageDto: CreateMessageDto): Promise<Message> {
        return await this.messagesService.createMessage(req, communityId, threadId, createMessageDto);
    }

    @Patch(':communityId/thread/:threadId/message/:messageId')
    async updateMessage(
        @Req() req,
        @Param('communityId', ObjectIdPipe) communityId: string, 
        @Param('threadId', ObjectIdPipe) threadId: string, 
        @Param('messageId', ObjectIdPipe) messageId: string,
        @Body() updateMessageDto: UpdateMessageDto): Promise<Message> {
        return await this.messagesService.updateMessage(req, communityId, threadId, messageId, updateMessageDto);
    }
    

    @Delete(':communityId/thread/:threadId/message/:messageId')
    async deleteMessage(
        @Req() req, 
        @Param('communityId', ObjectIdPipe) communityId: string, 
        @Param('threadId', ObjectIdPipe) threadId: string, 
        @Param('messageId', ObjectIdPipe) messageId: string) {
        return await this.messagesService.deleteMessage(req, communityId, threadId, messageId);
    }
}
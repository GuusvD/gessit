import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Community, CommunityDocument } from "../communities/community.schema";
import { Role } from "../users/role.enum";
import { CreateMessageDto } from "./create-message.dto";
import { Message, MessageDocument } from "./message.schema";

@Injectable()
export class MessagesService {
    constructor(@InjectModel(Community.name) private communityModel: Model<CommunityDocument>, @InjectModel(Message.name) private messageModel: Model<MessageDocument>) {}

    async getMessageById(communityId: string, threadId: string, messageId: string): Promise<Message> {
        await this.existing(communityId, threadId, messageId);

        const community = await this.communityModel.findOne({_id: new Types.ObjectId(communityId), "threads._id": new Types.ObjectId(threadId), "messages._id": new Types.ObjectId(messageId)});
        return community.threads.filter(p => p._id.equals(new Types.ObjectId(threadId)))[0].messages.filter(p => p._id.equals(new Types.ObjectId(messageId)))[0];
    }

    async getMessages(communityId: string, threadId: string): Promise<Message[]> {
        await this.existing(communityId, threadId);

        const community = await this.communityModel.findOne({_id: new Types.ObjectId(communityId), "threads._id": new Types.ObjectId(threadId)});
        return community.threads.filter(p => p._id.equals(new Types.ObjectId(threadId)))[0].messages;
    }

    async createMessage(req, communityId: string, threadId: string, createMessageDto: CreateMessageDto): Promise<Message> {
        await this.existing(communityId, threadId);

        const currentCommunity = await this.communityModel.findOne({_id: new Types.ObjectId(communityId)});

        if (currentCommunity.members.filter(p => p._id.equals(req.user.id)).length === 0) {
            if (currentCommunity.owner._id.equals(req.user.id) || req.user.roles.includes(Role.Admin)) {
                const id = new Types.ObjectId();
                const newMessage = new this.messageModel({
                    _id: id,
                    creator: req.user.id,
                    ...createMessageDto,
                    likes: [],
                    creationDate: new Date(),
                    hasLikes: false
                });
        
                const community = await this.communityModel.findOneAndUpdate({_id: new Types.ObjectId(communityId), "threads._id": new Types.ObjectId(threadId)}, {$push: {"threads.$.messages": newMessage}}, {new: true});
                return community.threads.filter(p => p._id.equals(new Types.ObjectId(threadId)))[0].messages.filter(p => p._id.equals(id))[0];
            } else {
                throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
            }
        } else {
            const id = new Types.ObjectId();
            const newMessage = new this.messageModel({
                _id: id,
                creator: req.user.id,
                ...createMessageDto,
                likes: [],
                creationDate: new Date(),
                hasLikes: false
            });

            const community = await this.communityModel.findOneAndUpdate({_id: new Types.ObjectId(communityId), "threads._id": new Types.ObjectId(threadId)}, {$push: {"threads.$.messages": newMessage}}, {new: true});
            return community.threads.filter(p => p._id.equals(new Types.ObjectId(threadId)))[0].messages.filter(p => p._id.equals(id))[0];
        }
    }

    async likeMessage(req, communityId: string, threadId: string, messageId: string): Promise<Message> {
        await this.existing(communityId, threadId, messageId);

        const message = await this.getMessageById(communityId, threadId, messageId);

        let result;

        if (message.likes.filter(p => p.equals(req.user.id)).length === 0) {
            result = (await this.communityModel.findOneAndUpdate({_id: new Types.ObjectId(communityId), "threads._id": new Types.ObjectId(threadId)}, {$push: {"threads.$.messages.$[message].likes": req.user.id}}, {arrayFilters: [{ "message._id": new Types.ObjectId(messageId) }], new: true}));
        } else {
            result = (await this.communityModel.findOneAndUpdate({_id: new Types.ObjectId(communityId), "threads._id": new Types.ObjectId(threadId)}, {$pull: {"threads.$.messages.$[message].likes": req.user.id}}, {arrayFilters: [{ "message._id": new Types.ObjectId(messageId) }], new: true}));
        }

        if ((result.threads.filter(p => p._id.equals(new Types.ObjectId(threadId))))[0].messages.filter(p => p._id.equals(new Types.ObjectId(messageId)))[0].likes.length > 0) {
            result = (await this.communityModel.findOneAndUpdate({_id: new Types.ObjectId(communityId), "threads._id": new Types.ObjectId(threadId)}, {$set: {"threads.$.messages.$[message].hasLikes": true}}, {arrayFilters: [{ "message._id": new Types.ObjectId(messageId) }], new: true}));
        } else {
            result = (await this.communityModel.findOneAndUpdate({_id: new Types.ObjectId(communityId), "threads._id": new Types.ObjectId(threadId)}, {$set: {"threads.$.messages.$[message].hasLikes": false}}, {arrayFilters: [{ "message._id": new Types.ObjectId(messageId) }], new: true}));
        }

        return result.threads.filter(p => p._id.equals(new Types.ObjectId(threadId)))[0].messages.filter(p => p._id.equals(new Types.ObjectId(messageId)))[0];
    }

    async updateMessage(req, communityId: string, threadId: string, messageId: string, message: Partial<Message>): Promise<Message> {
        await this.existing(communityId, threadId, messageId);

        const community = await this.communityModel.findOne({_id: new Types.ObjectId(communityId)});
        const resultMessage = community.threads.filter(p => p._id.equals(threadId))[0].messages.filter(p => p._id.equals(messageId))[0];

        if (resultMessage.creator._id.equals(req.user.id) || req.user.roles.includes(Role.Admin)) {
            const oldMessage = await this.getMessageById(communityId, threadId, messageId);
            const newMessage = { ...oldMessage, ...message };
    
            await this.communityModel.findOneAndUpdate({_id: new Types.ObjectId(communityId), "threads._id": new Types.ObjectId(threadId)}, {$pull: {"threads.$.messages": oldMessage}});
            return await this.communityModel.findOneAndUpdate({_id: new Types.ObjectId(communityId), "threads._id": new Types.ObjectId(threadId)}, {$push: {"threads.$.messages": newMessage}}, {new: true});
        } else {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
    }

    async deleteMessage(req, communityId: string, threadId: string, messageId: string): Promise<Message> {
        await this.existing(communityId, threadId, messageId);

        const community = await this.communityModel.findOne({_id: new Types.ObjectId(communityId)});
        const resultMessage = community.threads.filter(p => p._id.equals(threadId))[0].messages.filter(p => p._id.equals(messageId))[0];

        if (resultMessage.creator._id.equals(req.user.id) || req.user.roles.includes(Role.Admin)) {
            const message = await this.getMessageById(communityId, threadId, messageId);
            return await this.communityModel.findOneAndUpdate({_id: new Types.ObjectId(communityId), "threads._id": new Types.ObjectId(threadId)}, {$pull: {"threads.$.messages": message }}, {new: true});
        } else {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
    }

    async existing(communityId: string, threadId?: string, messageId?: string): Promise<void> {
        const community = await this.communityModel.findOne({ _id: new Types.ObjectId(communityId) });

        if (!community) {
            throw new HttpException(`Community with id ${communityId} does not exist!`, HttpStatus.BAD_REQUEST);
        }

        if(threadId) {
            if(!(community.threads.filter(p => p._id.equals(new Types.ObjectId(threadId))).length > 0)) {
                throw new HttpException(`Thread with id ${threadId} doesn't exist in the community with id ${communityId}!`, HttpStatus.BAD_REQUEST);
            }
        }

        if (messageId) {
            if (!(community.threads.filter(p => p._id.equals(new Types.ObjectId(threadId)))[0].messages.filter(p => p._id.equals(new Types.ObjectId(messageId))).length > 0)) {
                throw new HttpException(`Message with id ${messageId} doesn't exist in the thread with id ${threadId} in the community with id ${communityId}!`, HttpStatus.BAD_REQUEST);
            }
        }
    }
}

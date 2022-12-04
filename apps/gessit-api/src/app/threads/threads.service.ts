import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Model, Types } from "mongoose";
import { Thread, ThreadDocument } from "./thread.schema";
import { UsersService } from "../users/users.service";
import { InjectModel } from "@nestjs/mongoose";
import { Community, CommunityDocument } from "../communities/community.schema";
import { CommunitiesService } from "../communities/communities.service";
import { CreateThreadDto } from "./create-thread.dto";

@Injectable()
export class ThreadsService {
    constructor(@InjectModel(Community.name) private communityModel: Model<CommunityDocument>, @InjectModel(Thread.name) private threadModel: Model<ThreadDocument>, private readonly usersService: UsersService, private readonly communitiesService: CommunitiesService) {}

    async getThreadById(communityId: Types.ObjectId, threadId: Types.ObjectId): Promise<Thread> {
        return (await this.communitiesService.getCommunityById(communityId)).threads.filter(p => p._id.equals(threadId))[0];
    }

    async getThreads(communityId: Types.ObjectId): Promise<Thread[]> {
        return (await this.communitiesService.getCommunityById(communityId)).threads;
    }

    async createThread(req, communityId: Types.ObjectId, createThreadDto: CreateThreadDto): Promise<Thread> {
        if ((await this.communitiesService.getCommunityById(communityId)).members.filter(p => p._id.equals(req.user.id)).length === 0) {
            if ((await this.communitiesService.getCommunityById(communityId)).owner._id.equals(req.user.id)) {
                const newThread = new this.threadModel({
                    ...createThreadDto,
                    _id: new Types.ObjectId(),
                    views: 0,
                    likes: 0,
                    dislikes: 0,
                    creationDate: new Date(),
                    creator: await this.usersService.getUserById(req.user.id)
                });
        
                return await this.communityModel.findOneAndUpdate({_id: communityId}, {$push: {threads: newThread}});
            } else {
                throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
            }
        } else {
            const newThread = new this.threadModel({
                ...createThreadDto,
                _id: new Types.ObjectId(),
                views: 0,
                likes: 0,
                dislikes: 0,
                creationDate: new Date(),
                creator: await this.usersService.getUserById(req.user.id)
            });
    
            return await this.communityModel.findOneAndUpdate({_id: communityId}, {$push: {threads: newThread}});
        }
    }

    async updateThread(req, communityId: Types.ObjectId, threadId: Types.ObjectId, thread: Partial<Thread>): Promise<Thread> {
        if ((await this.getThreadById(communityId, threadId)).creator._id.equals(req.user.id)) {
            const oldThread = await this.getThreadById(communityId, threadId);
            const newThread = { ...oldThread, ...thread };
    
            await this.communityModel.findOneAndUpdate({_id: communityId}, {$pull: {threads: oldThread}});
            return await this.communityModel.findOneAndUpdate({_id: communityId}, {$push: {threads: newThread}});
        } else {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
    }

    async deleteThread(req, communityId: Types.ObjectId, threadId: Types.ObjectId): Promise<Thread> {
        if ((await this.getThreadById(communityId, threadId)).creator._id.equals(req.user.id)) {
            const thread = await this.getThreadById(communityId, threadId);
            return await this.communityModel.findOneAndUpdate({_id: communityId}, {$pull: {threads: thread}});
        } else {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
    }
}
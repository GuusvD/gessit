import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Model, Types } from "mongoose";
import { Thread, ThreadDocument } from "./thread.schema";
import { UsersService } from "../users/users.service";
import { InjectModel } from "@nestjs/mongoose";
import { Community, CommunityDocument } from "../communities/community.schema";
import { CommunitiesService } from "../communities/communities.service";
import { CreateThreadDto } from "./create-thread.dto";
import { ValidationException } from "../shared/filters/validation.exception";

@Injectable()
export class ThreadsService {
    constructor(@InjectModel(Community.name) private communityModel: Model<CommunityDocument>, @InjectModel(Thread.name) private threadModel: Model<ThreadDocument>, private readonly usersService: UsersService, private readonly communitiesService: CommunitiesService) {}

    async getThreadById(communityId: string, threadId: string): Promise<Thread> {
        await this.existing(communityId, threadId);
        return (await this.communitiesService.getCommunityById(communityId)).threads.filter(p => p._id.equals(new Types.ObjectId(threadId)))[0];
    }

    async getThreads(communityId: string): Promise<Thread[]> {
        return (await this.communitiesService.getCommunityById(communityId)).threads;
    }

    async createThread(req, communityId: string, createThreadDto: CreateThreadDto): Promise<Thread> {
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
        
                return await this.communityModel.findOneAndUpdate({_id: new Types.ObjectId(communityId)}, {$push: {threads: newThread}});
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
    
            return await this.communityModel.findOneAndUpdate({_id: new Types.ObjectId(communityId)}, {$push: {threads: newThread}});
        }
    }

    async updateThread(req, communityId: string, threadId: string, thread: Partial<Thread>): Promise<Thread> {
        await this.existing(communityId, threadId);

        if ((await this.getThreadById(communityId, threadId)).creator._id.equals(req.user.id)) {
            const oldThread = await this.getThreadById(communityId, threadId);
            const newThread = { ...oldThread, ...thread };
    
            await this.communityModel.findOneAndUpdate({_id: new Types.ObjectId(communityId)}, {$pull: {threads: oldThread}});
            return await this.communityModel.findOneAndUpdate({_id: new Types.ObjectId(communityId)}, {$push: {threads: newThread}});
        } else {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
    }

    async deleteThread(req, communityId: string, threadId: string): Promise<Thread> {
        await this.existing(communityId, threadId);

        if ((await this.getThreadById(communityId, threadId)).creator._id.equals(req.user.id)) {
            const thread = await this.getThreadById(communityId, threadId);
            return await this.communityModel.findOneAndUpdate({_id: new Types.ObjectId(communityId)}, {$pull: {threads: thread}});
        } else {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
    }

    async existing(communityId : string, threadId? : string) : Promise<void> {
        const community = await this.communityModel.findOne({ _id : new Types.ObjectId(communityId) });

        if(!community) {
            throw new ValidationException([`Community with id ${communityId} doesn't exist!`]);
        }

        if(threadId) {
            if(!(community.threads.filter(thread => thread._id.equals(new Types.ObjectId(threadId))).length > 0)) {
                throw new ValidationException([`Thread with id ${threadId} doesn't exist in the community with id ${communityId}!`]);
            }
        }
    }
}
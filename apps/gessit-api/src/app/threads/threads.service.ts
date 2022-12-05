import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Model, Types } from "mongoose";
import { Thread, ThreadDocument } from "./thread.schema";
import { UsersService } from "../users/users.service";
import { InjectModel } from "@nestjs/mongoose";
import { Community, CommunityDocument } from "../communities/community.schema";
import { CommunitiesService } from "../communities/communities.service";
import { CreateThreadDto } from "./create-thread.dto";
import { ValidationException } from "../shared/filters/validation.exception";
import { Role } from "../users/role.enum";

@Injectable()
export class ThreadsService {
    constructor(@InjectModel(Community.name) private communityModel: Model<CommunityDocument>, @InjectModel(Thread.name) private threadModel: Model<ThreadDocument>, private readonly usersService: UsersService, private readonly communitiesService: CommunitiesService) {}

    async getThreadById(communityId: string, threadId: string): Promise<Thread> {
        //await this.existing(communityId, threadId);
        //return (await this.communitiesService.getCommunityById(communityId)).threads.filter(p => p._id.equals(new Types.ObjectId(threadId)))[0];

        return (await this.communityModel.aggregate([
            { $match : { _id : new Types.ObjectId(communityId)}},
            { $match : { "threads._id" : new Types.ObjectId(threadId)}},
            { $project : {
                _id : 0,
                "threads" : {
                    $filter : {
                        input : "$threads",
                        as : "thread",
                        cond : { $eq : ["$$thread._id", new Types.ObjectId(threadId)]}
                    }
                }}
            },
            { $unwind : { path: "$threads", preserveNullAndEmptyArrays: true }},
            { $lookup : { 
                from : "users",
                localField : "threads.creator",
                foreignField : "_id",
                as : "threads.creator"
            }},
            { $unwind : { path: "$threads.messages", preserveNullAndEmptyArrays: true }},
            { $unwind : { path: "$threads.messages.creator", preserveNullAndEmptyArrays: true }},
            { $lookup : {
                from : "users",
                localField : "threads.messages.creator",
                foreignField : "_id",
                as : "threads.messages.creator"
             }},
             { $unset: [
                "threads.creator.password",
                "threads.creator.__v",
                "threads.messages.creator.password",
                "threads.messages.creator.__v",
            ]},
        ]))[0];
    }

    async getThreads(communityId: string): Promise<Thread[]> {
        //await this.existing(communityId);
        //return (await this.communitiesService.getCommunityById(communityId)).threads;

        return (await this.communityModel.aggregate([
            { $match : { _id : new Types.ObjectId(communityId)}},
            { $project : {
                _id : 0,
                "threads" : {
                    $filter : {
                        input : "$threads",
                        as : "thread",
                        cond : true
                    }
                }}
            },
            { $unwind : { path: "$threads", preserveNullAndEmptyArrays: true }},
            { $lookup : { 
                from : "users",
                localField : "threads.creator",
                foreignField : "_id",
                as : "threads.creator"
            }},
            { $unwind : { path: "$threads.messages", preserveNullAndEmptyArrays: true }},
            { $unwind : { path: "$threads.messages.creator", preserveNullAndEmptyArrays: true }},
            { $lookup : {
                from : "users",
                localField : "threads.messages.creator",
                foreignField : "_id",
                as : "threads.messages.creator"
             }},
             { $unset: [
                "threads.creator.password",
                "threads.creator.__v",
                "threads.messages.creator.password",
                "threads.messages.creator.__v",
            ]},
        ])).map(thread => thread.threads);
    }

    async createThread(req, communityId: string, createThreadDto: CreateThreadDto): Promise<Thread> {
        await this.existing(communityId);

        if ((await this.communitiesService.getCommunityById(communityId)).members.filter(p => p._id.equals(req.user.id)).length === 0) {
            if ((await this.communitiesService.getCommunityById(communityId)).owner._id.equals(req.user.id) || req.user.roles.includes(Role.Admin)) {
                const newThread = new this.threadModel({
                    ...createThreadDto,
                    _id: new Types.ObjectId(),
                    views: 0,
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
                creationDate: new Date(),
                creator: await this.usersService.getUserById(req.user.id)
            });
    
            return await this.communityModel.findOneAndUpdate({_id: new Types.ObjectId(communityId)}, {$push: {threads: newThread}});
        }
    }

    async likeThread(req, communityId: string, threadId: string): Promise<Thread> {
        await this.existing(communityId, threadId);

        let community;

        if ((await this.getThreadById(communityId, threadId)).likes.filter(p => p._id.equals(req.user.id)).length === 0) {
            community = await this.communityModel.findOneAndUpdate({_id: new Types.ObjectId(communityId), "threads._id": new Types.ObjectId(threadId)}, {$push: {"threads.$.likes": req.user.id}}, {new: true});
        } else {
            community = await this.communityModel.findOneAndUpdate({_id: new Types.ObjectId(communityId), "threads._id": new Types.ObjectId(threadId)}, {$pull: {"threads.$.likes": req.user.id}}, {new: true});
        }
        
        return community.threads.filter(p => p._id.equals(new Types.ObjectId(threadId)))[0];
    }

    async viewThread(communityId: string, threadId: string): Promise<Thread> {
        await this.existing(communityId, threadId);

        let community = await this.communityModel.findOneAndUpdate({_id : new Types.ObjectId(communityId), "threads._id" : new Types.ObjectId(threadId)}, {$inc: {"threads.$.views" : 1}});
        return community.threads.filter(p => p._id.equals(new Types.ObjectId(threadId)))[0];
    }

    async updateThread(req, communityId: string, threadId: string, thread: Partial<Thread>): Promise<Thread> {
        await this.existing(communityId, threadId);

        if ((await this.getThreadById(communityId, threadId)).creator._id.equals(req.user.id) || req.user.roles.includes(Role.Admin)) {
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

        if ((await this.getThreadById(communityId, threadId)).creator._id.equals(req.user.id) || req.user.roles.includes(Role.Admin)) {
            const thread = await this.getThreadById(communityId, threadId);
            return await this.communityModel.findOneAndUpdate({_id: new Types.ObjectId(communityId)}, {$pull: {threads: thread}});
        } else {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
    }

    async existing(communityId : string, threadId? : string) : Promise<void> {
        const community = await this.communityModel.findOne({ _id : new Types.ObjectId(communityId) });

        if(!community) {
            throw new ValidationException([`Community with id ${communityId} does not exist!`]);
        }

        if(threadId) {
            if(!(community.threads.filter(thread => thread._id.equals(new Types.ObjectId(threadId))).length > 0)) {
                throw new ValidationException([`Thread with id ${threadId} doesn't exist in the community with id ${communityId}!`]);
            }
        }
    }
}
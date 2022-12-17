import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Model, Types } from "mongoose";
import { Thread, ThreadDocument } from "./thread.schema";
import { UsersService } from "../users/users.service";
import { InjectModel } from "@nestjs/mongoose";
import { Community, CommunityDocument } from "../communities/community.schema";
import { CommunitiesService } from "../communities/communities.service";
import { CreateThreadDto } from "./create-thread.dto";
import { Role } from "../users/role.enum";
import { UpdateThreadDto } from "./update-thread.dto";

@Injectable()
export class ThreadsService {
    constructor(@InjectModel(Community.name) private communityModel: Model<CommunityDocument>, @InjectModel(Thread.name) private threadModel: Model<ThreadDocument>, private readonly usersService: UsersService, private readonly communitiesService: CommunitiesService) {}

    async getThreadById(communityId: string, threadId: string): Promise<Thread> {
        await this.existing(communityId, threadId);

        return (await this.communityModel.aggregate([
            { $match : { _id : new Types.ObjectId(communityId)}},
            { $match : { "threads._id" : new Types.ObjectId(threadId)}},
            { $unwind : { path: "$members", preserveNullAndEmptyArrays: true }},
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
            { $lookup : { 
                from : "users",
                localField : "threads.messages.creator",
                foreignField : "_id",
                as : "threads.messages.creator"
            }},
            { $set: {
                "threads.messages.creator": "$threads.messages.creator" 
            }},
            { $group: {
                _id: "$threads._id",
                title: {
                  $first: "$threads.title"
                },
                content: {
                  $first: "$threads.content"
                },
                views: {
                  $first: "$threads.views"
                },
                likes: {
                  $first: "$threads.likes"
                },
                creationDate: {
                  $first: "$threads.creationDate"
                },
                image: {
                  $first: "$threads.image"
                },
                messages: {
                  $push: "$threads.messages"   
                },
                creator: {
                  $first: "$threads.creator"
                }
            }},
            { $unset: ["creator.password", "creator.__v", "messages.creator.password", "messages.creator.__v"]}
        ]))[0];
    }

    async getThreads(communityId: string): Promise<Thread[]> {
        await this.existing(communityId);

        return (await this.communityModel.aggregate([
            { $match : { _id : new Types.ObjectId(communityId)}},
            { $unwind : { path: "$members", preserveNullAndEmptyArrays: true }},
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
            { $unwind : { path: "$threads", preserveNullAndEmptyArrays: false }},
            { $lookup : { 
                from : "users",
                localField : "threads.creator",
                foreignField : "_id",
                as : "threads.creator"
            }},
            { $unwind : { path: "$threads.messages", preserveNullAndEmptyArrays: true }},
            { $lookup : { 
                from : "users",
                localField : "threads.messages.creator",
                foreignField : "_id",
                as : "threads.messages.creator"
            }},
            { $set: {
                "threads.messages.creator": "$threads.messages.creator" 
            }},
            { $group: {
                _id: "$threads._id",
                title: {
                  $first: "$threads.title"
                },
                content: {
                  $first: "$threads.content"
                },
                views: {
                  $first: "$threads.views"
                },
                likes: {
                  $first: "$threads.likes"
                },
                creationDate: {
                  $first: "$threads.creationDate"
                },
                image: {
                  $first: "$threads.image"
                },
                messages: {
                  $push: "$threads.messages"   
                },
                creator: {
                  $first: "$threads.creator"
                }
            }},
            { $unset: ["creator.password", "creator.__v", "messages.creator.password", "messages.creator.__v"]}
        ]));
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
                    creator: req.user.id
                });
        
                return await this.communityModel.findOneAndUpdate({_id: new Types.ObjectId(communityId)}, {$push: {threads: newThread}}, {new: true});
            } else {
                throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
            }
        } else {
            const newThread = new this.threadModel({
                ...createThreadDto,
                _id: new Types.ObjectId(),
                views: 0,
                creationDate: new Date(),
                creator: req.user.id
            });
    
            return await this.communityModel.findOneAndUpdate({_id: new Types.ObjectId(communityId)}, {$push: {threads: newThread}}, {new: true});
        }
    }

    async likeThread(req, communityId: string, threadId: string): Promise<Thread> {
        await this.existing(communityId, threadId);

        let community;

        if ((await this.communityModel.find({ $and: [{_id: new Types.ObjectId(communityId)}, {threads: {$elemMatch: {_id: new Types.ObjectId(threadId), likes: {$in: [req.user.id]}}}}]})).length === 0) {
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

    async updateThread(communityId: string, threadId : string, req, updateThreadDto: UpdateThreadDto): Promise<Thread> {
        await this.existing(communityId, threadId);

        const thread = (await this.communityModel.findOne(
            {_id: new Types.ObjectId(communityId)}, 
            {threads:{$elemMatch:{_id: new Types.ObjectId(threadId)}}}))
            .threads.filter(async thread => thread._id.equals(new Types.ObjectId(threadId)))[0];

        if(!(await req.user.id.equals(thread.creator)) && !(req.user.roles.includes(Role.Admin))) {
            throw new HttpException(`Unauthorized`, HttpStatus.UNAUTHORIZED);
        }

        return await this.communityModel.findOneAndUpdate(
            {_id : new Types.ObjectId(communityId), "threads._id" : new Types.ObjectId(threadId)}, 
            {$set: {"threads.$" : {...thread, ...updateThreadDto}}}, 
            {new: true});
    }

    async deleteThread(communityId : string, threadId : string, req): Promise<Thread> {
        await this.existing(communityId, threadId);

        const thread = (await this.communityModel.findOne(
            {_id: new Types.ObjectId(communityId)}, 
            {threads:{$elemMatch:{_id: new Types.ObjectId(threadId)}}}))
            .threads.filter(async thread => thread._id.equals(new Types.ObjectId(threadId)))[0];

        if(!(await req.user.id.equals(thread.creator)) && !(req.user.roles.includes(Role.Admin))) {
            throw new HttpException(`Unauthorized`, HttpStatus.UNAUTHORIZED);
        }

        return (await this.communityModel.findOneAndUpdate(
            { _id: new Types.ObjectId(communityId) }, 
            {$pull: { threads : {_id: new Types.ObjectId(threadId)}}}, 
            { new: true }))
    }

    async existing(communityId : string, threadId? : string) : Promise<void> {
        const community = await this.communityModel.findOne({ _id : new Types.ObjectId(communityId) });

        if(!community) {
            throw new HttpException(`Community with id ${communityId} does not exist!`, HttpStatus.BAD_REQUEST);
        }

        if(threadId) {
            if(!(community.threads.filter(thread => thread._id.equals(new Types.ObjectId(threadId))).length > 0)) {
                throw new HttpException(`Thread with id ${threadId} doesn't exist in the community with id ${communityId}!`, HttpStatus.BAD_REQUEST);
            }
        }
    }
}
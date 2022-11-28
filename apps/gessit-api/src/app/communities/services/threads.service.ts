import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { ThreadsRepository } from "../repositories/threads.repository";
import { Thread } from "../schemas/thread.schema";

@Injectable()
export class ThreadsService {
    constructor(private readonly threadRepository : ThreadsRepository) {}

    async getThreadById(id: Types.ObjectId): Promise<Thread> {
        return this.threadRepository.findOne({ _id: id });
    }

    async getThreads(): Promise<Thread[]> {
        return this.threadRepository.find({});
    }

    async createThread(communityId: string, title: string, content: string, image: string): Promise<Thread> {
        return this.threadRepository.create({
            _id: new Types.ObjectId(),
            communityId,
            title,
            content,
            views: 0,
            likes: 0,
            dislikes: 0,
            creationDate: new Date(),
            image 
        });
    }

    async updateThread(id: string, thread: Partial<Thread>): Promise<Thread> {
        thread._id = new Types.ObjectId(thread._id);
        return this.threadRepository.findOneAndUpdate({ _id: new Types.ObjectId(id) }, thread);
    }

    async deleteThread(id: Types.ObjectId): Promise<Thread> {
        return this.threadRepository.findOneAndDelete({ _id: id });
    }
}
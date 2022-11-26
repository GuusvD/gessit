import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { Thread, ThreadDocument } from "../schemas/thread.schema";

@Injectable()
export class ThreadsRepository {
    constructor(@InjectModel(Thread.name) private threadModel: Model<ThreadDocument>) {}

    async findOne(threadFilterQuery: FilterQuery<Thread>): Promise<Thread> {
        return this.threadModel.findOne(threadFilterQuery);
    }

    async find(threadFilterQuery: FilterQuery<Thread>): Promise<Thread[]> {
        return this.threadModel.find(threadFilterQuery);
    }

    async create(thread: Thread): Promise<Thread> {
        const newThread = new this.threadModel(thread);
        return newThread.save();
    }

    async findOneAndUpdate(threadFilterQuery: FilterQuery<Thread>, thread: Partial<Thread>): Promise<Thread> {
        return this.threadModel.findOneAndUpdate(threadFilterQuery, thread);
    }

    async findOneAndDelete(threadFilterQuery: FilterQuery<Thread>): Promise<Thread> {
        return this.threadModel.findOneAndDelete(threadFilterQuery);
    }
}

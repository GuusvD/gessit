import { Types } from 'mongoose';
import { Message } from './message';

export * from '../lib/data.module';

export interface IThread {
    _id: Types.ObjectId;
    title: string;
    content: string;
    views: number;
    likes: Types.ObjectId[];
    creationDate: Date;
    image: string;
    messages: Message[];
    creator: Types.ObjectId;
}

export class Thread implements IThread {
    _id: Types.ObjectId = new Types.ObjectId();
    title: string = '';
    content: string = '';
    views: number = 0;
    likes: Types.ObjectId[] = [];
    creationDate: Date = new Date();
    image: string = '';
    messages: Message[] = [];
    creator: Types.ObjectId = new Types.ObjectId();
}

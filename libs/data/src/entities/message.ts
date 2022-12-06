import { Types } from "mongoose";

export interface IMessage {
    _id: Types.ObjectId;
    creator: Types.ObjectId;
    content: string;
    likes: Types.ObjectId[];
    creationDate: Date;
    hasLikes: boolean;
}

export class Message implements IMessage {
    _id: Types.ObjectId = new Types.ObjectId();
    creator: Types.ObjectId = new Types.ObjectId();
    content: string = '';
    likes: Types.ObjectId[] = [];
    creationDate: Date = new Date();
    hasLikes: boolean = false;
}
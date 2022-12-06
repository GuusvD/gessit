export * from '../lib/data.module';
import { Types } from "mongoose";
import { Theme } from './theme';
import { Thread } from './thread';
import { User } from './user';

export interface ICommunity {
    _id: Types.ObjectId;
    name: string;
    description: string;
    ranking: Number;
    creationDate: Date;
    image: string;
    isOpen: boolean;
    themes: string[];
    threads: Thread[];
    members: Types.ObjectId[];
    owner: User;
}

export class Community implements ICommunity {
    _id: Types.ObjectId = new Types.ObjectId();
    name: string = '';
    description: string = '';
    ranking: Number = 0;
    creationDate: Date = new Date();
    image: string = '';
    isOpen: boolean = true;
    themes: string[] = [];
    threads: Thread[] = [];
    members: Types.ObjectId[] = [];
    owner: User = new User();
}
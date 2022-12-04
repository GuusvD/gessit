export * from '../lib/data.module';
import { Types } from "mongoose";

export interface ICommunity {
    _id: Types.ObjectId;
    name: string;
    description: string;
    image: string;
    creationDate: Date
    isOpen: boolean
}

export class Community implements ICommunity {
    _id = new Types.ObjectId;
    name = '';
    description = '';
    image = '';
    creationDate = new Date();
    isOpen = true;
}
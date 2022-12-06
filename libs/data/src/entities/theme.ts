import { Types } from "mongoose";

export * from '../lib/data.module';

export interface ITheme {
    _id: Types.ObjectId;
    name: string; 
}

export class Theme implements ITheme {
    _id: Types.ObjectId = new Types.ObjectId();
    name: string = '';
}
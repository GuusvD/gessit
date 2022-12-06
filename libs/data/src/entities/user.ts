import { Types } from 'mongoose';

export * from '../lib/data.module';

export interface IUser {
    _id: Types.ObjectId;
    username: string;
    birthDate: Date;
    emailAddress: string;
    phoneNumber: string;
    password: string;
    registerDate: Date;
    image: string;
    access_token: string;
}

export class User implements IUser {
    _id: Types.ObjectId = new Types.ObjectId();
    username: string = '';
    birthDate: Date = new Date();
    emailAddress: string = '';
    phoneNumber: string = '';
    password: string = '';
    registerDate: Date = new Date();
    image: string = '';
    access_token: string = '';
}
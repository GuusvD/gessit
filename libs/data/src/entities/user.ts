import { Types } from 'mongoose';
import { Role } from './role.enum';

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
    roles: Role[];
    following: Types.ObjectId[];
    followers: Types.ObjectId[];
    createdCommunities: Types.ObjectId[];
    joinedCommunities: Types.ObjectId[];
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
    roles: Role[] = [];
    following: Types.ObjectId[] = [];
    followers: Types.ObjectId[] = [];
    createdCommunities: Types.ObjectId[] = [];
    joinedCommunities: Types.ObjectId[] = [];
    access_token: string = '';
}

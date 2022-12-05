export * from '../lib/data.module';

export interface IUser {
    _id: string;
    username: string;
    birthDate: Date;
    emailAddress: string;
    phoneNumber: string;
    password: string;
    registerDate: Date;
    image: string;
}

export class User implements IUser {
    _id: string = '';
    username: string = '';
    birthDate: Date = new Date();
    emailAddress: string = '';
    phoneNumber: string = '';
    password: string = '';
    registerDate: Date = new Date();
    image: string = '';
}
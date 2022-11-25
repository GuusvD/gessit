export * from '../lib/data.module';

export interface IThread {
    _id: string;
    communityId: string;
    title: string;
    content: string;
    views: number;
    likes: number;
    dislikes: number;
    creationDate: Date;
    image: string;
}

export class Thread implements IThread {
    _id: string = '';
    communityId: string = '';
    title: string = '';
    content: string = '';
    views: number = 0;
    likes: number = 0;
    dislikes: number = 0;
    creationDate: Date = new Date();
    image: string = '';
}
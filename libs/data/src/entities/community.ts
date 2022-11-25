export * from '../lib/data.module';

export interface ICommunity {
    _id: string;
    name: string;
    description: string;
    image: string;
    creationDate: Date
    isOpen: boolean
}

export class Community implements ICommunity {
    _id: string = '';
    name: string = '';
    description: string = '';
    image: string = '';
    creationDate: Date = new Date();
    isOpen: boolean = true;
}
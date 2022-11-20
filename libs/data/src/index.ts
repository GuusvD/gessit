export * from './lib/data.module';

export interface Community {
    _id: string;
    name: string;
    description: string;
    image: string;
    creationDate: Date;
    isOpen: boolean;
}
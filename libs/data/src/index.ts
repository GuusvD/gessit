export * from './lib/data.module';

export class Community {
    constructor(
        public _id: string | undefined,
        public name: string | undefined,
        public description: string | undefined,
        public image: string | undefined,
        public creationDate: Date | undefined,
        public isOpen: boolean | undefined
    ) {}
}
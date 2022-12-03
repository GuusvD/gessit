import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type ThreadDocument = Thread & Document;

@Schema()
export class Thread {
    @Prop()
    _id: Types.ObjectId;

    @Prop()
    communityId: string;

    @Prop()
    title: string;

    @Prop()
    content: string;

    @Prop()
    views: number;

    @Prop()
    likes: number;

    @Prop()
    dislikes: number;

    @Prop()
    creationDate: Date;

    @Prop()
    image: string;
}

export const ThreadSchema = SchemaFactory.createForClass(Thread);
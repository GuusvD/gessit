import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Message } from "../messages/message.schema";

export type ThreadDocument = Thread & Document;

@Schema()
export class Thread {
    @Prop()
    _id: Types.ObjectId;

    @Prop()
    title: string;

    @Prop()
    content: string;

    @Prop()
    views: number;

    @Prop({
        ref: 'User'
    })
    likes: [Types.ObjectId];

    @Prop()
    creationDate: Date;

    @Prop()
    image: string;

    @Prop({
        default: []
    })
    messages: [Message]

    @Prop({
        ref: 'User'
    })
    creator: Types.ObjectId;
}

export const ThreadSchema = SchemaFactory.createForClass(Thread);
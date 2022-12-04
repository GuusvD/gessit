import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type MessageDocument = Message & Document;

@Schema()
export class Message {
    @Prop()
    _id: Types.ObjectId;

    @Prop({
        ref: 'User'
    })
    creator: Types.ObjectId;

    @Prop()
    content: string;
    
    @Prop({
        ref: 'User'
    })
    likes: [Types.ObjectId];

    @Prop({
        default: []
    })
    replies: [Message]

    @Prop()
    creationDate: Date;

    @Prop()
    containsReplies: boolean;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
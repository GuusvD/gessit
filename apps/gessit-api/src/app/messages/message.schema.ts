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
    
    @Prop()
    likes: number;

    @Prop()
    dislikes: number;

    @Prop()
    sendDate: Date;
}

export const ThemeSchema = SchemaFactory.createForClass(Message);
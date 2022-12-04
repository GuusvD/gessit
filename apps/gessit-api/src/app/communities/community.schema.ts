import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Theme } from "../themes/theme.schema";
import { Thread } from "../threads/thread.schema";
import { User } from "../users/user.schema";

export type CommunityDocument = Community & Document;

@Schema()
export class Community {
    @Prop()
    _id: Types.ObjectId;

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    ranking: Number;

    @Prop()
    creationDate: Date;

    @Prop()
    image: string;

    @Prop()
    isOpen: boolean;

    @Prop({
        default: []
    })
    themes: Theme[]

    @Prop({
        default: []
    })
    threads: [Thread]

    @Prop({
        default: [],
        ref: 'User'
    })
    members: [Types.ObjectId]

    @Prop()
    owner: User
}

export const CommunitySchema = SchemaFactory.createForClass(Community);
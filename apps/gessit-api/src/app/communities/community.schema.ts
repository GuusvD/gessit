import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

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
}

export const CommunitySchema = SchemaFactory.createForClass(Community);
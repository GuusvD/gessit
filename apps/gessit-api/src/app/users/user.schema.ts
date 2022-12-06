import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types, Schema as MongooseSchema } from "mongoose";
import { Role } from "./role.enum";

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    _id: Types.ObjectId;

    @Prop({
        unique: true
    })
    username: string;

    @Prop()
    birthDate: Date;

    @Prop()
    emailAddress: string;

    @Prop()
    phoneNumber: string;

    @Prop()
    password: string;

    @Prop()
    registerDate: Date;

    @Prop()
    image: string;

    @Prop()
    roles: Role[];

    @Prop({
        ref: 'User'
    })
    following: [Types.ObjectId];

    @Prop({
        ref: 'User'
    })
    followers: [Types.ObjectId];

    @Prop({
        ref: 'Community',
        default: []
    })
    createdCommunities: [Types.ObjectId];

    @Prop({
        ref: 'Community',
        default: []
    })
    joinedCommunities: [Types.ObjectId];
}

export const UserSchema = SchemaFactory.createForClass(User);
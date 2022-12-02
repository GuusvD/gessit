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
        type: [MongooseSchema.Types.ObjectId],
        ref: 'User'
    })
    following: User[];

    @Prop({
        type: [MongooseSchema.Types.ObjectId],
        ref: 'User'
    })
    followers: User[];
}

export const UserSchema = SchemaFactory.createForClass(User);
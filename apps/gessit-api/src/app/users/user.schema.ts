import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {
    isDate,
    IsDate,
    IsDefined,
    isEmail,
    IsEmail,
    IsMobilePhone,
    isMobilePhone,
    IsNotEmpty,
    IsString
} from 'class-validator';
import { Document, Types, Schema as MongooseSchema } from "mongoose";
import { Role } from "./role.enum";

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    _id: Types.ObjectId;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    @Prop({
        required: true,
        unique: true
    })
    username: string;

    @IsDate()
    @IsNotEmpty()
    @IsDefined()
    @Prop({
        required: true,
        validate: {
            validator: isDate
        }
    })
    birthDate: Date;

    @IsEmail()
    @IsNotEmpty()
    @IsDefined()
    @Prop({
        required: true,
        unique: true,
        validate: {
            validator: isEmail
        }
    })
    emailAddress: string;

    @IsMobilePhone()
    @IsNotEmpty()
    @IsDefined()
    @Prop({
        required: true,
        validate: {
            validator: isMobilePhone
        }
    })
    phoneNumber: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    @Prop({
        required: true
    })
    password: string;

    @Prop()
    registerDate: Date;

    @IsString()
    @Prop({
        default: ''
    })
    image: string;

    @Prop({
        default: false
    })
    isActive: boolean;

    @Prop({
        default: [Role.User]
    })
    roles: Role[];

    @Prop({
        ref: 'User',
        default: []
    })
    following: [Types.ObjectId];

    @Prop({
        ref: 'User',
        default: []
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
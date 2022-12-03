import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type ThemeDocument = Theme & Document;

@Schema()
export class Theme {
    @Prop()
    _id: Types.ObjectId;

    @Prop()
    name: string; 
}

export const ThemeSchema = SchemaFactory.createForClass(Theme);
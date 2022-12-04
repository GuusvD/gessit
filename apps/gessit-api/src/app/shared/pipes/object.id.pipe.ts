import { PipeTransform } from "@nestjs/common";
import { ValidationException } from "../filters/validation.exception";
var ObjectId = require('mongoose').Types.ObjectId;

export class ObjectIdPipe implements PipeTransform<string> {
    transform(value: string): string {
        if (!ObjectId.isValid(value)) {
            throw new ValidationException([`ObjectId has wrong value: ${value}, ObjectId is not valid!`]);
        }

        return value;
    }

    public static isValidObjectId(value: any): boolean {
        try {
            ObjectId.createFromHexString(value);
            return true;
        } catch (error) {
            return false;
        }
    }
}
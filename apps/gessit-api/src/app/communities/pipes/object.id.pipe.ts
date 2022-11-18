import { PipeTransform } from "@nestjs/common";
import { ValidationException } from "../../shared/filters/validation.exception";
var ObjectId = require('mongoose').Types.ObjectId;

export class ObjectIdPipe implements PipeTransform<string> {
    transform(value: string): string {
        if (!ObjectId.isValid(value)) {
            throw new ValidationException([`ObjectId has wrong value: ${value}, ObjectId is not valid!`]);
        }

        return value;
    }
}
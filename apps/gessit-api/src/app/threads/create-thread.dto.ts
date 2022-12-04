import {
    IsString
} from 'class-validator';

export class CreateThreadDto {
    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsString()
    image: string;
}
import {
    IsString,
    IsNumber
} from 'class-validator';

export class UpdateThreadDto {
    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsNumber()
    views: number;

    @IsNumber()
    likes: number;

    @IsNumber()
    dislikes: number;

    @IsString()
    image: string;
}
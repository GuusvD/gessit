import {
    IsString,
    IsNumber,
    IsOptional
} from 'class-validator';

export class UpdateThreadDto {
    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    content: string;

    @IsNumber()
    @IsOptional()
    views: number;

    @IsNumber()
    @IsOptional()
    likes: number;

    @IsNumber()
    @IsOptional()
    dislikes: number;

    @IsString()
    @IsOptional()
    image: string;
}
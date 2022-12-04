import {
    IsString,
    IsBoolean,
    IsOptional
} from 'class-validator';
import { Thread } from '../threads/thread.schema';

export class UpdateCommunityDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsOptional()
    image: string;

    @IsBoolean()
    @IsOptional()
    isOpen: boolean;

    @IsOptional()
    themes: string[];

    @IsOptional()
    threads: Thread[];
}
import {
    IsString,
    IsBoolean,
    IsOptional
} from 'class-validator';

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
    themes: string[]
}
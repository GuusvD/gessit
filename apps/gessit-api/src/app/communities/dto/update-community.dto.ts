import {
    IsString,
    IsBoolean
} from 'class-validator';

export class UpdateCommunityDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    image: string;

    @IsBoolean()
    isOpen: boolean;
}
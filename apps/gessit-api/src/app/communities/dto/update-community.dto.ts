import {
    IsString,
    IsNotEmpty,
    IsDefined
} from 'class-validator';

export class UpdateCommunityDto {
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    description: string;

    @IsString()
    image: string;
}
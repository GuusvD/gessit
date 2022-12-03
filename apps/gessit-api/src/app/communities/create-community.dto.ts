import {
    IsString,
    IsNotEmpty,
    IsDefined,
    IsBoolean
} from 'class-validator';

export class CreateCommunityDto {
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    description: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    image: string;

    @IsBoolean()
    @IsNotEmpty()
    @IsDefined()
    isOpen: boolean;
}
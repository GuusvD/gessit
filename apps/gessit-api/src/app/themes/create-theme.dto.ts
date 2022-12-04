import {
    IsDefined,
    IsNotEmpty,
    IsString
} from 'class-validator';

export class CreateThemeDto {
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    name: string;
}
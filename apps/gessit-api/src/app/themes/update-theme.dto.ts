import {
    IsOptional,
    IsString
} from 'class-validator';

export class UpdateThemeDto {
    @IsString()
    @IsOptional()
    name: string;
}
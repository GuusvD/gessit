import {
    IsOptional,
    IsString,
    Matches
} from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    username: string;

    @Matches(/^\d{4}[./-]\d{2}[./-]\d{2}$/)
    @IsOptional()
    birthDate: Date;

    @IsString()
    @IsOptional()
    emailAddress: string;

    @IsString()
    @IsOptional()
    phoneNumber: string;

    @IsString()
    @IsOptional()
    password: string;

    @IsString()
    @IsOptional()
    image: string;
}
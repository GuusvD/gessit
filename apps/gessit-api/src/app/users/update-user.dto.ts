import {
    IsDate,
    IsOptional,
    IsString
} from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    username: string;

    @IsDate()
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
import {
    IsDate,
    IsString
} from 'class-validator';

export class UpdateUserDto {
    @IsString()
    name: string;

    @IsDate()
    birthDate: Date;

    @IsString()
    emailAddress: string;

    @IsString()
    phoneNumber: string;

    @IsString()
    password: string;

    @IsString()
    image: string;
}
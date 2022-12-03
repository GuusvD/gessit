import {
    IsDefined,
    IsNotEmpty,
    IsString,
    Matches
} from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    username: string;

    @Matches(/^\d{4}[./-]\d{2}[./-]\d{2}$/)
    @IsNotEmpty()
    @IsDefined()
    birthDate: Date;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    emailAddress: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    phoneNumber: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    password: string;

    @IsString()
    image: string;
}
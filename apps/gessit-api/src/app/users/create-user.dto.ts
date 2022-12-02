import {
    IsDate,
    IsDefined,
    IsNotEmpty,
    IsString
} from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    username: string;

    //@IsDate()
    //@IsNotEmpty()
    //@IsDefined()
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
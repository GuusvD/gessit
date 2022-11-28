import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateUserDto } from "./create-user.dto";
import { User, UsersService } from "./users.service";

@Controller('user')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    async getUserByEmailAddress(@Param('emailAddress') emailAddress: string): Promise<User> {
        return await this.userService.getUserByEmailAddress(emailAddress);
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.userService.createUser(createUserDto.name, createUserDto.birthDate, createUserDto.emailAddress, createUserDto.phoneNumber, createUserDto.password, createUserDto.image);
    }
}
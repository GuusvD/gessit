import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { Types } from "mongoose";
import { CreateUserDto } from "./create-user.dto";
import { UpdateUserDto } from "./update-user.dto";
import { User, UsersService } from "./users.service";

@Controller('user')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    async getUsers(): Promise<User[]> {
        return await this.userService.getUsers();
    }

    @Get(':emailAddress')
    async getUserByEmailAddress(@Param('emailAddress') emailAddress: string): Promise<User> {
        return await this.userService.getUserByEmailAddress(emailAddress);
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.userService.createUser(createUserDto.name, createUserDto.birthDate, createUserDto.emailAddress, createUserDto.phoneNumber, createUserDto.password, createUserDto.image);
    }

    @Patch(':id')
    async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return await this.userService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<User> {
        return await this.userService.deleteUser(new Types.ObjectId(id));
    }
}
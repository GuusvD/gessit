import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from "@nestjs/common";
import { Types } from "mongoose";
import { Roles } from "../auth/roles.decorator";
import { CreateUserDto } from "./create-user.dto";
import { Role } from "./role.enum";
import { UpdateUserDto } from "./update-user.dto";
import { User, UsersService } from "./users.service";

@Controller('user')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    async getUsers(): Promise<User[]> {
        return await this.userService.getUsers();
    }

    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<User> {
        return await this.userService.getUserById(id);
    }

    @Get(':username')
    async getUserByUsername(@Param('username') username: string): Promise<User> {
        return await this.userService.getUserByUsername(username);
    }

    @Post(':id/follow')
    async followUser(@Req() req, @Param('id') id: string): Promise<User> {
        return await this.userService.followUser(req, id);
    }

    @Post()
    @Roles(Role.Admin)
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.userService.createUser(createUserDto.username, createUserDto.birthDate, createUserDto.emailAddress, createUserDto.phoneNumber, createUserDto.password, createUserDto.image);
    }

    @Patch(':id')
    async updateUser(@Req() req, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return await this.userService.updateUser(req, id, updateUserDto);
    }

    @Delete(':id')
    async deleteUser(@Req() req, @Param('id') id: string): Promise<User> {
        return await this.userService.deleteUser(req, new Types.ObjectId(id));
    }
}
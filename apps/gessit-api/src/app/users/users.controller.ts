import { Body, Controller, Get, Param, Patch, Post, Req } from "@nestjs/common";
import { Roles } from "../auth/roles.decorator";
import { ObjectIdPipe } from "../shared/pipes/object.id.pipe";
import { CreateUserDto } from "./create-user.dto";
import { Role } from "./role.enum";
import { UpdateUserDto } from "./update-user.dto";
import { User } from "./user.schema";
import { UsersService } from "./users.service";

@Controller('user')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    async getUsers(): Promise<User[]> {
        return await this.userService.getUsers();
    }

    @Get(':id')
    async getUserById(@Param('id', ObjectIdPipe) id: string): Promise<User> {
        return await this.userService.getUserById(id);
    }

    @Get(':username')
    async getUserByUsername(@Param('username') username: string): Promise<User> {
        return await this.userService.getUserByUsername(username);
    }

    @Post(':id/follow')
    async followUser(@Req() req, @Param('id', ObjectIdPipe) id: string): Promise<User[]> {
        return await this.userService.followUser(req, id);
    }

    @Post(':id/unfollow')
    async unfollowUser(@Req() req, @Param('id', ObjectIdPipe) id: string): Promise<User[]> {
        return await this.userService.unfollowUser(req, id);
    }

    @Post()
    @Roles(Role.Admin)
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.userService.createUser(createUserDto.username, createUserDto.birthDate, createUserDto.emailAddress, createUserDto.phoneNumber, createUserDto.password, createUserDto.image);
    }

    @Patch(':id')
    async updateUser(@Req() req, @Param('id', ObjectIdPipe) id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return await this.userService.updateUser(req, id, updateUserDto);
    }
}
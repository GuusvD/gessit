import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { Public } from "../app.module";
import { Role } from "../users/role.enum";
import { Roles } from "./roles.decorator";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.guard";
import { CreateUserDto } from "../users/create-user.dto";

@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService) {}

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.body);
    }

    @Public()
    @Post('register')
    async register(@Body() user: CreateUserDto) {
        return this.authService.register(user);
    }
    
    @Roles(Role.User)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}

import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { Public } from "../app.module";
import { Role } from "../users/role.enum";
import { Roles } from "./roles.decorator";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService) {}

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.body);
    }
    
    @Roles(Role.Admin)
    @Get('profile')
    getProfile(@Request() req) {
        return req.body;
    }
}

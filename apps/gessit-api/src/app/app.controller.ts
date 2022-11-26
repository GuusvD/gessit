import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { Public } from './app.module';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  @Public()
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
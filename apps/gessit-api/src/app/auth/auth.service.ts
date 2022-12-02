import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserByUsername(username);

    if (user) {
      const result = await bcrypt.compare(pass, user.password);

      if (result) {
        const { password, ...result } = user;
        return result;
      }
    }

    throw new HttpException('Incorrect password or emailaddress', HttpStatus.BAD_REQUEST);
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: CreateUserDto) {
    const result = await this.usersService.createUser(user.username, user.birthDate, user.emailAddress, user.phoneNumber, user.password, user.image);
    return await this.login(result);
  }
}
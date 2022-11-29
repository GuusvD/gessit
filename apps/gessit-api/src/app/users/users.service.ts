import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { Role } from './role.enum';
import { UsersRepository } from './users.repository';

export type User = any;

@Injectable()
export class UsersService {
  constructor(private readonly userRepository : UsersRepository) {}

  async getUserByEmailAddress(emailAddress: string): Promise<User | undefined> {
    const user = this.userRepository.findOne({ emailAddress: emailAddress });

    if (!user) {
      return undefined;
    } else {
      return user;
    }
  }

  async createUser(name: string, birthDate: Date, emailAddress: string, phoneNumber: string, password: string, image: string): Promise<User> {
    return this.userRepository.create({
      _id: new Types.ObjectId(),
      name,
      birthDate,
      emailAddress,
      phoneNumber,
      password,
      registerDate: new Date(),
      image,
      roles: [Role.User]
    });
  }
}
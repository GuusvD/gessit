import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { Role } from './role.enum';
import { UsersRepository } from './users.repository';

export type User = any;

@Injectable()
export class UsersService {
  constructor(private readonly userRepository : UsersRepository) {}

  async getUserByEmailAddress(emailAddress: string): Promise<User | undefined> {
    return this.userRepository.findOne({ emailAddress: emailAddress });
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find({});
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

  async updateUser(id: string, user: Partial<User>): Promise<User> {
    user._id = new Types.ObjectId(id);
    return this.userRepository.findOneAndUpdate({ _id: new Types.ObjectId(id) }, user);
  }

  async deleteUser(id: Types.ObjectId): Promise<User> {
    return this.userRepository.findOneAndDelete({ _id: id })
  }
}
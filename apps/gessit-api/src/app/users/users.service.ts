import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { Role } from './role.enum';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { ValidationException } from '../shared/filters/validation.exception';
import { User } from './user.schema';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository : UsersRepository) {}

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ username: username });
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find({});
  }

  async getUserById(id: string): Promise<User> {
    return this.userRepository.findOne({ _id: new Types.ObjectId(id) });
  }

  async followUser(req, id: string): Promise<User[]> {
    const user = await this.getUserById(id);
    const loggedInUser = await this.getUserById(req.user.id);

    if (!(loggedInUser._id.equals(user._id))) {
      (loggedInUser.following as any).push(user._id);
      (user.followers as any).push(loggedInUser._id);
  
      const loggedInUserNew = await this.userRepository.findOneAndUpdate({ _id: loggedInUser._id }, loggedInUser);
      const userNew = await this.userRepository.findOneAndUpdate({ _id: user._id }, user);
  
      return [loggedInUserNew, userNew];
    } else {
      throw new ValidationException(['Can not follow yourself!']);
    }
  }

  async createUser(username: string, birthDate: Date, emailAddress: string, phoneNumber: string, password: string, image: string): Promise<User> {
    password = await bcrypt.hashSync(password, 10);

    birthDate = new Date(birthDate);
    birthDate.setHours(birthDate.getHours() + 1);

    if (birthDate > new Date()) {
      throw new ValidationException([`Birthdate ${birthDate} lies in the future!`]);
    }

    if ((await this.getUsers()).filter(p => p.username === username).length > 0) {
      throw new ValidationException([`Username ${username} already in use!`]);
    }

    return this.userRepository.create({
      _id: new Types.ObjectId(),
      username,
      birthDate,
      emailAddress,
      phoneNumber,
      password,
      registerDate: new Date(),
      image,
      roles: [Role.User],
      following: [],
      followers: []
    });
  }

  async updateUser(req, id: string, user: Partial<User>): Promise<User> {
    if (req.user.id.equals(new Types.ObjectId(id)) || req.user.roles.includes(Role.Admin)) {
      if (user.username) {
        if ((await this.getUsers()).filter(p => p.username === user.username && !(p._id.equals(new Types.ObjectId(id)))).length > 0) {
          throw new ValidationException([`Username ${user.username} already in use!`]);
        }
      }

      if (user.birthDate) {
        user.birthDate = new Date(user.birthDate);
        user.birthDate.setHours(user.birthDate.getHours() + 1);

        if (user.birthDate > new Date()) {
          throw new ValidationException([`Birthdate ${user.birthDate} lies in the future!`]);
        }
      }
      
      if (user.password) {
        user.password = await bcrypt.hashSync(user.password, 10);
      }

      user._id = new Types.ObjectId(id);
      return this.userRepository.findOneAndUpdate({ _id: new Types.ObjectId(id) }, user);
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  async deleteUser(req, id: Types.ObjectId): Promise<User> {
    if (req.user.id.equals(new Types.ObjectId(id)) || req.user.roles.includes(Role.Admin)) {
      return this.userRepository.findOneAndDelete({ _id: id })
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
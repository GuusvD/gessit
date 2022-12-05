import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Role } from './role.enum';
import * as bcrypt from 'bcrypt';
import { ValidationException } from '../shared/filters/validation.exception';
import { User, UserDocument } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CommunitiesService } from '../communities/communities.service';
import { Community, CommunityDocument } from '../communities/community.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, @InjectModel(Community.name) private communityModel: Model<CommunityDocument>, @Inject(forwardRef(() => CommunitiesService)) private readonly communitiesService: CommunitiesService) {}

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username: username });
  }

  async getUsers(): Promise<User[]> {
    //return this.userModel.find({});

    return (await this.userModel.aggregate([
      {$unwind: {
        path: "$followers",
        preserveNullAndEmptyArrays: true
      }},
      {$lookup: {
        from: 'users',
        localField: 'followers',
        foreignField: '_id',
        as: 'followers'
      }},
      {$unwind: {
        path: "$following",
        preserveNullAndEmptyArrays: true
      }},
      {$lookup: {
        from: 'users',
        localField: 'following',
        foreignField: '_id',
        as: 'following'
      }},
      {$unset: [
        "following.__v",
        "followers.__v",
        "__v",
        "password",
        "following.password",
        "followers.password"
      ]}
    ]));
  }

  async getUserById(id: string): Promise<User> {
    // await this.existing(id);
    // return this.userModel.findOne({ _id: new Types.ObjectId(id) });

    return (await this.userModel.aggregate([
      {$match: 
        {_id: new Types.ObjectId(id)}
      },
      {$unwind: {
        path: "$followers",
        preserveNullAndEmptyArrays: true
      }},
      {$lookup: {
        from: 'users',
        localField: 'followers',
        foreignField: '_id',
        as: 'followers'
      }},
      {$unwind: {
        path: "$following",
        preserveNullAndEmptyArrays: true
      }},
      {$lookup: {
        from: 'users',
        localField: 'following',
        foreignField: '_id',
        as: 'following'
      }},
      {$unset: [
        "following.__v",
        "followers.__v",
        "__v",
        "password",
        "following.password",
        "followers.password"
      ]}
    ]))[0];
  }

  async followUser(req, id: string): Promise<User[]> {
    await this.existing(id);

    const user = await this.getUserById(id);
    const loggedInUser = await this.getUserById(req.user.id);

    if (!(loggedInUser._id.equals(user._id))) {
      if (!((await this.userModel.find({ $and: [ {_id: req.user.id}, {following: { $in : new Types.ObjectId(id)}} ] })).length > 0)) {
        (loggedInUser.following as any).push(user._id);
        (user.followers as any).push(loggedInUser._id);
    
        const loggedInUserNew = await this.userModel.findOneAndUpdate({ _id: loggedInUser._id }, loggedInUser);
        const userNew = await this.userModel.findOneAndUpdate({ _id: user._id }, user);
    
        return [loggedInUserNew, userNew];
      } else {
        throw new ValidationException(['Already following this user!']);
      }
    } else {
      throw new ValidationException(['Can not follow yourself!']);
    }
  }

  async unfollowUser(req, id: string): Promise<User[]> {
    await this.existing(id);

    const user = await this.getUserById(id);
    const loggedInUser = await this.getUserById(req.user.id);

    if (!(loggedInUser._id.equals(user._id))) {
      if (!((await this.userModel.find({ $and: [ {_id: req.user.id}, {following: { $in : new Types.ObjectId(id)}} ] })).length === 0)) {
        (loggedInUser.following as any).pull(user._id);
        (user.followers as any).pull(loggedInUser._id);
        
        const loggedInUserNew = await this.userModel.findOneAndUpdate({ _id: loggedInUser._id }, loggedInUser);
        const userNew = await this.userModel.findOneAndUpdate({ _id: user._id }, user);

        return [loggedInUserNew, userNew];
      } else {
        throw new ValidationException(['You do not follow this user!']);
      }
    } else {
      throw new ValidationException(['Can not unfollow yourself!']);
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

    const newUser = new this.userModel({
      _id: new Types.ObjectId(),
      username,
      birthDate,
      emailAddress,
      phoneNumber,
      password,
      registerDate: new Date(),
      image,
      roles: [Role.User]
    });

    return this.userModel.create(newUser);
  }

  async updateUser(req, id: string, user: Partial<User>): Promise<User> {
    await this.existing(id);

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

      const ownedCommunities = (await this.communitiesService.getCommunities()).filter(p => p.owner._id.equals(user._id));

      ownedCommunities.forEach(async comm => {
        await this.communityModel.updateOne({ _id: new Types.ObjectId(comm._id)}, { $set: { owner: {...(await this.getUserById(id)), ...user} }});
      });

      return this.userModel.findOneAndUpdate({ _id: new Types.ObjectId(id) }, user);
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  async existing(userId: string): Promise<void> {
    const user = await this.userModel.findOne({ _id: new Types.ObjectId(userId) });

    if (!user) {
      throw new ValidationException([`User with id ${userId} does not exist!`]);
    }
  }
}
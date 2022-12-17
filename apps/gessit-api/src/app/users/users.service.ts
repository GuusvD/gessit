import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Role } from './role.enum';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CommunitiesService } from '../communities/communities.service';
import { Community, CommunityDocument } from '../communities/community.schema';
import { Neo4jService } from '../neo4j/neo4j.service';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, @InjectModel(Community.name) private communityModel: Model<CommunityDocument>, @Inject(forwardRef(() => CommunitiesService)) private readonly communitiesService: CommunitiesService, private readonly neo4jService: Neo4jService) {}

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username: username });
  }

  async getUsers(): Promise<User[]> {
    return await this.userModel.aggregate([
      {$lookup: {
        from: "users",
        localField: "following",
        foreignField: "_id",
        as: "following"
      }},
      {$lookup: {
        from: "users",
        localField: "followers",
        foreignField: "_id",
        as: "followers"
      }},
      {$unset: ["password", "__v"]}
    ])
  }

  async getUserById(id: string): Promise<User> {
    await this.existing(id);

    return (await this.userModel.aggregate([
      {$match: { "_id": new Types.ObjectId(id) }},
      {$lookup: {
        from: "users",
        localField: "following",
        foreignField: "_id",
        as: "following"
      }},
      {$lookup: {
        from: "users",
        localField: "followers",
        foreignField: "_id",
        as: "followers"
      }},
      {$unset: ["__v"]}
    ]))[0];
  }

  async addJoinedCommunity(communityId: Types.ObjectId, userId: Types.ObjectId): Promise<User> {
    await this.existing(userId.toString());

    return await this.userModel.findOneAndUpdate({ _id: userId }, { $push: { joinedCommunities: communityId } }, {new: true});
  }

  async addCreatedCommunity(communityId: Types.ObjectId, userId: Types.ObjectId): Promise<User> {
    await this.existing(userId.toString());
    const user = await this.userModel.findOne({ _id: userId });

    for await (const createdCommunityId of user.createdCommunities) {
      await this.communityModel.updateMany({ _id: new Types.ObjectId(createdCommunityId), "owner._id": new Types.ObjectId(userId) }, { $push:  {"owner.$[_id]createdCommunities": communityId } } );
    }

    return await this.userModel.findOneAndUpdate({ _id: userId }, { $push: { createdCommunities: communityId } }, {new: true});
  }

  async removeJoinedCommunity(communityId: Types.ObjectId, userId: Types.ObjectId): Promise<User> {
    await this.existing(userId.toString());

    const community = await this.communityModel.findOne({ _id: communityId });

    if(community.owner._id.equals(userId)) {
      await this.communityModel.updateMany({ _id: communityId, "owner._id": userId }, { $pull:  {"owner.$.joinedCommunities": communityId } } );
    }

    return await this.userModel.findOneAndUpdate({ _id: userId }, { $pull: { joinedCommunities: communityId } }, {new: true});
  }

  async removeCreatedCommunity(communityId: Types.ObjectId, userId: Types.ObjectId): Promise<User> {
    await this.existing(userId.toString());
  
    return await this.userModel.findOneAndUpdate({ _id: userId }, { $pull: { createdCommunities: communityId } }, {new: true});
  }

  async followUser(req, id: string): Promise<User[]> {
    await this.existing(id);

    const user = await this.getUserById(id);
    const loggedInUser = await this.getUserById(req.user.id);

    if (!(loggedInUser._id.equals(user._id))) {
      if (!((await this.userModel.find({ $and: [ {_id: req.user.id}, {following: { $in : new Types.ObjectId(id)}} ] })).length > 0)) {
        const resultUser = await this.userModel.findOneAndUpdate({_id: new Types.ObjectId(id)}, {$push: {"followers": new Types.ObjectId(req.user.id)}}, {new: true});
        const resultLoggedIn = await this.userModel.findOneAndUpdate({_id: new Types.ObjectId(req.user.id)}, {$push: {"following": new Types.ObjectId(id)}}, {new: true});
    
        return [resultLoggedIn, resultUser];
      } else {
        throw new HttpException('Already following this user!', HttpStatus.BAD_REQUEST);
      }
    } else {
      throw new HttpException('Can not follow yourself!', HttpStatus.BAD_REQUEST);
    }
  }

  async unfollowUser(req, id: string): Promise<User[]> {
    await this.existing(id);

    const user = await this.getUserById(id);
    const loggedInUser = await this.getUserById(req.user.id);

    if (!(loggedInUser._id.equals(user._id))) {
      if (!((await this.userModel.find({ $and: [ {_id: req.user.id}, {following: { $in : new Types.ObjectId(id)}} ] })).length === 0)) {
        const resultUser = await this.userModel.findOneAndUpdate({_id: new Types.ObjectId(id)}, {$pull: {"followers": new Types.ObjectId(req.user.id)}}, {new: true});
        const resultLoggedIn = await this.userModel.findOneAndUpdate({_id: new Types.ObjectId(req.user.id)}, {$pull: {"following": new Types.ObjectId(id)}}, {new: true});

        return [resultLoggedIn, resultUser];
      } else {
        throw new HttpException('You do not follow this user!', HttpStatus.BAD_REQUEST);
      }
    } else {
      throw new HttpException('Can not unfollow yourself!', HttpStatus.BAD_REQUEST);
    }
  }

  async createUser(username: string, birthDate: Date, emailAddress: string, phoneNumber: string, password: string, image: string): Promise<User> {
    password = await bcrypt.hashSync(password, 10);

    birthDate = new Date(birthDate);
    birthDate.setHours(birthDate.getHours() + 1);

    if (birthDate > new Date()) {
      throw new HttpException(`Birthdate ${birthDate} lies in the future!`, HttpStatus.BAD_REQUEST);
    }

    if ((await this.getUsers()).filter(p => p.username === username).length > 0) {
      throw new HttpException(`Username ${username} already in use!`, HttpStatus.BAD_REQUEST);
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
      roles: [Role.User],
      isActive: true
    });

    const result = await this.userModel.create(newUser);

    await this.neo4jService.write(`
      CREATE
      (n:User {
      id: '${result._id.toString()}',
      username: '${newUser.username}', 
      birthDate: '${newUser.birthDate.toISOString()}'
     })`,
    {});

    return result;
  }

  async updateUser(req, id: string, user: Partial<User>): Promise<User> {
    await this.existing(id);

    if (req.user.id.equals(new Types.ObjectId(id)) || req.user.roles.includes(Role.Admin)) {
      if (user.username) {
        if ((await this.getUsers()).filter(p => p.username === user.username && !(p._id.equals(new Types.ObjectId(id)))).length > 0) {
          throw new HttpException(`Username ${user.username} already in use!`, HttpStatus.BAD_REQUEST);
        }
      }

      if (user.birthDate) {
        user.birthDate = new Date(user.birthDate);
        user.birthDate.setHours(user.birthDate.getHours() + 1);

        if (user.birthDate > new Date()) {
          throw new HttpException(`Birthdate ${user.birthDate} lies in the future!`, HttpStatus.BAD_REQUEST);
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
      throw new HttpException(`User with id ${userId} does not exist!`, HttpStatus.BAD_REQUEST);
    }
  }
}
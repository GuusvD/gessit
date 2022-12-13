import { Test } from '@nestjs/testing';

import { Model, disconnect, Types } from 'mongoose';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { User, UserDocument, UserSchema } from "./user.schema";
import { Role } from './role.enum';

describe('User Schema Tests', () => {
  let mongod: MongoMemoryServer;
  let userModel: Model<UserDocument>;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async () => {
            mongod = await MongoMemoryServer.create();
            const uri = mongod.getUri();
            return {uri};
          },
        }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
      ],
    }).compile();

    userModel = app.get<Model<UserDocument>>(getModelToken(User.name));
    await userModel.ensureIndexes();
  });

  afterAll(async () => {
    await disconnect();
    await mongod.stop();
  });

  it('has a required username', () => {
    const model = new userModel();

    const err = model.validateSync();

    expect(err.errors.username).toBeInstanceOf(Error);
  });

  it('has a required birth date', () => {
    const model = new userModel();

    const err = model.validateSync();

    expect(err.errors.birthDate).toBeInstanceOf(Error);
  });

  it('has a required email address', () => {
    const model = new userModel();

    const err = model.validateSync();

    expect(err.errors.emailAddress).toBeInstanceOf(Error);
  });

  it('has a required phone number', () => {
    const model = new userModel();

    const err = model.validateSync();

    expect(err.errors.phoneNumber).toBeInstanceOf(Error);
  });

  it('has a required password', () => {
    const model = new userModel();

    const err = model.validateSync();

    expect(err.errors.password).toBeInstanceOf(Error);
  });

  it('has an empty list as default following', () => {
    const model = new userModel();

    expect(model.following).toStrictEqual([]);
  });

  it('has an empty list as default followers', () => {
    const model = new userModel();

    expect(model.followers).toStrictEqual([]);
  });

  it('has an empty list as default createdCommunities', () => {
    const model = new userModel();

    expect(model.createdCommunities).toStrictEqual([]);
  });

  it('has an empty list as default joinedCommunities', () => {
    const model = new userModel();

    expect(model.joinedCommunities).toStrictEqual([]);
  });

  it('has a default isActive value', () => {
    const model = new userModel();

    expect(model.isActive).toStrictEqual(false);
  });

  it('has a default image value', () => {
    const model = new userModel();

    expect(model.image).toStrictEqual('');
  });

  it('has a default role', () => {
    const model = new userModel();

    expect(model.roles.at(0)).toStrictEqual(Role.User);
  });

  it('has an invalid email address', () => {
    const model = new userModel({ emailAddress: "test" });

    const err = model.validateSync();

    expect(err.errors.emailAddress).toBeInstanceOf(Error);
  });

  it('has an invalid birth date', () => {
    const model = new userModel({ birthDate: "2022-00-00" });

    const err = model.validateSync();

    expect(err.errors.birthDate).toBeInstanceOf(Error);
  });

  it('has an invalid phone number', () => {
    const model = new userModel({ phoneNumber: "12345" });

    const err = model.validateSync();

    expect(err.errors.phoneNumber).toBeInstanceOf(Error);
  });

  it('has a unique username', async () => {
    const original = new userModel({_id: new Types.ObjectId(), username: 'Test1', emailAddress: 'test1@gmail.com', birthDate: new Date(), phoneNumber: "06 12345678", password: "12345"});
    const duplicate = new userModel({_id: new Types.ObjectId(), username: 'Test1', emailAddress: 'test1@gmail.com', birthDate: new Date(), phoneNumber: "06 12345678", password: "12345"});

    await original.save();

    await expect(duplicate.save()).rejects.toThrow();
  });

  it('has a unique email address', async () => {
    const original = new userModel({_id: new Types.ObjectId(), username: 'Test2', emailAddress: 'test2@gmail.com', birthDate: new Date(), phoneNumber: "06 12345678", password: "12345"});
    const duplicate = new userModel({_id: new Types.ObjectId(), username: 'Test2', emailAddress: 'test2@gmail.com', birthDate: new Date(), phoneNumber: "06 12345678", password: "12345"});

    await original.save();

    await expect(duplicate.save()).rejects.toThrow();
  });
});

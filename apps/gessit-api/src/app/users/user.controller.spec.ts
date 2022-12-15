import { Test, TestingModule } from '@nestjs/testing';
import { CanActivate } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Public } from '../../app/app.module';
import { User } from './user.schema';
import { Types } from 'mongoose';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';

describe('User controller - Integration tests', () => {
    let app: TestingModule;
    let usersController: UsersController;
    let usersService: UsersService;
    let fakeGuard: CanActivate = { canActivate: () => true };

    beforeAll(async () => {
        app = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [{
                provide: UsersService,
                useValue: {
                    getUsers: jest.fn(),
                    getUserById: jest.fn(),
                    createUser: jest.fn(),
                    updateUser: jest.fn(),
                },
            }],
        })
            .overrideGuard(Public).useValue(fakeGuard)
            .compile();

        usersController = app.get<UsersController>(UsersController);
        usersService = app.get<UsersService>(UsersService);
    });

    it('should call getUsers on the service', async () => {
        const exampleUsers: User[] = [
            {
                _id: new Types.ObjectId(),
                username: 'John Doe',
                birthDate: new Date(),
                emailAddress: 'j.doe@gmail.com',
                phoneNumber: '06 12345678',
                password: '12345',
                registerDate: new Date(),
                image: 'test.png',
                isActive: true,
                roles: null,
                following: null,
                followers: null,
                createdCommunities: null,
                joinedCommunities: null
            },
            {
                _id: new Types.ObjectId(),
                username: 'Rob Doe',
                birthDate: new Date(),
                emailAddress: 'r.doe@gmail.com',
                phoneNumber: '06 12345678',
                password: '12345',
                registerDate: new Date(),
                image: 'test.png',
                isActive: true,
                roles: null,
                following: null,
                followers: null,
                createdCommunities: null,
                joinedCommunities: null
            }
        ]

        const getUsers = jest.spyOn(usersService, 'getUsers')
            .mockImplementation(async () => exampleUsers);

        const results = await usersController.getUsers();

        expect(getUsers).toBeCalledTimes(1);
        expect(results).toHaveLength(2);

        expect(results[0]).toHaveProperty('_id', exampleUsers[0]._id);
        expect(results[0]).toHaveProperty('username', exampleUsers[0].username);
        expect(results[0]).toHaveProperty('birthDate', exampleUsers[0].birthDate);
        expect(results[0]).toHaveProperty('emailAddress', exampleUsers[0].emailAddress);
        expect(results[0]).toHaveProperty('phoneNumber', exampleUsers[0].phoneNumber);
        expect(results[0]).toHaveProperty('password', exampleUsers[0].password);
        expect(results[0]).toHaveProperty('registerDate', exampleUsers[0].registerDate);
        expect(results[0]).toHaveProperty('image', exampleUsers[0].image);
        expect(results[0]).toHaveProperty('isActive', exampleUsers[0].isActive);

        expect(results[1]).toHaveProperty('_id', exampleUsers[1]._id);
        expect(results[1]).toHaveProperty('username', exampleUsers[1].username);
        expect(results[1]).toHaveProperty('birthDate', exampleUsers[1].birthDate);
        expect(results[1]).toHaveProperty('emailAddress', exampleUsers[1].emailAddress);
        expect(results[1]).toHaveProperty('phoneNumber', exampleUsers[1].phoneNumber);
        expect(results[1]).toHaveProperty('password', exampleUsers[1].password);
        expect(results[1]).toHaveProperty('registerDate', exampleUsers[1].registerDate);
        expect(results[1]).toHaveProperty('image', exampleUsers[1].image);
        expect(results[1]).toHaveProperty('isActive', exampleUsers[1].isActive);
    });

    it('should call getUserById on the service', async () => {
        const exampleUser: User = {
            _id: new Types.ObjectId(),
            username: 'John Doe',
            birthDate: new Date(),
            emailAddress: 'j.doe@gmail.com',
            phoneNumber: '06 12345678',
            password: '12345',
            registerDate: new Date(),
            image: 'test.png',
            isActive: true,
            roles: null,
            following: null,
            followers: null,
            createdCommunities: null,
            joinedCommunities: null
        };

        const getUserById = jest.spyOn(usersService, 'getUserById')
            .mockImplementation(async () => exampleUser);

        const userId = '639a6d184362b5279e5094a0';

        const result = await usersController.getUserById(userId);

        expect(getUserById).toBeCalledTimes(1);
        
        expect(result).toHaveProperty('_id', exampleUser._id);
        expect(result).toHaveProperty('username', exampleUser.username);
        expect(result).toHaveProperty('birthDate', exampleUser.birthDate);
        expect(result).toHaveProperty('emailAddress', exampleUser.emailAddress);
        expect(result).toHaveProperty('phoneNumber', exampleUser.phoneNumber);
        expect(result).toHaveProperty('password', exampleUser.password);
        expect(result).toHaveProperty('registerDate', exampleUser.registerDate);
        expect(result).toHaveProperty('image', exampleUser.image);
        expect(result).toHaveProperty('isActive', exampleUser.isActive);
    });

    it('should call create on the service', async () => {
        const exampleUser: User = {
            _id: new Types.ObjectId(),
            username: 'John Doe',
            birthDate: new Date(),
            emailAddress: 'j.doe@gmail.com',
            phoneNumber: '06 12345678',
            password: '12345',
            registerDate: new Date(),
            image: 'test.png',
            isActive: true,
            roles: null,
            following: null,
            followers: null,
            createdCommunities: null,
            joinedCommunities: null
        }

        const exampleUserDto: CreateUserDto = { ...exampleUser };

        const createUser = jest.spyOn(usersService, 'createUser')
            .mockImplementation(async () => exampleUser);

        const result: any = await usersController.createUser(exampleUserDto);

        expect(createUser).toBeCalledTimes(1);

        expect(result).toHaveProperty('_id', exampleUser._id);
        expect(result).toHaveProperty('username', exampleUser.username);
        expect(result).toHaveProperty('birthDate', exampleUser.birthDate);
        expect(result).toHaveProperty('emailAddress', exampleUser.emailAddress);
        expect(result).toHaveProperty('phoneNumber', exampleUser.phoneNumber);
        expect(result).toHaveProperty('password', exampleUser.password);
        expect(result).toHaveProperty('registerDate', exampleUser.registerDate);
        expect(result).toHaveProperty('image', exampleUser.image);
        expect(result).toHaveProperty('isActive', exampleUser.isActive);
    });

    it('should call create on the service', async () => {
        const exampleUser: User = {
            _id: new Types.ObjectId(),
            username: 'John Doe',
            birthDate: new Date(),
            emailAddress: 'j.doe@gmail.com',
            phoneNumber: '06 12345678',
            password: '12345',
            registerDate: new Date(),
            image: 'test.png',
            isActive: true,
            roles: null,
            following: null,
            followers: null,
            createdCommunities: null,
            joinedCommunities: null
        }

        const exampleUserDto: UpdateUserDto = { ...exampleUser };

        const updateUser = jest.spyOn(usersService, 'updateUser')
            .mockImplementation(async () => exampleUser);

        const userId = '639a6d184362b5279e5094a0';

        const result: any = await usersController.updateUser(null, userId, exampleUserDto);

        expect(updateUser).toBeCalledTimes(1);

        expect(result).toHaveProperty('_id', exampleUser._id);
        expect(result).toHaveProperty('username', exampleUser.username);
        expect(result).toHaveProperty('birthDate', exampleUser.birthDate);
        expect(result).toHaveProperty('emailAddress', exampleUser.emailAddress);
        expect(result).toHaveProperty('phoneNumber', exampleUser.phoneNumber);
        expect(result).toHaveProperty('password', exampleUser.password);
        expect(result).toHaveProperty('registerDate', exampleUser.registerDate);
        expect(result).toHaveProperty('image', exampleUser.image);
        expect(result).toHaveProperty('isActive', exampleUser.isActive);
    });
});

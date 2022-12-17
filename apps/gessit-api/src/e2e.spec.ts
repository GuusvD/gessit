import request = require('supertest');
import { INestApplication, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from "@nestjs/mongoose";
import { Test, TestingModule } from '@nestjs/testing';
import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from "mongodb-memory-server";
import { disconnect } from 'mongoose';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { AuthModule } from './app/auth/auth.module';
import { JwtAuthGuard } from './app/auth/jwt-auth.guard';
import { RolesGuard } from './app/auth/roles.guard';
import { ThemesModule } from './app/themes/themes.module';
import { CommunitiesModule } from './app/communities/communities.module';
import { MessagesModule } from './app/messages/messages.module';
import { ThreadsModule } from './app/threads/threads.module';
import { UsersModule } from './app/users/users.module';
import { Neo4jModule } from './app/neo4j/neo4j.module';

let mongod: MongoMemoryServer;
let uri: string;

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: async () => {
                mongod = await MongoMemoryServer.create();
                uri = mongod.getUri();
                return { uri };
            },
        }),
        CommunitiesModule,
        ThreadsModule,
        UsersModule,
        AuthModule,
        ThemesModule,
        MessagesModule,
        Neo4jModule
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
        AppService
    ],
})
export class TestAppModule {}

describe('end-to-end tests of Gessit API', () => {
    let app: INestApplication;
    let server;
    let module: TestingModule;
    let mongoc: MongoClient;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [TestAppModule],
        })
            .compile();

        app = module.createNestApplication();
        await app.init();

        mongoc = new MongoClient(uri);
        await mongoc.connect();

        server = app.getHttpServer();
    });

    beforeEach(async () => {
        await mongoc.db('test').collection('communities').deleteMany({});
        await mongoc.db('test').collection('users').deleteMany({});
        await mongoc.db('test').collection('themes').deleteMany({});
    });

    afterAll(async () => {
        await mongoc.close();
        await disconnect();
        await mongod.stop();
    });

    it('a user registers, logs in, and gets 0 communities', async () => {
        const registerCredentials = {
            username: 'John',
            birthDate: new Date('2000-01-01'),
            password: '12345',
            phoneNumber: '06 12345678',
            emailAddress: 'john.doe@gmail.com',
            image: 'test.png'
        };

        const register = await request(server)
            .post('/auth/register')
            .send(registerCredentials);

        expect(register.body).toHaveProperty('_id')
        expect(register.body).toHaveProperty('access_token')
        expect(register.body).toHaveProperty('emailAddress')
        expect(register.body).toHaveProperty('image')
        expect(register.body).toHaveProperty('roles')
        expect(register.body).toHaveProperty('username')

        expect(register.status).toBe(201);

        const loginCredentials = {
            username: 'John',
            password: '12345'
        }

        const login = await request(server)
            .post('/auth/login')
            .send(loginCredentials);

        expect(login.status).toBe(201);

        expect(login.body).toHaveProperty('_id')
        expect(login.body).toHaveProperty('access_token')
        expect(login.body).toHaveProperty('emailAddress')
        expect(login.body).toHaveProperty('image')
        expect(login.body).toHaveProperty('roles')
        expect(login.body).toHaveProperty('username')

        const token = login.body.access_token;

        const communities = await request(server)
            .get('/community')
            .set('Authorization', 'bearer ' + token);

        expect(communities.status).toBe(200);
    });

    it('a user registers, logs in, and creates a new theme', async () => {
        const registerCredentials = {
            username: 'John',
            birthDate: new Date('2000-01-01'),
            password: '12345',
            phoneNumber: '06 12345678',
            emailAddress: 'john.doe@gmail.com',
            image: 'test.png'
        };

        const register = await request(server)
            .post('/auth/register')
            .send(registerCredentials);

        expect(register.body).toHaveProperty('_id')
        expect(register.body).toHaveProperty('access_token')
        expect(register.body).toHaveProperty('emailAddress')
        expect(register.body).toHaveProperty('image')
        expect(register.body).toHaveProperty('roles')
        expect(register.body).toHaveProperty('username')

        expect(register.status).toBe(201);

        const loginCredentials = {
            username: 'John',
            password: '12345'
        }

        const login = await request(server)
            .post('/auth/login')
            .send(loginCredentials);

        expect(login.status).toBe(201);

        expect(login.body).toHaveProperty('_id')
        expect(login.body).toHaveProperty('access_token')
        expect(login.body).toHaveProperty('emailAddress')
        expect(login.body).toHaveProperty('image')
        expect(login.body).toHaveProperty('roles')
        expect(login.body).toHaveProperty('username')

        const token = login.body.access_token;

        const theme = {
            name: "Test theme"
        };

        const result = await request(server)
            .post('/theme')
            .send(theme)
            .set('Authorization', 'bearer ' + token)

        expect(result.body).toHaveProperty('_id')
        expect(result.body).toHaveProperty('name')
    });

    it('a user registers, logs in, and creates a new theme, gets the new theme and creates a new community', async () => {
        const registerCredentials = {
            username: 'John',
            birthDate: new Date('2000-01-01'),
            password: '12345',
            phoneNumber: '06 12345678',
            emailAddress: 'john.doe@gmail.com',
            image: 'test.png'
        };

        const register = await request(server)
            .post('/auth/register')
            .send(registerCredentials);

        expect(register.body).toHaveProperty('_id')
        expect(register.body).toHaveProperty('access_token')
        expect(register.body).toHaveProperty('emailAddress')
        expect(register.body).toHaveProperty('image')
        expect(register.body).toHaveProperty('roles')
        expect(register.body).toHaveProperty('username')

        expect(register.status).toBe(201);

        const loginCredentials = {
            username: 'John',
            password: '12345'
        }

        const login = await request(server)
            .post('/auth/login')
            .send(loginCredentials);

        expect(login.status).toBe(201);

        expect(login.body).toHaveProperty('_id')
        expect(login.body).toHaveProperty('access_token')
        expect(login.body).toHaveProperty('emailAddress')
        expect(login.body).toHaveProperty('image')
        expect(login.body).toHaveProperty('roles')
        expect(login.body).toHaveProperty('username')

        const token = login.body.access_token;

        const newTheme = {
            name: "Test theme"
        };

        const theme = await request(server)
            .post('/theme')
            .send(newTheme)
            .set('Authorization', 'bearer ' + token)

        expect(theme.body).toHaveProperty('_id')
        expect(theme.body).toHaveProperty('name')

        const community = {
            name: "Test community",
            description: "A test community",
            image: "test.png",
            isOpen: true,
            themes: [theme._body._id.toString()]
        }

        const createCommunity = await request(server)
            .post('/community')
            .set('Authorization', 'bearer ' + token)
            .send(community);

        expect(createCommunity.status).toBe(201);

        expect(createCommunity.body).toHaveProperty('_id')
        expect(createCommunity.body).toHaveProperty('name')
        expect(createCommunity.body).toHaveProperty('description')
        expect(createCommunity.body).toHaveProperty('ranking')
        expect(createCommunity.body).toHaveProperty('creationDate')
        expect(createCommunity.body).toHaveProperty('image')
        expect(createCommunity.body).toHaveProperty('isOpen')
        expect(createCommunity.body).toHaveProperty('themes')
        expect(createCommunity.body).toHaveProperty('members')
        expect(createCommunity.body).toHaveProperty('owner')
        expect(createCommunity.body).toHaveProperty('threads')
    });

    it('a user registers, logs in, and creates a new theme, gets the new theme and creates a new community and creates a new thread', async () => {
        const registerCredentials = {
            username: 'John',
            birthDate: new Date('2000-01-01'),
            password: '12345',
            phoneNumber: '06 12345678',
            emailAddress: 'john.doe@gmail.com',
            image: 'test.png'
        };

        const register = await request(server)
            .post('/auth/register')
            .send(registerCredentials);

        expect(register.body).toHaveProperty('_id')
        expect(register.body).toHaveProperty('access_token')
        expect(register.body).toHaveProperty('emailAddress')
        expect(register.body).toHaveProperty('image')
        expect(register.body).toHaveProperty('roles')
        expect(register.body).toHaveProperty('username')

        expect(register.status).toBe(201);

        const loginCredentials = {
            username: 'John',
            password: '12345'
        }

        const login = await request(server)
            .post('/auth/login')
            .send(loginCredentials);

        expect(login.status).toBe(201);

        expect(login.body).toHaveProperty('_id')
        expect(login.body).toHaveProperty('access_token')
        expect(login.body).toHaveProperty('emailAddress')
        expect(login.body).toHaveProperty('image')
        expect(login.body).toHaveProperty('roles')
        expect(login.body).toHaveProperty('username')

        const token = login.body.access_token;

        const newTheme = {
            name: "Test theme"
        };

        const theme = await request(server)
            .post('/theme')
            .send(newTheme)
            .set('Authorization', 'bearer ' + token)

        expect(theme.body).toHaveProperty('_id')
        expect(theme.body).toHaveProperty('name')

        const community = {
            name: "Test community",
            description: "A test community",
            image: "test.png",
            isOpen: true,
            themes: [theme._body._id.toString()]
        }

        const createCommunity = await request(server)
            .post('/community')
            .set('Authorization', 'bearer ' + token)
            .send(community);

        expect(createCommunity.status).toBe(201);

        expect(createCommunity.body).toHaveProperty('_id')
        expect(createCommunity.body).toHaveProperty('name')
        expect(createCommunity.body).toHaveProperty('description')
        expect(createCommunity.body).toHaveProperty('ranking')
        expect(createCommunity.body).toHaveProperty('creationDate')
        expect(createCommunity.body).toHaveProperty('image')
        expect(createCommunity.body).toHaveProperty('isOpen')
        expect(createCommunity.body).toHaveProperty('themes')
        expect(createCommunity.body).toHaveProperty('members')
        expect(createCommunity.body).toHaveProperty('owner')
        expect(createCommunity.body).toHaveProperty('threads')

        const thread = {
            title: "Test thread",
            content: "A test thread",
            image: "test.png"
        }

        const createThread = await request(server)
            .post(`/community/${createCommunity._body._id}/thread`)
            .set('Authorization', 'bearer ' + token)
            .send(thread)

        expect(createThread.status).toBe(201);

        expect(createThread.body).toHaveProperty('_id')
        expect(createThread.body).toHaveProperty('name')
        expect(createThread.body).toHaveProperty('description')
        expect(createThread.body).toHaveProperty('ranking')
        expect(createThread.body).toHaveProperty('creationDate')
        expect(createThread.body).toHaveProperty('image')
        expect(createThread.body).toHaveProperty('isOpen')
        expect(createThread.body).toHaveProperty('themes')
        expect(createThread.body).toHaveProperty('members')
        expect(createThread.body).toHaveProperty('owner')
        expect(createThread.body).toHaveProperty('threads')

        expect(createThread.body.threads[0]).toHaveProperty('_id')
        expect(createThread.body.threads[0]).toHaveProperty('title')
        expect(createThread.body.threads[0]).toHaveProperty('content')
        expect(createThread.body.threads[0]).toHaveProperty('image')
        expect(createThread.body.threads[0]).toHaveProperty('views')
        expect(createThread.body.threads[0]).toHaveProperty('likes')
        expect(createThread.body.threads[0]).toHaveProperty('creationDate')
        expect(createThread.body.threads[0]).toHaveProperty('messages')
        expect(createThread.body.threads[0]).toHaveProperty('creator')
    });

    it('a user registers, logs in, and creates a new theme, gets the new theme and creates a new community, creates a new thread and creates a new message', async () => {
        const registerCredentials = {
            username: 'John',
            birthDate: new Date('2000-01-01'),
            password: '12345',
            phoneNumber: '06 12345678',
            emailAddress: 'john.doe@gmail.com',
            image: 'test.png'
        };

        const register = await request(server)
            .post('/auth/register')
            .send(registerCredentials);

        expect(register.body).toHaveProperty('_id')
        expect(register.body).toHaveProperty('access_token')
        expect(register.body).toHaveProperty('emailAddress')
        expect(register.body).toHaveProperty('image')
        expect(register.body).toHaveProperty('roles')
        expect(register.body).toHaveProperty('username')

        expect(register.status).toBe(201);

        const loginCredentials = {
            username: 'John',
            password: '12345'
        }

        const login = await request(server)
            .post('/auth/login')
            .send(loginCredentials);

        expect(login.status).toBe(201);

        expect(login.body).toHaveProperty('_id')
        expect(login.body).toHaveProperty('access_token')
        expect(login.body).toHaveProperty('emailAddress')
        expect(login.body).toHaveProperty('image')
        expect(login.body).toHaveProperty('roles')
        expect(login.body).toHaveProperty('username')

        const token = login.body.access_token;

        const newTheme = {
            name: "Test theme"
        };

        const theme = await request(server)
            .post('/theme')
            .send(newTheme)
            .set('Authorization', 'bearer ' + token)

        expect(theme.body).toHaveProperty('_id')
        expect(theme.body).toHaveProperty('name')

        expect(theme.status).toBe(201);

        const community = {
            name: "Test community",
            description: "A test community",
            image: "test.png",
            isOpen: true,
            themes: [theme._body._id.toString()]
        }

        const createCommunity = await request(server)
            .post('/community')
            .set('Authorization', 'bearer ' + token)
            .send(community);

        expect(createCommunity.status).toBe(201);

        expect(createCommunity.body).toHaveProperty('_id')
        expect(createCommunity.body).toHaveProperty('name')
        expect(createCommunity.body).toHaveProperty('description')
        expect(createCommunity.body).toHaveProperty('ranking')
        expect(createCommunity.body).toHaveProperty('creationDate')
        expect(createCommunity.body).toHaveProperty('image')
        expect(createCommunity.body).toHaveProperty('isOpen')
        expect(createCommunity.body).toHaveProperty('themes')
        expect(createCommunity.body).toHaveProperty('members')
        expect(createCommunity.body).toHaveProperty('owner')
        expect(createCommunity.body).toHaveProperty('threads')

        const thread = {
            title: "Test thread",
            content: "A test thread",
            image: "test.png"
        }

        const createThread = await request(server)
            .post(`/community/${createCommunity._body._id}/thread`)
            .set('Authorization', 'bearer ' + token)
            .send(thread)

        expect(createThread.status).toBe(201);

        expect(createThread.body).toHaveProperty('_id')
        expect(createThread.body).toHaveProperty('name')
        expect(createThread.body).toHaveProperty('description')
        expect(createThread.body).toHaveProperty('ranking')
        expect(createThread.body).toHaveProperty('creationDate')
        expect(createThread.body).toHaveProperty('image')
        expect(createThread.body).toHaveProperty('isOpen')
        expect(createThread.body).toHaveProperty('themes')
        expect(createThread.body).toHaveProperty('members')
        expect(createThread.body).toHaveProperty('owner')
        expect(createThread.body).toHaveProperty('threads')

        expect(createThread.body.threads[0]).toHaveProperty('_id')
        expect(createThread.body.threads[0]).toHaveProperty('title')
        expect(createThread.body.threads[0]).toHaveProperty('content')
        expect(createThread.body.threads[0]).toHaveProperty('image')
        expect(createThread.body.threads[0]).toHaveProperty('views')
        expect(createThread.body.threads[0]).toHaveProperty('likes')
        expect(createThread.body.threads[0]).toHaveProperty('creationDate')
        expect(createThread.body.threads[0]).toHaveProperty('messages')
        expect(createThread.body.threads[0]).toHaveProperty('creator')

        const message = {
            content: "New message"
        }

        const createMessage = await request(server)
            .post(`/community/${createThread._body._id}/thread/${createThread._body.threads[0]._id}/message`)
            .set('Authorization', 'bearer ' + token)
            .send(message)

        expect(createMessage.status).toBe(201);

        expect(createMessage.body).toHaveProperty('_id')
        expect(createMessage.body).toHaveProperty('creator')
        expect(createMessage.body).toHaveProperty('content')
        expect(createMessage.body).toHaveProperty('likes')
        expect(createMessage.body).toHaveProperty('creationDate')
        expect(createMessage.body).toHaveProperty('hasLikes')
    });
});

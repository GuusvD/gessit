import { SetMetadata } from '@nestjs/common';
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommunitiesModule } from './communities/communities.module';
import { ThreadsModule } from './threads/threads.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/roles.guard';
import { ThemesModule } from './themes/themes.module';
import { MessagesModule } from './messages/messages.module';
import { Neo4jModule } from './neo4j/neo4j.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/gessit'), CommunitiesModule, ThreadsModule, AuthModule, UsersModule, ThemesModule, MessagesModule, Neo4jModule.forRoot({
    scheme: 'bolt',
    host: '127.0.0.1',
    port: 7687,
    username: 'neo4j',
    password: 'neo',
  })],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    },
    AppService
  ],
})
export class AppModule {}

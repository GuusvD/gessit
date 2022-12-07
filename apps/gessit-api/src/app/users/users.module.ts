import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommunitiesModule } from '../communities/communities.module';
import { Neo4jModule } from '../neo4j/neo4j.module';
import { User, UserSchema } from './user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), forwardRef(() => CommunitiesModule), Neo4jModule.forRoot({
    scheme: 'bolt',
    host: '127.0.0.1',
    port: 7687,
    username: 'neo4j',
    password: 'neo',
  })],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
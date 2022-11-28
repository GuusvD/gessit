import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommunitiesModule } from './communities/communities.module';
import { ThreadsModule } from './communities/threads.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/gessit'), CommunitiesModule, ThreadsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

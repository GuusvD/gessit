import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommunitiesModule } from './communities/communities.module';

@Module({
  imports: [MongooseModule.forRoot("mongodb+srv://Gustave:Yp3QW4xmuMnEHAiR@gessit-cluster.m6gvewv.mongodb.net/?retryWrites=true&w=majority"), CommunitiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

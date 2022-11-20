import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommunitiesModule } from './communities/communities.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URL), CommunitiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

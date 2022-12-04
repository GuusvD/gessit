import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { Thread, ThreadSchema } from "./thread.schema";
import { ThreadsController } from "./threads.controller";
import { ThreadsService } from "./threads.service";
import { UsersModule } from "../users/users.module";
import { CommunitiesModule } from "../communities/communities.module";

@Module({
    imports: [MongooseModule.forFeature([{ name: Thread.name, schema: ThreadSchema }]), UsersModule, CommunitiesModule],
    controllers: [ThreadsController],
    providers: [ThreadsService]
})

export class ThreadsModule {}
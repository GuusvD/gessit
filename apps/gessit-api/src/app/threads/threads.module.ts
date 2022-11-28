import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { Thread, ThreadSchema } from "./thread.schema";
import { ThreadsController } from "./threads.controller";
import { ThreadsService } from "./threads.service";
import { ThreadsRepository } from "./threads.repository";

@Module({
    imports: [MongooseModule.forFeature([{ name: Thread.name, schema: ThreadSchema }])],
    controllers: [ThreadsController],
    providers: [ThreadsService, ThreadsRepository]
})

export class ThreadsModule {}
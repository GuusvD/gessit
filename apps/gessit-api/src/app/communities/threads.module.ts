import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { Thread, ThreadSchema } from "./schemas/thread.schema";
import { ThreadsController } from "./controllers/threads.controller";
import { ThreadsService } from "./services/threads.service";
import { ThreadsRepository } from "./repositories/threads.repository";

@Module({
    imports: [MongooseModule.forFeature([{ name: Thread.name, schema: ThreadSchema }])],
    controllers: [ThreadsController],
    providers: [ThreadsService, ThreadsRepository]
})

export class ThreadsModule {}
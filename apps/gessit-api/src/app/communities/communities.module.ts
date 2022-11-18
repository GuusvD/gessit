import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { Community, CommunitySchema } from "./schemas/community.schema";
import { CommunitiesController } from "./controllers/communities.controller";
import { CommunitiesService } from "./services/communities.service";
import { CommunitiesRepository } from "./repositories/communities.repository";

@Module({
    imports: [MongooseModule.forFeature([{ name: Community.name, schema: CommunitySchema }])],
    controllers: [CommunitiesController],
    providers: [CommunitiesService, CommunitiesRepository]
})

export class CommunitiesModule {}
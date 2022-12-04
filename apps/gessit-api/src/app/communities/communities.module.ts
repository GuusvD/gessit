import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { Community, CommunitySchema } from "./community.schema";
import { CommunitiesController } from "./communities.controller";
import { CommunitiesService } from "./communities.service";
import { ThemesModule } from "../themes/themes.module";
import { UsersModule } from "../users/users.module";

@Module({
    imports: [MongooseModule.forFeature([{ name: Community.name, schema: CommunitySchema }]), ThemesModule, UsersModule],
    controllers: [CommunitiesController],
    providers: [CommunitiesService],
    exports: [MongooseModule, CommunitiesService]
})

export class CommunitiesModule {}
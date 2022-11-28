import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { Community, CommunityDocument } from "./community.schema";

@Injectable()
export class CommunitiesRepository {
    constructor(@InjectModel(Community.name) private communityModel: Model<CommunityDocument>) {}

    async findOne(communityFilterQuery: FilterQuery<Community>): Promise<Community> {
        return this.communityModel.findOne(communityFilterQuery);
    }

    async find(communitiesFilterQuery: FilterQuery<Community>): Promise<Community[]> {
        return this.communityModel.find(communitiesFilterQuery);
    }

    async create(community: Community): Promise<Community> {
        const newCommunity = new this.communityModel(community);
        return newCommunity.save();
    }

    async findOneAndUpdate(communityFilterQuery: FilterQuery<Community>, community: Partial<Community>): Promise<Community> {
        return this.communityModel.findOneAndUpdate(communityFilterQuery, community);
    }

    async findOneAndDelete(communityFilterQuery: FilterQuery<Community>): Promise<Community> {
        return this.communityModel.findOneAndDelete(communityFilterQuery);
    }
}
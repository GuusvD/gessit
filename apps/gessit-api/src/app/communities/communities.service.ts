import { Injectable } from "@nestjs/common";
import { CommunitiesRepository } from "./communities.repository";
import { Community } from "./community.schema";
import { Types } from "mongoose";

@Injectable()
export class CommunitiesService {
    constructor(private readonly communityRepository : CommunitiesRepository) {}

    async getCommunityById(id: Types.ObjectId): Promise<Community> {
        return this.communityRepository.findOne({ _id: id });
    }

    async getCommunities(): Promise<Community[]> {
        return this.communityRepository.find({});
    }

    async createCommunity(name: string, description: string, image: string, isOpen: boolean): Promise<Community> {
        return this.communityRepository.create({
            _id: new Types.ObjectId(),
            name,
            description,
            ranking: 0,
            creationDate: new Date(),
            image,
            isOpen 
        });
    }

    async updateCommunity(id: string, community: Partial<Community>): Promise<Community> {
        community._id = new Types.ObjectId(community._id);
        return this.communityRepository.findOneAndUpdate({ _id: new Types.ObjectId(id) }, community);
    }

    async deleteCommunity(id: Types.ObjectId): Promise<Community> {
        return this.communityRepository.findOneAndDelete({ _id: id });
    }
}
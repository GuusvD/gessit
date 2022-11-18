import { Injectable } from "@nestjs/common";
import { CommunitiesRepository } from "../repositories/communities.repository";
import { Community } from "../schemas/community.schema";

@Injectable()
export class CommunitiesService {
    constructor(private readonly communityRepository : CommunitiesRepository) {}

    async getCommunityById(id: string): Promise<Community> {
        return this.communityRepository.findOne({ _id: id });
    }

    async getCommunities(): Promise<Community[]> {
        return this.communityRepository.find({});
    }

    async createCommunity(name: string, description: string): Promise<Community> {
        return this.communityRepository.create({
            name,
            description,
            ranking: 0,
            creationDate: new Date(),
            image: "url"
        });
    }

    async updateCommunity(id: string, community: Partial<Community>): Promise<Community> {
        return this.communityRepository.findOneAndUpdate({ _id: id }, community);
    }

    async deleteCommunity(id: string): Promise<Community> {
        return this.communityRepository.findOneAndDelete({ _id: id });
    }
}
import { Injectable } from "@nestjs/common";
import { Community, CommunityDocument } from "./community.schema";
import { Model, Types } from "mongoose";
import { ThemesService } from "../themes/themes.service";
import { UsersService } from "../users/users.service";
import { UpdateCommunityDto } from "./update-community.dto";
import { Theme } from "../themes/theme.schema";
import { CreateCommunityDto } from "./create-community.dto";
import { InjectModel } from "@nestjs/mongoose";
import { ValidationException } from "../shared/filters/validation.exception";
import { ObjectIdPipe } from "../shared/pipes/object.id.pipe";

@Injectable()
export class CommunitiesService {
    constructor(@InjectModel(Community.name) private communityModel: Model<CommunityDocument>, private readonly themesService : ThemesService, private readonly usersService : UsersService) {}

    async getCommunityById(id: Types.ObjectId): Promise<Community> {
        return this.communityModel.findOne({ _id: id });
    }

    async getCommunities(): Promise<Community[]> {
        return this.communityModel.find({});
    }

    async createCommunity(req, createCommunityDto: CreateCommunityDto): Promise<Community> {
        if (createCommunityDto.themes) {
            if (!(await this.areValidObjectIds(createCommunityDto.themes as string[]))) {
                throw new ValidationException(['Themes attribute data must be of type ObjectId!'])
            }
        }

        const themesArray = (await this.themesService.getThemes()).filter(p => createCommunityDto.themes.includes(p._id.toString()));

        const mergedCommunity = new this.communityModel({
            ...createCommunityDto,
            _id: new Types.ObjectId(),
            creationDate: new Date(),
            ranking: 0,
            themes: themesArray,
            owner: await this.usersService.getUserById(req.user.id)
        });
        
        return this.communityModel.create(mergedCommunity);
    }

    async updateCommunity(id: string, updateCommunityDto: UpdateCommunityDto): Promise<Community> {
        if (updateCommunityDto.themes) {
            if (!(await this.areValidObjectIds(updateCommunityDto.themes as string[]))) {
                throw new ValidationException(['Themes attribute data must be of type ObjectId!'])
            }
        }

        let updatedObject = {};

        if (updateCommunityDto.themes) {
            const themes : Theme[] = [];

            for (const theme of updateCommunityDto.themes) {
                themes.push(await this.themesService.getThemeById(new Types.ObjectId(theme)));
            }

            delete updateCommunityDto.themes;

            updatedObject = { themes };
        }

        updatedObject = { ...updateCommunityDto, ...updatedObject };

        return this.communityModel.findOneAndUpdate({ _id: new Types.ObjectId(id) }, updatedObject);
    }

    async deleteCommunity(id: Types.ObjectId): Promise<Community> {
        return this.communityModel.findOneAndDelete({ _id: id });
    }

    async areValidObjectIds(value: string[]) {
        return value.every((id) => ObjectIdPipe.isValidObjectId(id));
    }
}

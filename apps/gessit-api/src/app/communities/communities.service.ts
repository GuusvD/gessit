import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
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
import { Role } from "../users/role.enum";

@Injectable()
export class CommunitiesService {
    constructor(@InjectModel(Community.name) private communityModel: Model<CommunityDocument>, private readonly themesService : ThemesService, @Inject(forwardRef(() => UsersService)) private readonly usersService : UsersService) {}

    async getCommunityById(id: string): Promise<Community> {
        await this.existing(id);
        return await this.communityModel.findOne({ _id: new Types.ObjectId(id) });
    }

    async getCommunities(): Promise<Community[]> {
        return await this.communityModel.find({});
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
        
        return await this.communityModel.create(mergedCommunity);
    }

    async joinCommunity(req, id: string): Promise<Community> {
        await this.existing(id);

        if ((await this.getCommunityById(id)).owner._id.equals(req.user.id)) {
            throw new ValidationException(['Can not join your own created community!']);
        }

        if ((await this.getCommunityById(id)).members.filter(p => p._id.equals(req.user.id)).length > 0) {
            throw new ValidationException(['Already part of this community!']);
        }

        return await this.communityModel.findOneAndUpdate({_id: new Types.ObjectId(id)}, {$push: {members: (await this.usersService.getUserById(req.user.id))._id}});
    }

    async leaveCommunity(req, id: string): Promise<Community> {
        await this.existing(id);

        if ((await this.getCommunityById(id)).owner._id.equals(req.user.id)) {
            throw new ValidationException(['Can not leave your own created community!']);
        }

        if ((await this.getCommunityById(id)).members.filter(p => p._id.equals(req.user.id)).length === 0) {
            throw new ValidationException(['Not part of this community!']);
        }

        return await this.communityModel.findOneAndUpdate({_id: new Types.ObjectId(id)}, {$pull: {members: (await this.usersService.getUserById(req.user.id))._id}});
    }

    async updateCommunity(req, id: string, updateCommunityDto: UpdateCommunityDto): Promise<Community> {
        if (updateCommunityDto.themes) {
            if (!(await this.areValidObjectIds(updateCommunityDto.themes as string[]))) {
                throw new ValidationException(['Themes attribute data must be of type ObjectId!'])
            }
        }

        await this.existing(id);

        if ((await this.getCommunityById(id)).owner._id.equals(req.user.id) || req.user.roles.includes(Role.Admin)) {
            let updatedObject = {};

            if (updateCommunityDto.themes) {
                const themes : Theme[] = [];
    
                for (const theme of updateCommunityDto.themes) {
                    themes.push(await this.themesService.getThemeById(theme));
                }
    
                delete updateCommunityDto.themes;
    
                updatedObject = { themes };
            }
    
            updatedObject = { ...updateCommunityDto, ...updatedObject };
    
            return this.communityModel.findOneAndUpdate({ _id: new Types.ObjectId(id) }, updatedObject);
        } else {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
    }

    async deleteCommunity(req, id: string): Promise<Community> {
        await this.existing(id);

        if ((await this.getCommunityById(id)).owner._id.equals(req.user.id) || req.user.roles.includes(Role.Admin)) {
            return this.communityModel.findOneAndDelete({ _id: new Types.ObjectId(id) });
        } else {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
    }

    async areValidObjectIds(value: string[]) {
        return value.every((id) => ObjectIdPipe.isValidObjectId(id));
    }

    async existing(communityId: string): Promise<void> {
        const community = await this.communityModel.findOne({ _id: new Types.ObjectId(communityId) });

        if (!community) {
            throw new ValidationException([`Community with id ${communityId} does not exist!`])
        }
    }
}

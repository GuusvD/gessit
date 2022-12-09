import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Community, CommunityDocument } from "./community.schema";
import { Model, Types } from "mongoose";
import { ThemesService } from "../themes/themes.service";
import { UsersService } from "../users/users.service";
import { UpdateCommunityDto } from "./update-community.dto";
import { Theme } from "../themes/theme.schema";
import { CreateCommunityDto } from "./create-community.dto";
import { InjectModel } from "@nestjs/mongoose";
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

    async getJoinedCommunities(req): Promise<Community[]> {
        const joinedCommunities : Community[] = []

        const user = await this.usersService.getUserById(req.user.id);

        for await (const communityId of user.joinedCommunities) {
            joinedCommunities.push(await this.getCommunityById(communityId.toString()));
        }

        return joinedCommunities;
    }

    async getCreatedCommunities(req): Promise<Community[]> {
        const createdCommunities : Community[] = []

        const user = await this.usersService.getUserById(req.user.id);

        for await (const communityId of user.createdCommunities) {
            createdCommunities.push(await this.getCommunityById(communityId.toString()));
        }

        return createdCommunities;
    }

    async createCommunity(req, createCommunityDto: CreateCommunityDto): Promise<Community> {
        if (createCommunityDto.themes) {
            if (!(await this.areValidObjectIds(createCommunityDto.themes as string[]))) {
                throw new HttpException('Themes attribute data must be of type ObjectId!', HttpStatus.BAD_REQUEST)
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

        await this.usersService.addCreatedCommunity(mergedCommunity._id, new Types.ObjectId(req.user.id));
        const community = await this.communityModel.create(mergedCommunity);

        await this.communityModel.updateMany({ _id: mergedCommunity._id, "owner._id": new Types.ObjectId(req.user.id) }, { $push:  {"owner.$[_id]createdCommunities": mergedCommunity._id } } );

        return community;
    }

    async joinCommunity(req, id: string): Promise<Community> {
        await this.existing(id);

        if ((await this.getCommunityById(id)).owner._id.equals(req.user.id)) {
            throw new HttpException('Can not join your own created community!', HttpStatus.BAD_REQUEST);
        }

        if ((await this.getCommunityById(id)).members.filter(p => p._id.equals(req.user.id)).length > 0) {
            throw new HttpException('Already part of this community!', HttpStatus.BAD_REQUEST);
        }

        await this.usersService.addJoinedCommunity(new Types.ObjectId(id), new Types.ObjectId(req.user.id));
        const community = await this.communityModel.findOneAndUpdate({_id: new Types.ObjectId(id)}, {$push: {members: (await this.usersService.getUserById(req.user.id))._id}});

        await this.communityModel.updateMany({ _id: new Types.ObjectId(id), "owner._id": new Types.ObjectId(req.user.id) }, { $push:  {"owner.$[_id]joinedCommunities": new Types.ObjectId(id) } } );

        return community;
    }

    async leaveCommunity(req, id: string): Promise<Community> {
        await this.existing(id);

        if ((await this.getCommunityById(id)).owner._id.equals(req.user.id)) {
            throw new HttpException('Can not leave your own created community!', HttpStatus.BAD_REQUEST);
        }

        if ((await this.getCommunityById(id)).members.filter(p => p._id.equals(req.user.id)).length === 0) {
            throw new HttpException('Not part of this community!', HttpStatus.BAD_REQUEST);
        }

        await this.usersService.removeJoinedCommunity(new Types.ObjectId(id), new Types.ObjectId(req.user.id));
        const community = await this.communityModel.findOneAndUpdate({_id: new Types.ObjectId(id)}, {$pull: {members: (await this.usersService.getUserById(req.user.id))._id}});

        await this.communityModel.updateMany({ _id: new Types.ObjectId(id), "owner._id": new Types.ObjectId(req.user.id) }, { $pull:  {"owner.$[_id]joinedCommunities": new Types.ObjectId(id) } } );
        return community;
    }

    async updateCommunity(req, id: string, updateCommunityDto: UpdateCommunityDto): Promise<Community> {
        if (updateCommunityDto.themes) {
            if (!(await this.areValidObjectIds(updateCommunityDto.themes as string[]))) {
                throw new HttpException('Themes attribute data must be of type ObjectId!', HttpStatus.BAD_REQUEST)
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
    
            return await this.communityModel.findOneAndUpdate({ _id: new Types.ObjectId(id) }, updatedObject);
        } else {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
    }

    async deleteCommunity(req, id: string): Promise<Community> {
        await this.existing(id);

        const community = await this.communityModel.findOne({_id: new Types.ObjectId(id)});
        const creator = await this.usersService.getUserById(community.owner._id.toString());

        if ((await this.getCommunityById(id)).owner._id.equals(req.user.id) || req.user.roles.includes(Role.Admin)) {
            for await (const memberId of community.members) {
                await this.usersService.removeJoinedCommunity(new Types.ObjectId(community._id), new Types.ObjectId(memberId));
            };

            await this.usersService.removeCreatedCommunity(new Types.ObjectId(id), new Types.ObjectId(creator._id));
            return await this.communityModel.findOneAndDelete({ _id: new Types.ObjectId(id) });
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
            throw new HttpException(`Community with id ${communityId} does not exist!`, HttpStatus.BAD_REQUEST)
        }
    }
}

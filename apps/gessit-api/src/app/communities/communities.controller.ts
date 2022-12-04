import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { CreateCommunityDto } from './create-community.dto';
import { Community } from './community.schema';
import { UpdateCommunityDto } from './update-community.dto';
import { Types } from 'mongoose';

@Controller('community')
export class CommunitiesController {
  constructor(private readonly communityService: CommunitiesService) {}

  @Get()
  async getCommunities(): Promise<Community[]> {
    return await this.communityService.getCommunities();
  }

  @Get(':id')
  async getCommunityById(@Param('id') id: string): Promise<Community> {
    return await this.communityService.getCommunityById(new Types.ObjectId(id));
  }

  @Post()
  async createCommunity(@Req() req, @Body() createCommunityDto: CreateCommunityDto): Promise<Community> {
    return await this.communityService.createCommunity(req, createCommunityDto);
  }

  @Post(':id/join')
  async joinCommunity(@Req() req, @Param('id') id: string): Promise<Community> {
    return await this.communityService.joinCommunity(req, id);
  }

  @Post(':id/leave')
  async leaveCommunity(@Req() req, @Param('id') id: string): Promise<Community> {
    return await this.communityService.leaveCommunity(req, id);
  }

  @Patch(':id')
  async updateCommunity(@Param('id') id: string, @Body() updateCommunityDto: UpdateCommunityDto): Promise<Community> {
    return await this.communityService.updateCommunity(id, updateCommunityDto);
  }

  @Delete(':id')
  async deleteCommunity(@Param('id') id: string): Promise<Community> {
    return await this.communityService.deleteCommunity(new Types.ObjectId(id));
  }
}

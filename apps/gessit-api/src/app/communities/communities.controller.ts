import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { CreateCommunityDto } from './create-community.dto';
import { Community } from './community.schema';
import { UpdateCommunityDto } from './update-community.dto';
import { ObjectIdPipe } from '../shared/pipes/object.id.pipe';

@Controller('community')
export class CommunitiesController {
  constructor(private readonly communityService: CommunitiesService) {}

  @Get()
  async getCommunities(): Promise<Community[]> {
    return await this.communityService.getCommunities();
  }

  @Get(':id')
  async getCommunityById(@Param('id', ObjectIdPipe) id: string): Promise<Community> {
    return await this.communityService.getCommunityById(id);
  }

  @Post()
  async createCommunity(@Req() req, @Body() createCommunityDto: CreateCommunityDto): Promise<Community> {
    return await this.communityService.createCommunity(req, createCommunityDto);
  }

  @Post(':id/join')
  async joinCommunity(@Req() req, @Param('id', ObjectIdPipe) id: string): Promise<Community> {
    return await this.communityService.joinCommunity(req, id);
  }

  @Post(':id/leave')
  async leaveCommunity(@Req() req, @Param('id', ObjectIdPipe) id: string): Promise<Community> {
    return await this.communityService.leaveCommunity(req, id);
  }

  @Patch(':id')
  async updateCommunity(@Req() req, @Param('id', ObjectIdPipe) id: string, @Body() updateCommunityDto: UpdateCommunityDto): Promise<Community> {
    return await this.communityService.updateCommunity(req, id, updateCommunityDto);
  }

  @Delete(':id')
  async deleteCommunity(@Req() req, @Param('id', ObjectIdPipe) id: string): Promise<Community> {
    return await this.communityService.deleteCommunity(req, id);
  }
}

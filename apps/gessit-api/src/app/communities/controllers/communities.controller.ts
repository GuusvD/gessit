import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CommunitiesService } from '../services/communities.service';
import { CreateCommunityDto } from '../dto/create-community.dto';
import { Community } from '../schemas/community.schema';
import { UpdateCommunityDto } from '../dto/update-community.dto';
import { ObjectIdPipe } from '../pipes/object.id.pipe';

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
  async createCommunity(@Body() createCommunityDto: CreateCommunityDto): Promise<Community> {
    return await this.communityService.createCommunity(createCommunityDto.name, createCommunityDto.description);
  }

  @Patch(':id')
  async updateCommunity(@Param('id', ObjectIdPipe) id: string, @Body() updateCommunityDto: UpdateCommunityDto): Promise<Community> {
    return await this.communityService.updateCommunity(id, updateCommunityDto);
  }

  @Delete(':id')
  async deleteCommunity(@Param('id', ObjectIdPipe) id: string): Promise<Community> {
    return await this.communityService.deleteCommunity(id);
  }
}

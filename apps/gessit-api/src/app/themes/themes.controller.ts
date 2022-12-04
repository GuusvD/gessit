import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Types } from 'mongoose';
import { ObjectIdPipe } from '../shared/pipes/object.id.pipe';
import { CreateThemeDto } from './create-theme.dto';
import { Theme } from './theme.schema';
import { ThemesService } from './themes.service';
import { UpdateThemeDto } from './update-theme.dto';

@Controller('theme')
export class ThemesController {
  constructor(private readonly themeService: ThemesService) {}

  @Get()
  async getThemes(): Promise<Theme[]> {
    return await this.themeService.getThemes();
  }

  @Get(':id')
  async getThemeById(@Param('id', ObjectIdPipe) id: string): Promise<Theme> {
    return await this.themeService.getThemeById(new Types.ObjectId(id));
  }

  @Post()
  async createTheme(@Body() createThemeDto: CreateThemeDto): Promise<Theme> {
    return await this.themeService.createTheme(createThemeDto.name);
  }

  @Patch(':id')
  async updateTheme(@Param('id', ObjectIdPipe) id: string, @Body() updateThemeDto: UpdateThemeDto): Promise<Theme> {
    return await this.themeService.updateTheme(id, updateThemeDto);
  }

  @Delete(':id')
  async deleteTheme(@Param('id', ObjectIdPipe) id: string): Promise<Theme> {
    return await this.themeService.deleteTheme(new Types.ObjectId(id));
  }
}

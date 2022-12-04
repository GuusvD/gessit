import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Roles } from '../auth/roles.decorator';
import { ObjectIdPipe } from '../shared/pipes/object.id.pipe';
import { Role } from '../users/role.enum';
import { CreateThemeDto } from './create-theme.dto';
import { Theme } from './theme.schema';
import { ThemesService } from './themes.service';

@Controller('theme')
export class ThemesController {
  constructor(private readonly themeService: ThemesService) {}

  @Get()
  async getThemes(): Promise<Theme[]> {
    return await this.themeService.getThemes();
  }

  @Get(':id')
  async getThemeById(@Param('id', ObjectIdPipe) id: string): Promise<Theme> {
    return await this.themeService.getThemeById(id);
  }

  @Roles(Role.Admin)
  @Post()
  async createTheme(@Body() createThemeDto: CreateThemeDto): Promise<Theme> {
    return await this.themeService.createTheme(createThemeDto.name);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async deleteTheme(@Param('id', ObjectIdPipe) id: string): Promise<Theme> {
    return await this.themeService.deleteTheme(id);
  }
}

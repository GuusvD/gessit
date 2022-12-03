import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Theme, ThemeSchema } from './theme.schema';
import { ThemesController } from './themes.controller';
import { ThemesRepository } from './themes.repository';
import { ThemesService } from './themes.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Theme.name, schema: ThemeSchema }])],
    controllers: [ThemesController],
    providers: [ThemesService, ThemesRepository]
})

export class ThemesModule {}

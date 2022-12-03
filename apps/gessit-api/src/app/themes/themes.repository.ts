import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { Theme, ThemeDocument } from "./theme.schema";

@Injectable()
export class ThemesRepository {
    constructor(@InjectModel(Theme.name) private themeModel: Model<ThemeDocument>) {}

    async findOne(threadFilterQuery: FilterQuery<Theme>): Promise<Theme> {
        return this.themeModel.findOne(threadFilterQuery);
    }

    async find(themeFilterQuery: FilterQuery<Theme>): Promise<Theme[]> {
        return this.themeModel.find(themeFilterQuery);
    }

    async create(theme: Theme): Promise<Theme> {
        const newTheme = new this.themeModel(theme);
        return newTheme.save();
    }

    async findOneAndUpdate(themeFilterQuery: FilterQuery<Theme>, theme: Partial<Theme>): Promise<Theme> {
        return this.themeModel.findOneAndUpdate(themeFilterQuery, theme);
    }

    async findOneAndDelete(themeFilterQuery: FilterQuery<Theme>): Promise<Theme> {
        return this.themeModel.findOneAndDelete(themeFilterQuery);
    }
}
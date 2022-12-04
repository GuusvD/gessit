import { Injectable } from "@nestjs/common";
import { Model, Types } from "mongoose";
import { Theme, ThemeDocument } from "./theme.schema";
import { ValidationException } from "../shared/filters/validation.exception";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class ThemesService {
    constructor(@InjectModel(Theme.name) private themeModel: Model<ThemeDocument>) {}

    async getThemeById(id: Types.ObjectId): Promise<Theme> {
        return this.themeModel.findOne({ _id: id });
    }

    async getThemes(): Promise<Theme[]> {
        return this.themeModel.find({});
    }

    async createTheme(name: string): Promise<Theme> {
        if ((await this.getThemes()).filter(p => p.name === name).length > 0) {
            throw new ValidationException(['A Theme with this name already exists!'])
        }

        const newTheme = new this.themeModel({
            _id: new Types.ObjectId(),
            name
        })

        return newTheme.save();
    }

    async updateTheme(id: string, theme: Partial<Theme>): Promise<Theme> {
        if ((await this.getThemes()).filter(p => p.name === theme.name).length > 0) {
            throw new ValidationException(['A Theme with this name already exists!'])
        }

        return this.themeModel.findOneAndUpdate({ _id: new Types.ObjectId(id) }, theme);
    }

    async deleteTheme(id: Types.ObjectId): Promise<Theme> {
        return this.themeModel.findOneAndDelete({ _id: id });
    }
}
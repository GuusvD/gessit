import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { ThemesRepository } from "./themes.repository";
import { Theme } from "./theme.schema";
import { ValidationException } from "../shared/filters/validation.exception";

@Injectable()
export class ThemesService {
    constructor(private readonly themeRepository : ThemesRepository) {}

    async getThemeById(id: Types.ObjectId): Promise<Theme> {
        return this.themeRepository.findOne({ _id: id });
    }

    async getThemes(): Promise<Theme[]> {
        return this.themeRepository.find({});
    }

    async createTheme(name: string): Promise<Theme> {
        if ((await this.getThemes()).filter(p => p.name === name).length > 0) {
            throw new ValidationException(['A Theme with this name already exists!'])
        }

        return this.themeRepository.create({
            _id: new Types.ObjectId(),
            name
        });
    }

    async updateTheme(id: string, theme: Partial<Theme>): Promise<Theme> {
        if ((await this.getThemes()).filter(p => p.name === theme.name).length > 0) {
            throw new ValidationException(['A Theme with this name already exists!'])
        }

        return this.themeRepository.findOneAndUpdate({ _id: new Types.ObjectId(id) }, theme);
    }

    async deleteTheme(id: Types.ObjectId): Promise<Theme> {
        return this.themeRepository.findOneAndDelete({ _id: id });
    }
}
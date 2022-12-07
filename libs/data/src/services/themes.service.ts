import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "apps/gessit-app/src/app/auth/auth.service";
import { Observable } from "rxjs";
import { Theme } from "../entities/theme";
import { environment } from "../../../../apps/gessit-app/src/environments/environment.prod";

@Injectable({providedIn: 'root',})
export class ThemesService {
    constructor(private httpClient: HttpClient, private authService: AuthService) {}

    getThemes(): Observable<Theme[]> {
        const httpOptions = this.authService.formHeaders();
        return this.httpClient.get<Theme[]>(environment.BASE_API_URL + 'theme', httpOptions) as Observable<Theme[]>;
    }

    getById(themeId: string): Observable<Theme> {
        const httpOptions = this.authService.formHeaders();
        return this.httpClient.get<Theme>(environment.BASE_API_URL + `theme/${themeId}`, httpOptions) as Observable<Theme>;
    } 
}
import { Injectable } from "@angular/core";
import { Community } from "libs/data/src/entities/community";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../environments/environment";
import { Observable } from "rxjs";
import { AuthService } from '../../../../apps/gessit-app/src/app/auth/auth.service'

@Injectable({providedIn: 'root',})
export class CommunitiesService {
    private community? : Community;

    constructor(private httpClient: HttpClient, private authService: AuthService) {}

    getCommunities(endpoint: string): Observable<Community[]> {
        const httpOptions = this.authService.formHeaders();
        return this.httpClient.get<Community[]>(environment.BASE_API_URL + endpoint, httpOptions) as Observable<Community[]>;
    }

    getById(communityId: string): Observable<Community> {
        return this.httpClient.get<Community>(environment.BASE_API_URL + `community/${communityId}`) as Observable<Community>;
    }

    create(community: Community) {
        this.community = new Community();

        this.community.name = community.name;
        this.community.description = community.description;
        this.community.image = community.image;

        if (community.isOpen == undefined) {
            this.community.isOpen = false;
        } else {
            this.community.isOpen = community.isOpen;
        }

        this.httpClient.post<Community>(environment.BASE_API_URL + 'community', this.community).subscribe();
    }
    
    update(community: Community) {
        this.community = new Community();

        this.community._id = community._id;
        this.community.name = community.name;
        this.community.description = community.description;
        this.community.image = community.image;
        this.community.isOpen = community.isOpen;

        this.httpClient.patch<Community>(environment.BASE_API_URL + `community/${community._id}`, this.community).subscribe();
    }

    delete(communityId: string) {
        this.httpClient.delete<Community>(environment.BASE_API_URL + `community/${communityId}`).subscribe();
    }
}
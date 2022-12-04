import { Injectable } from "@angular/core";
import { Community } from "libs/data/src/entities/community";
import { HttpClient } from '@angular/common/http';
import { environment } from "../environments/environment";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root',})
export class CommunitiesImService {
    private community? : Community;

    constructor(private httpClient: HttpClient) {}

    getAll(): Observable<Community[]> {
        return this.httpClient.get<Community[]>(environment.BASE_API_URL + 'community') as Observable<Community[]>;
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
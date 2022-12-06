import { Injectable } from "@angular/core";
import { Community } from "libs/data/src/entities/community";
import { HttpClient } from '@angular/common/http';
import { environment } from "../environments/environment";
import { catchError, map, Observable, of } from "rxjs";
import { AuthService } from '../../../../apps/gessit-app/src/app/auth/auth.service'
import { AlertService } from "apps/gessit-app/src/app/shared/alert/alert.service";

@Injectable({providedIn: 'root',})
export class CommunitiesService {
    private community? : Community;

    constructor(private httpClient: HttpClient, private authService: AuthService, private alertService: AlertService) {}

    getCommunities(endpoint: string): Observable<Community[]> {
        const httpOptions = this.authService.formHeaders();
        return this.httpClient.get<Community[]>(environment.BASE_API_URL + endpoint, httpOptions) as Observable<Community[]>;
    }

    getById(communityId: string): Observable<Community> {
        const httpOptions = this.authService.formHeaders();
        return this.httpClient.get<Community>(environment.BASE_API_URL + `community/${communityId}`, httpOptions) as Observable<Community>;
    }

    create(communityData: object): Observable<Community | undefined> {
        console.log('creating community at' + environment.BASE_API_URL + 'community');
        console.log(communityData);
  
        return this.httpClient
            .post<Community>(
                environment.BASE_API_URL + 'community', 
                communityData,
                this.authService.formHeaders()
            )
            .pipe(
                map((community) => {
                    console.dir(community);
                    this.alertService.success('Community has been created');
                    return community;
                }),
                catchError((error: any) => {
                    console.log('error:', error);
                    console.log('error.message:', error.message);
                    console.log('error.error.message:', error.error.message);
                    this.alertService.error(error.error.message || error.message);
                    return of(undefined); 
                })
            );
    }
    
    update(communityData: object, communityId : string): Observable<Community | undefined> {
        console.log(`updating community at ${environment.BASE_API_URL}community/${communityId}`);
      
        return this.httpClient
          .patch<Community>(`${environment.BASE_API_URL}community/${communityId}`, communityData,
            this.authService.formHeaders()
          )
          .pipe(
            map((community) => {
              console.dir(community);
              this.alertService.success('Community has been updated');
              return community;
            }),
            catchError((error: any) => {
              console.log('error:', error);
              console.log('error.message:', error.message);
              console.log('error.error.message:', error.error.message);
              this.alertService.error(error.error.message || error.message);
              return of(undefined); 
            })
        );
    }

    delete(communityId: string) {
        this.httpClient.delete<Community>(environment.BASE_API_URL + `community/${communityId}`).subscribe();
    }
}
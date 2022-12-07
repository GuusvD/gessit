import { Injectable } from "@angular/core";
import { Community } from "libs/data/src/entities/community";
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../apps/gessit-app/src/environments/environment.prod";

import { catchError, map, Observable, of } from "rxjs";
import { AuthService } from '../../../../apps/gessit-app/src/app/auth/auth.service'
import { AlertService } from "apps/gessit-app/src/app/shared/alert/alert.service";

@Injectable({providedIn: 'root',})
export class CommunitiesService {
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

    delete(communityId : string): Observable<Community | undefined> {
        console.log(`deleting community at ${environment.BASE_API_URL}community/${communityId}`);
      
        return this.httpClient
          .delete<Community>(`${environment.BASE_API_URL}community/${communityId}`, this.authService.formHeaders())
          .pipe(
            map((community) => {
              console.dir(community);
              this.alertService.error('Community has been deleted');
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

    join(communityId: string): Observable<Community | undefined> {
        console.log(`Join request to: ${environment.BASE_API_URL}community/${communityId}/join`);

        return this.httpClient
            .post<Community>(
                environment.BASE_API_URL + 'community/' + communityId + '/join', 
                { null: null },
                this.authService.formHeaders()
            )
            .pipe(
                map((community) => {
                    console.dir(community);
                    this.alertService.success('Community has been joined');
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

    leave(communityId: string): Observable<Community | undefined> {
        console.log(`Leave request to: ${environment.BASE_API_URL}community/${communityId}/leave`);

        return this.httpClient
            .post<Community>(
                `${environment.BASE_API_URL}community/${communityId}/leave`,
                { null: null },
                this.authService.formHeaders()
            )
            .pipe(
                map((community) => {
                    console.dir(community);
                    this.alertService.success('Community has been leaved');
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
}

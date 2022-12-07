import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertService } from '../../../../apps/gessit-app/src/app/shared/alert/alert.service';
import { catchError, map, Observable, of } from "rxjs";
import { AuthService } from "../../../../apps/gessit-app/src/app/auth/auth.service";
import { Thread } from "../entities/thread";
import { environment } from "../environments/environment";

@Injectable({providedIn: 'root',})
export class ThreadsService {

    constructor(private http : HttpClient,
      private alertService : AlertService,
      private authService : AuthService) {}
  
    getList(communityId : string): Observable<Thread[]> {
      return this.http.get(environment.BASE_API_URL + 'community/' + communityId + '/thread') as Observable<Thread[]>;
    }

    getById(communityId :string, threadId: string): Observable<Thread> {
      return this.http.get(`${environment.BASE_API_URL}community/${communityId}/thread/${threadId}`) as Observable<Thread>;
    }

    create(threadData: Thread, communityId : string): Observable<Thread | undefined> {
      console.log(`creating thread at ${environment.BASE_API_URL}community/${communityId}/thread`);
  
      return this.http
        .post<Thread>(`${environment.BASE_API_URL}community/${communityId}/thread`, threadData,
          this.authService.formHeaders())
        .pipe(
          map((thread) => {
            console.dir(thread);
            this.alertService.success('Thread has been created');
            return thread;
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

    update(threadData: Thread, communityId : string, threadId : string): Observable<Thread | undefined> {
      console.log(`updating thread at ${environment.BASE_API_URL}community/${communityId}/thread/${threadId}`);
        console.log(threadData)
      return this.http
        .patch<Thread>(`${environment.BASE_API_URL}community/${communityId}/thread/${threadId}`, threadData,
          this.authService.formHeaders())
        .pipe(
          map((thread) => {
            console.dir(thread);
            this.alertService.success('Thread has been updated');
            return thread;
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

    delete(communityId : string, threadId : string): Observable<Thread | undefined> {
      console.log(`deleting thread at ${environment.BASE_API_URL}community/${communityId}/thread/${threadId}`);

      return this.http
        .delete<Thread>(`${environment.BASE_API_URL}community/${communityId}/thread/${threadId}`, this.authService.formHeaders())
        .pipe(
          map((community) => {
            console.dir(community);
            this.alertService.error('Thread has been deleted');
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

    view(communityId: string, threadId: string): Observable<Thread | undefined> {
        return this.http
        .post<Thread>(`${environment.BASE_API_URL}community/${communityId}/thread/${threadId}/view`, 
        { null: null },
        this.authService.formHeaders())
        .pipe(
          map((thread) => {
            console.dir(thread);
            return thread;
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
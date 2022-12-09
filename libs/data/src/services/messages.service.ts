import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "apps/gessit-app/src/app/auth/auth.service";
import { AlertService } from "apps/gessit-app/src/app/shared/alert/alert.service";
import { environment } from "apps/gessit-app/src/environments/environment";
import { catchError, map, Observable, of } from "rxjs";
import { Message } from "./../entities/message";

@Injectable({ providedIn: 'root', })
export class MessagesService {

    constructor(private http: HttpClient,
        private alertService: AlertService,
        private authService: AuthService) { }

    async getList(communityId: string, threadId: string): Promise<any[]> {
        const returnArray: any[] = [];
        let messagesAny: any[] = [];

        const messages = await this.http.get<Message[]>(`${environment.BASE_API_URL}community/${communityId}/thread/${threadId}/message`).toPromise()
        if (messages) {
            messages.sort((a, b) => {
                return new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime();
            });
            messagesAny = messages as any[]
        }
        const users = await this.http.get(`${environment.BASE_API_URL}user`).toPromise()
        const usersAny = users as any[]

        for await (const message of messagesAny) {
            for await (const user of usersAny) {
                if (message.creator.toString() === user._id.toString()) {
                    delete message.creator
                    message.creator = user
                    returnArray.push(message)
                }
            }
        }

        return returnArray
    }

    getById(communityId: string, threadId: string, messageId: string): Observable<Message> {
        return this.http.get(`${environment.BASE_API_URL}/community/${communityId}/thread/${threadId}/message/${messageId}`) as Observable<Message>;
    }

    create(messageData: Message, communityId: string, threadId: string): Observable<Message | undefined> {
        console.log(`creating message at ${environment.BASE_API_URL}community/${communityId}/thread/${threadId}/message`);

        return this.http
            .post<Message>(`${environment.BASE_API_URL}community/${communityId}/thread/${threadId}/message`, messageData,
                this.authService.formHeaders())
            .pipe(
                map((message) => {
                    console.dir(message);
                    this.alertService.success('Message has been created');
                    return message;
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

    update(messageData: Message, communityId: string, threadId: string, messageId: string): Observable<Message | undefined> {
        console.log(`updating message at ${environment.BASE_API_URL}community/${communityId}/thread/${threadId}/message/${messageId}`);

        return this.http
            .patch<Message>(`${environment.BASE_API_URL}community/${communityId}/thread/${threadId}/message/${messageId}`, messageData,
                this.authService.formHeaders())
            .pipe(
                map((message) => {
                    console.dir(message);
                    this.alertService.success('Message has been updated');
                    return message;
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

    delete(communityId: string, threadId: string, messageId: string): Observable<Message | undefined> {
        console.log(`deleting messsage at ${environment.BASE_API_URL}community/${communityId}/thread/${threadId}/message/${messageId}`);

        return this.http
            .delete<Message>(`${environment.BASE_API_URL}community/${communityId}/thread/${threadId}/message/${messageId}`, this.authService.formHeaders())
            .pipe(
                map((message) => {
                    console.dir(message);
                    this.alertService.error('Message has been deleted');
                    return message;
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


    like(communityId: string, threadId: string, messageId: string): Observable<Message | undefined> {
        console.log(`liking/unliking messsage at ${environment.BASE_API_URL}community/${communityId}/thread/${threadId}/message/${messageId}/like`);

        return this.http
            .post<Message>(`${environment.BASE_API_URL}community/${communityId}/thread/${threadId}/message/${messageId}/like`, {}, this.authService.formHeaders())
            .pipe(
                map((message) => {
                    console.dir(message);
                    this.alertService.success('Liked/unliked message');
                    return message;
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

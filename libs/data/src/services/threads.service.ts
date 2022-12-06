import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Thread } from "../entities/thread";
import { environment } from "../environments/environment";

@Injectable({providedIn: 'root',})
export class ThreadsService {
    private thread?: Thread;
    private threads: Thread[] | undefined;

    constructor(private httpClient: HttpClient) {}

    getAll(): Observable<Thread[]> {
        return this.httpClient.get<Thread[]>(environment.BASE_API_URL + 'thread') as Observable<Thread[]>;
    }

    getAllByCommunity(communityId: string): Thread[] {
        this.getAll().subscribe((t) => (this.threads = t)).unsubscribe;
        return this.threads!.filter(thread => thread.communityId === communityId);
    }

    getById(threadId: string): Observable<Thread> {
        return this.httpClient.get<Thread>(environment.BASE_API_URL + `thread/${threadId}`) as Observable<Thread>;
    }

    create(thread: Thread) {
        this.thread = new Thread();

        this.thread = { ...thread }

        this.httpClient.post<Thread>(environment.BASE_API_URL + 'thread', this.thread).subscribe();
    }

    update(thread: Thread) {
        this.thread = new Thread();

        this.thread = { ...thread };

        this.httpClient.patch<Thread>(environment.BASE_API_URL + `thread/${thread._id}`, this.thread).subscribe();
    }

    delete(threadId: string) {
        this.httpClient.delete<Thread>(environment.BASE_API_URL + `thread/${threadId}`).subscribe();
    }

    increaseViews(threadId: string) {
        this.getById(threadId).subscribe((t) => (this.thread = t)).unsubscribe;

        this.thread!.views++;

        this.update(this.thread!);
    }
}
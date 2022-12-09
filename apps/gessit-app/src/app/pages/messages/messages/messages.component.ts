import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'libs/data/src/entities/user';
import { Observable } from 'rxjs';
import { MessagesService } from '../../../../../../../libs/data/src/services/messages.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
    selector: 'gessit-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
    messages: any[] | undefined;
    communityId: string | undefined;
    threadId: string | undefined;
    likes = 0;
    loggedInUser$!: Observable<User | undefined>;

    constructor(private messagesService: MessagesService,
        private route: ActivatedRoute,
        private router: Router,
        public authService: AuthService
    ) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.communityId = params.get('c-id') as string;
        });

        this.route.paramMap.subscribe(params => {
            this.threadId = params.get('id') as string;
        });

        this.loggedInUser$ = this.authService.currentUser$;

        (async () => {
            this.messages = await this.messagesService.getList(this.communityId as string, this.threadId as string);
            console.log(this.messages)
        })();
    }

    convertDate(date: Date) {
        return new Date(date).toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' });
    }

    edit(messageId: string): void {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(['/communities', this.communityId, 'threads', this.threadId, 'messages', messageId, 'edit']));
    }

    delete(messageId: string): void {
        console.log("delete message: " + messageId)

        this.messagesService.delete(this.communityId as string, this.threadId as string, messageId).subscribe((message) => {
            if (message) {
                this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
                    this.router.navigate(['/communities', this.communityId, 'threads', this.threadId]));
            }
        });
    }

    like(messageId: string) {
        this.messagesService.like(this.communityId as string, this.threadId as string, messageId).subscribe((message) => {
            if (message) {
                this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
                    this.router.navigate(['/communities', this.communityId, 'threads', this.threadId]));
            }
        });
    }
}
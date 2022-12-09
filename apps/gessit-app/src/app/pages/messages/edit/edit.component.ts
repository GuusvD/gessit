import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MessagesService } from "libs/data/src/services/messages.service";
import { ThreadsService } from "libs/data/src/services/threads.service";
import { Subscription } from "rxjs";
import { AuthService } from "../../../auth/auth.service";

@Component({
    selector: 'gessit-edit-message',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css'],
})

export class EditComponent implements OnInit, OnDestroy {
    title: string | undefined;
    createMessage: boolean | undefined
    threadId: string | undefined
    communityId: string | undefined
    messageId: string | undefined
    subs?: Subscription;
    messageForm: FormGroup = new FormGroup({});
    partOfCommunity = false;
    threadCreatorId: string | undefined;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private messageService: MessagesService,
        public authService: AuthService,
        private threadService: ThreadsService) { }

    ngOnInit(): void {
        this.title = this.route.snapshot.data['title'] || undefined;
        this.createMessage = this.route.snapshot.data['createMessage'];

        this.subs = this.route.paramMap.subscribe(async (params) => {
            this.communityId = params.get('c-id')?.toString()
            this.threadId = params.get('id')?.toString()
            this.partOfCommunity = await this.isPartOfCommunity()

            this.threadService.getById(this.communityId as string, this.threadId as string).subscribe((thread) => {
                this.threadCreatorId = (thread as any).creator.at(0)._id.toString() as string;
            });
        });

        this.messageForm = new FormGroup({
            content: new FormControl(null, [Validators.required, this.validContent.bind(this)]),
        });

        if (!this.createMessage) {
            (document.getElementById('navbarNavDropdown') as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });

            this.subs = this.route.paramMap.subscribe((params) => {
                this.messageId = params.get('m-id')?.toString()
            });

            this.subs = this.messageService.getById(this.communityId as string, this.threadId as string, this.messageId as string).subscribe((message) => {
                this.messageForm.patchValue({ content: message.content });
            });
        }
    }

    ngOnDestroy(): void {
        if (this.subs) {
            this.subs.unsubscribe();
        }
    }

    onSubmit() {
        if (this.messageForm.valid) {
            if (!this.createMessage) {
                this.messageService.update(this.messageForm.value, this.communityId as string, this.threadId as string, this.messageId as string).subscribe((message) => {
                    if (message) {
                        this.router.navigate(['/communities', this.communityId, 'threads', this.threadId]);
                    }
                });
            } else {
                this.messageService.create(this.messageForm.value, this.communityId as string, this.threadId as string).subscribe((message) => {
                    if (message) {
                        this.router.navigateByUrl('/reload').then(() => this.router.navigate(['/communities', this.communityId, 'threads', this.threadId]))
                    }
                });
            }
        }
    }

    async isPartOfCommunity(): Promise<boolean> {
        return this.partOfCommunity = await this.authService.partOfCommunity(this.communityId as string);
    }

    validContent(control: FormControl): { [s: string]: boolean } {
        const content = control.value;
        const regexp = new RegExp(
            '.{1,}'
        );

        if (regexp.test(content) !== true) {
            return { content: false };
        } else {
            return null!;
        }
    }
}

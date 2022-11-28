import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Thread } from 'libs/data/src/entities/thread';
import { ThreadsImService } from 'libs/data/src/services/threads.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'gessit-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  pageTitle: string | undefined;
  createThread: boolean | undefined;
  newThread = new Thread();
  subscription: Subscription | undefined;
  communityId: string | null = null;
  threadId: string | null = null;
  thread: Thread | undefined;

  constructor(private route: ActivatedRoute, private threadsImService: ThreadsImService, private router: Router) {}

  ngOnInit(): void {
    this.pageTitle = this.route.snapshot.data['title'] || undefined;
    this.createThread = this.route.snapshot.data['createThread'] || false;

    this.subscription = this.route.paramMap.subscribe(params => {
      this.communityId = params.get('c-id');

      if (!this.createThread) {
        this.threadId = params.get('id');
        if (this.threadId) {
          this.threadsImService.getById(this.threadId).subscribe((t) => (this.thread = t)).unsubscribe;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe;
  }

  create() {
    if (this.communityId) {
      this.newThread.communityId = this.communityId;
    }

    this.threadsImService.create(this.newThread);
    this.router.navigate([`/communities/${this.communityId}`]);
  }

  update() {
    this.threadsImService.update(this.thread!);
    this.router.navigate([`/communities/${this.communityId}/threads/${this.threadId}`]);
  }
}

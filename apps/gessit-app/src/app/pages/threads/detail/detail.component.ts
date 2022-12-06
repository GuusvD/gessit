import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Thread } from 'libs/data/src/entities/thread';
import { ThreadsService } from 'libs/data/src/services/threads.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'gessit-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  threadId: string | null = null;
  communityId: string | null = null;
  subscription: Subscription | undefined;
  thread: Thread | undefined;

  constructor(private route: ActivatedRoute, private threadsService: ThreadsService, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe(params => {
      this.threadId = params.get('id');
      this.communityId = params.get('c-id');
      if (this.threadId) {
        this.threadsService.getById(this.threadId).subscribe((t) => (this.thread = t)).unsubscribe;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe;
  }

  delete(id: string | undefined): void {
    if (id) {
      this.threadsService.delete(id);
      this.router.navigate([`/communities/${this.communityId}`]);
    }
  }
}

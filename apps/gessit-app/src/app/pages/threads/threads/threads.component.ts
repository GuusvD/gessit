import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Thread } from 'libs/data/src/entities/thread';
import { Subscription } from 'rxjs';
import { ThreadsImService } from '../../../../../../../libs/data/src/services/threads.service';

@Component({
  selector: 'gessit-threads',
  templateUrl: './threads.component.html',
  styleUrls: ['./threads.component.css'],
})
export class ThreadsComponent implements OnInit {
  threads: Thread[] | undefined;
  communityId: string | null = null;
  subscription: Subscription | undefined;

  constructor(private threadsImService: ThreadsImService, private route: ActivatedRoute) {}

  fetch() {
    if (this.communityId) {
      this.threads = this.threadsImService.getAllByCommunity(this.communityId);
    }
  }

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe(params => {
      this.communityId = params.get('id');
    });

    this.fetch();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe;
  }

  delete(id: string | undefined): void {
    if (id) {
      this.threadsImService.delete(id);
      this.fetch();
    }
  }
}

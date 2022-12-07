import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Thread } from 'libs/data/src/entities/thread';
import { Subscription } from 'rxjs';
import { ThreadsService } from '../../../../../../../libs/data/src/services/threads.service';

@Component({
  selector: 'gessit-threads',
  templateUrl: './threads.component.html',
  styleUrls: ['./threads.component.css'],
})
export class ThreadsComponent implements OnInit {
  threads: Thread[] | undefined;
  communityId: string | null = null;
  subscription: Subscription | undefined;

  constructor(private threadsService: ThreadsService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe(params => {
      this.communityId = params.get('id');
    });

    if (this.communityId) {
      this.threadsService.getList(this.communityId).subscribe((p) => {
        this.threads = p;
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe;
  }

  delete(id: string): void {
    if (id) {
      this.threadsService.delete(this.communityId?.toString()!, id.toString()!);
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([`/communities/${this.communityId}`]);
    }
  }

  // increaseViews(id: string): void {
  //   this.threadsService.increaseViews(id);
  // }
}

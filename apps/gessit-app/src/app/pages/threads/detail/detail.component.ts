import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThreadsService } from 'libs/data/src/services/threads.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'gessit-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  threadId: string | null = null;
  communityId: string | null = null;
  subscription: Subscription | undefined;
  thread: any;
  creatorId: string = '';

  constructor(private route: ActivatedRoute, private threadsService: ThreadsService, private router: Router, public authService: AuthService) {}

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe(async params => {
      this.threadId = params.get('id');
      this.communityId = params.get('c-id');

      await this.init();
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe;
  }

  delete(id: string | undefined): void {
    if (id) {
      this.threadsService.delete(this.communityId?.toString()!, this.thread?._id.toString()!).subscribe((p) => {
        if (p) {
          this.router.navigate([`/communities/${this.communityId}`]);
        }
      });
    }
  }

  async init() {
    if (this.threadId) {
      this.thread = await this.threadsService.getById(this.communityId!.toString(), this.threadId?.toString()!).toPromise();
      this.creatorId = this.thread.creator[0]._id;
    }
  }
}

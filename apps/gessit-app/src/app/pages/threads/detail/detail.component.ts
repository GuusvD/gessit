import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'libs/data/src/entities/user';
import { ThreadsService } from 'libs/data/src/services/threads.service';
import { Types } from 'mongoose';
import { Observable, Subscription } from 'rxjs';
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
  liked: boolean = false;
  loggedInUser$!: Observable<User | undefined>;

  constructor(private route: ActivatedRoute, private threadsService: ThreadsService, private router: Router, public authService: AuthService) {}

  ngOnInit(): void {
    this.loggedInUser$ = this.authService.currentUser$;

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

      let likes = this.thread.likes as Types.ObjectId[];

      if (this.loggedInUser$) {
        this.loggedInUser$.subscribe((p) => {
          if (likes.filter(l => l.toString() === p?._id.toString()).length > 0) {
            this.liked = true;
          } else {
            this.liked = false;
          }
        })
      }
    }
  }

  like() {
    this.threadsService.like(this.communityId!, this.threadId!).subscribe((p) => {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/communities/' + this.communityId + '/threads/' + this.threadId]));
    });
  }
}

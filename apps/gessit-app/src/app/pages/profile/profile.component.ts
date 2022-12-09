import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'libs/data/src/entities/user';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'gessit-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: any;
  loggedInUser$!: Observable<User | undefined>;
  subscription: Subscription | undefined;
  userId: string | null = null;
  users: User[] = [];
  following: boolean = false;
  loggedInProfile: boolean = false;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.loggedInUser$ = this.authService.currentUser$;

    this.subscription = this.authService.getUsers().subscribe((p) => {
      this.users = p;
    
      this.route.paramMap.subscribe(async params => {
        this.userId = params.get('id');
        if (this.userId) {
          if (this.users.filter(p => p._id.toString() === this.userId?.toString()).length > 0) {
            this.user = await this.authService.getById(this.userId).toPromise();

            if (this.loggedInUser$) {
              this.loggedInUser$.subscribe(async (p) => {
                if (p?._id.toString() === this.userId?.toString()) {
                  this.loggedInProfile = true;
                } else {
                  this.loggedInProfile = false;
                  await this.isFollowing();
                }
              })
            }
          } else {
            this.router.navigate(['/homepage']);
          }
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  updateImgUrl() {
    this.user!.image = 'https://cdn-icons-png.flaticon.com/512/33/33308.png';
  }

  follow() {
    this.authService.follow(this.userId!).subscribe((p) => {
      if (p) {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/profile/' + this.userId]));
      }
    });
  }

  unFollow() {
    this.authService.unfollow(this.userId!).subscribe((p) => {
      if (p) {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/profile/' + this.userId]));
      }
    });
  }

  async isFollowing() {
    this.following = await this.authService.following(this.userId!);
  }
}

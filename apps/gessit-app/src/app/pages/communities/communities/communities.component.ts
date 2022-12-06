import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Community } from 'libs/data/src/entities/community';
import { User } from 'libs/data/src/entities/user';
import { Observable, Subscription } from 'rxjs';
import { CommunitiesService } from '../../../../../../../libs/data/src/services/communities.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'gessit-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.css'],
})
export class CommunitiesComponent implements OnInit, OnDestroy {
  type: string | undefined;
  communities: Community[] | undefined;
  sub: Subscription | undefined;
  loggedInUser$!: Observable<User | undefined>;
  title: string | undefined;

  constructor(private communitiesService: CommunitiesService, private router: Router, private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    this.loggedInUser$ = this.authService.currentUser$;

    this.type = this.route.snapshot.data['type'] || undefined;
    this.title = this.route.snapshot.data['title'] || undefined;

    if (this.type === 'all') {
      this.sub = this.communitiesService.getCommunities("community").subscribe((c) => (this.communities = c));
    } else if (this.type === 'created') {
      this.sub = this.communitiesService.getCommunities("community/created").subscribe((c) => (this.communities = c));
    } else if (this.type === 'joined') {
      this.sub = this.communitiesService.getCommunities("community/joined").subscribe((c) => (this.communities = c));
    }
  }

  delete(id: string | undefined): void {
    if (id) {
      this.communitiesService.delete(id);
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/communities']);
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Community } from 'libs/data/src/entities/community';
import { Subscription } from 'rxjs';
import { CommunitiesService } from '../../../../../../../libs/data/src/services/communities.service';

@Component({
  selector: 'gessit-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.css'],
})
export class CommunitiesComponent implements OnInit, OnDestroy {
  type: string | undefined;
  communities: Community[] | undefined;
  sub: Subscription | undefined;

  constructor(private communitiesService: CommunitiesService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.type = this.route.snapshot.data['type'] || undefined;

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

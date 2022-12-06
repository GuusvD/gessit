import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Community } from 'libs/data/src/entities/community';
import { Observable, Subscription } from 'rxjs';
import { CommunitiesService } from '../../../../../../../libs/data/src/services/communities.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'gessit-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  communityId: string | null = null;
  subscription: Subscription | undefined;
  community: Community = new Community();
  themesString: string | undefined;

  constructor(private route: ActivatedRoute, private communitiesService: CommunitiesService, private router: Router, public authService: AuthService) {}

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe(params => {
      this.communityId = params.get('id');
      if (this.communityId) {
        this.communitiesService.getById(this.communityId).subscribe((c) => (this.community = c, this.themesString = c.themes.map((theme) => theme.name).join(', '))).unsubscribe;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe;
  }

  delete() : void {
    if(this.communityId) {
      this.communitiesService.delete(this.communityId).subscribe((community) => {
        if (community) {
          this.router.navigate(['/communities']);
        }
      });
    }
  }

  join() {

  }
}

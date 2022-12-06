import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Community } from 'libs/data/src/entities/community';
import { Subscription } from 'rxjs';
import { CommunitiesService } from '../../../../../../../libs/data/src/services/communities.service';

@Component({
  selector: 'gessit-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  communityId: string | null = null;
  subscription: Subscription | undefined;
  community: Community | undefined;

  constructor(private route: ActivatedRoute, private communitiesService: CommunitiesService, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe(params => {
      this.communityId = params.get('id');
      if (this.communityId) {
        this.communitiesService.getById(this.communityId).subscribe((c) => (this.community = c)).unsubscribe;
      }

      
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe;
  }

  delete(id: string | undefined): void {
    if (id) {
      this.communitiesService.delete(id);
      this.router.navigate(['/communities']);
    } 
  }

  join() {

  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Community } from 'libs/data/src';
import { Observable, Subscription } from 'rxjs';
import { CommunitiesImService } from '../../services/communities.service';

@Component({
  selector: 'gessit-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  communityId: string | null = null;
  subscription: Subscription | undefined;
  community$: Observable<Community> | undefined;

  constructor(private route: ActivatedRoute, private communityImService: CommunitiesImService) {}

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe(params => {
      this.communityId = params.get('id');
      if (this.communityId) {
        this.community$ = this.communityImService.getById(this.communityId);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe;
  }
}

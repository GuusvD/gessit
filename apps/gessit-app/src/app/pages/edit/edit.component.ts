import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Community } from '@gessit/data';
import { Observable, Subscription, tap } from 'rxjs';
import { CommunitiesImService } from '../../services/communities.service';

@Component({
  selector: 'gessit-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  title: string | undefined;
  createCommunity: boolean | undefined;
  community = new Community(undefined, undefined, undefined, undefined, undefined, undefined);
  subscription: Subscription | undefined;
  communityId: string | null = null;
  community$: Observable<Community> | undefined;

  constructor(private route: ActivatedRoute, private communitiesImService: CommunitiesImService, private router: Router) {}

  ngOnInit(): void {
    this.title = this.route.snapshot.data['title'] || undefined
    this.createCommunity = this.route.snapshot.data['createCommunity'] || false

    if (!this.createCommunity) {
      this.subscription = this.route.paramMap.subscribe(params => {
        this.communityId = params.get('id');
        if (this.communityId) {
          this.community$ = this.communitiesImService.getById(this.communityId);
        }
      });
    }
  }

  create() {
    this.communitiesImService.create(this.community);
    this.router.navigate(['/communities']);
  }

  update() {
    this.communitiesImService.update(this.community);
    this.router.navigate(['/communities']);
  }
}

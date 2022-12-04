import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Community } from 'libs/data/src/entities/community';
import { CommunitiesImService } from '../../../../../../../libs/data/src/services/communities.service';

@Component({
  selector: 'gessit-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.css'],
})
export class CommunitiesComponent implements OnInit {
  communities: Community[] | undefined;

  constructor(private communitiesImService: CommunitiesImService, private router: Router) {}

  ngOnInit(): void {
    this.communitiesImService.getAll().subscribe((c) => (this.communities = c)).unsubscribe;
  }

  delete(id: string | undefined): void {
    if (id) {
      this.communitiesImService.delete(id);
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/communities']);
    }
  }
}

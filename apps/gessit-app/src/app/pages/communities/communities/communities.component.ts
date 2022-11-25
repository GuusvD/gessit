import { Component, OnInit } from '@angular/core';
import { Community } from 'libs/data/src/entities/community';
import { CommunitiesImService } from '../../../../../../../libs/data/src/services/communities.service';

@Component({
  selector: 'gessit-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.css'],
})
export class CommunitiesComponent implements OnInit {
  communities: Community[] | undefined;

  constructor(private communitiesImService: CommunitiesImService) {
    this.fetch();
  }

  fetch() {
    this.communities = this.communitiesImService.getAll();
  }

  ngOnInit(): void {

  }

  delete(id: string | undefined): void {
    if (id) {
      this.communitiesImService.delete(id);
      this.fetch();
    }
  }
}

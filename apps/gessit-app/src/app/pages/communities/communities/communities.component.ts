import { Component, OnInit } from '@angular/core';
import { Community } from 'libs/data/src/entities/community';
import { Observable } from 'rxjs';
import { CommunitiesImService } from '../../../../../../../libs/data/src/services/communities.service';

@Component({
  selector: 'gessit-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.css'],
})
export class CommunitiesComponent implements OnInit {
  communities$: Observable<Community[]> | undefined;

  constructor(private communityImService: CommunitiesImService) {
    this.fetch();
  }

  fetch() {
    this.communities$ = this.communityImService.getAll();
  }

  ngOnInit(): void {

  }

  delete(id: string | undefined): void {
    if (id) {
      this.communityImService.delete(id);
      this.fetch();
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Community } from 'libs/data/src';
import { Observable } from 'rxjs';
import { CommunitiesImService } from '../../services/communities.service';

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

  delete(id: string): void {
    this.communityImService.delete(id);
    this.fetch();
  }
}

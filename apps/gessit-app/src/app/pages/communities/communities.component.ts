import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Community } from 'libs/data/src';

@Component({
  selector: 'gessit-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.css'],
})
export class CommunitiesComponent implements OnInit {
  communities: Community[] = [];

  constructor(private http: HttpClient) {
    this.fetch();
  }

  fetch() {
    this.http.get<Community[]>('/api/community').subscribe((c) => (this.communities = c));
  }

  ngOnInit(): void {

  }
}

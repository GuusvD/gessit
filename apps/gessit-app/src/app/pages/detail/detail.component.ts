import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Community } from 'libs/data/src';
import { Subscription } from 'rxjs';

@Component({
  selector: 'gessit-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  communityId: string | null = null;
  subscription: Subscription | undefined;
  community: Community | undefined;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe(params => {
      this.communityId = params.get('id');
      this.http.get<Community>(`/api/community/${this.communityId}`).subscribe((c) => (this.community = c));
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe;
  }
}

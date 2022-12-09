import { Component, OnInit } from '@angular/core';
import { User } from 'libs/data/src/entities/user';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'gessit-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  loggedInUser$!: Observable<User | undefined>;

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.loggedInUser$ = this.authService.currentUser$;
  }
  
  logout(): void {
    this.authService.logout();
  }
}

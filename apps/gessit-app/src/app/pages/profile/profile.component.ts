import { Component, OnInit } from '@angular/core';
import { User } from 'libs/data/src/entities/user';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'gessit-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User | undefined;
  loggedInUser$!: Observable<User | undefined>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loggedInUser$ = this.authService.currentUser$;
    this.loggedInUser$.subscribe((p) => {
      this.authService.getById(p?._id.toString()!).subscribe((p) => {
        this.user = p;
      });
    });
  }

  updateImgUrl() {
    this.user!.image = 'https://cdn-icons-png.flaticon.com/512/33/33308.png';
  }
}

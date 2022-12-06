import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from 'libs/data/src/entities/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  subs!: Subscription;
  submitted = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        this.validUsername.bind(this),
      ]),
      password: new FormControl(null, [
        Validators.required,
        this.validPassword.bind(this),
      ]),
    });

    this.subs = this.authService
      .getUserFromLocalStorage()
      .subscribe((user: User) => {
        if (user) {
          console.log('User already logged in > to dashboard');
          this.router.navigate(['/']);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.submitted = true;
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
      
      this.authService
        .login(username, password)
        // .pipe(delay(1000))
        .subscribe((user) => {
          if (user) {
            console.log('Logged in');
            this.router.navigate(['/']);
          }
          this.submitted = false;
        });
    } else {
      this.submitted = false;
      console.error('loginForm invalid');
    }
  }

  validUsername(control: FormControl): { [s: string]: boolean } {
    const username = control.value;
    const regexp = new RegExp(
      '.{5,}'
    );

    if (regexp.test(username) !== true) {
      return { username: false };
    } else {
      return null!;
    }
  }

  validPassword(control: FormControl): { [s: string]: boolean } {
    const password = control.value;
    const regexp = new RegExp(
      '.{5,}'
    );

    if (regexp.test(password) !== true) {
      return { password: false };
    } else {
      return null!;
    }
  }
}

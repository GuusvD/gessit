import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;
  subs!: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [
        Validators.required,
        this.validUsername.bind(this),
      ]),
      password: new FormControl(null, [
        Validators.required,
        this.validPassword.bind(this),
      ]),
    });
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe((user) => {
        if (user) {
          console.log('user = ', user);
          this.router.navigate(['/']);
        }
      });
    } else {
      console.error('registerForm invalid');
    }
  }

  validUsername(control: FormControl): { [s: string]: boolean } {
    const username = control.value;
    const regexp = new RegExp(
      '.{4,}'
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
      '.{4,}'
    );

    if (regexp.test(password) !== true) {
      return { password: false };
    } else {
      return null!;
    }
  }
}

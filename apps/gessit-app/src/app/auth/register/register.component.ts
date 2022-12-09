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
      emailAddress: new FormControl(null, [
        Validators.required,
        this.validEmail.bind(this),
      ]),
      phoneNumber: new FormControl(null, [
        Validators.required,
        this.validPhoneNumber.bind(this),
      ]),
      image: new FormControl(null, [
        Validators.required,
        this.validImageUrl.bind(this),
      ]),
      birthDate: new FormControl(null, [
        Validators.required,
        this.validBirthDate.bind(this),
      ]),
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

  validEmail(control: FormControl): { [s: string]: boolean } {
    const email = control.value;
    const regexp = new RegExp('^[^@]+@[^@]+\.[^@]+$');
    if (regexp.test(email) !== true) {
      return { email: false };
    } else {
      return null!;
    }
  }

  validImageUrl(control: FormControl): { [s: string]: boolean } {
    const imageUrl = control.value;
    const regexp = new RegExp('^(https?:\\/\\/)?'+
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
    '((\\d{1,3}\\.){3}\\d{1,3}))'+
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
    '(\\#[-a-z\\d_]*)?$','i');
    if (regexp.test(imageUrl) !== true) {
      return { imageUrl: false };
    } else {
      return null!
    }
  }

  validBirthDate(control: FormControl): { [s: string]: boolean } {
    const birthDate = control.value;
    const dateString = birthDate?.year + '-' + birthDate?.month + '-' + birthDate?.day;

    if (new Date(dateString) > new Date()) {
      return { birthDate: false };
    } else {
      return null!;
    }
  }

  validPhoneNumber(control: FormControl): { [s: string]: boolean } {
    const phoneNumber = control.value;
    const regexp = new RegExp('.{10,}');
    if (regexp.test(phoneNumber) !== true) {
      return { phoneNumber: false };
    } else {
      return null!;
    }
  }
}

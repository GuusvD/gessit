import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { LoggedInAuthGuard } from './auth.guards';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuthService,
    LoggedInAuthGuard
  ]
})
export class AuthModule { }

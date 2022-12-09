import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from './alert.component';

@NgModule({
  declarations: [AlertComponent],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports: [
    AlertComponent
  ]
})
export class AlertModule { }

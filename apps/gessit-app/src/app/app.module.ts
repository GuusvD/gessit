import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { NavComponent } from './shared/nav/nav.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CommunitiesComponent } from './pages/communities/communities/communities.component';
import { AboutComponent } from './pages/about/about.component';
import * as CommunitiesDetailComponent from './pages/communities/detail/detail.component';
import * as ThreadsDetailComponent from './pages/threads/detail/detail.component';
import * as CommunitiesEditComponent from './pages/communities/edit/edit.component';
import * as ThreadsEditComponent from './pages/threads/edit/edit.component';
import { FormsModule } from '@angular/forms';
import { ThreadsComponent } from './pages/threads/threads/threads.component';

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    NavComponent,
    HomepageComponent,
    FooterComponent,
    CommunitiesComponent,
    AboutComponent,
    ThreadsComponent,
    CommunitiesDetailComponent.DetailComponent,
    ThreadsDetailComponent.DetailComponent,
    CommunitiesEditComponent.EditComponent,
    ThreadsEditComponent.EditComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    NgbModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

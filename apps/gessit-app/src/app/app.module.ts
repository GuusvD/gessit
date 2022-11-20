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
import { CommunitiesComponent } from './pages/communities/communities.component';
import { AboutComponent } from './pages/about/about.component';
import { DetailComponent } from './pages/detail/detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    NavComponent,
    HomepageComponent,
    FooterComponent,
    CommunitiesComponent,
    AboutComponent,
    DetailComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    NgbModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

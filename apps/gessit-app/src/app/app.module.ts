import { Injectable, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule, RouterStateSnapshot, TitleStrategy } from '@angular/router';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThreadsComponent } from './pages/threads/threads/threads.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AlertModule } from './shared/alert/alert.module';
import { AuthModule } from './auth/auth.module';
import { CommunitiesListComponent } from './pages/communities/communities-list/communities-list.component';

@Injectable({providedIn: 'root'})
export class TemplatePageTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(`Gessit | ${title}`);
    }
  }
}

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
    LoginComponent,
    RegisterComponent,
    CommunitiesDetailComponent.DetailComponent,
    ThreadsDetailComponent.DetailComponent,
    CommunitiesEditComponent.EditComponent,
    ThreadsEditComponent.EditComponent,
    CommunitiesListComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    AuthModule,
  ],
  providers: [{
    provide: TitleStrategy, 
    useClass: TemplatePageTitleStrategy
  }],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}

import { Route } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { CommunitiesComponent } from './pages/communities/communities/communities.component';
import * as CommunitiesDetailComponent from './pages/communities/detail/detail.component';
import * as ThreadsDetailComponent from './pages/threads/detail/detail.component';
import * as CommunitiesEditComponent from './pages/communities/edit/edit.component';
import * as ThreadsEditComponent from './pages/threads/edit/edit.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoggedInAuthGuard } from './auth/auth.guards';

export const appRoutes: Route[] = [
    { path: 'login', pathMatch: 'full', component: LoginComponent },
    { path: 'register', pathMatch: 'full', component: RegisterComponent },
    { path: 'homepage', pathMatch: 'full', component: HomepageComponent },
    { path: 'about', pathMatch: 'full', component: AboutComponent },
    { path: 'communities', pathMatch: 'full', component: CommunitiesComponent },
    { path: 'communities/create', pathMatch: 'full', canActivate: [LoggedInAuthGuard], component: CommunitiesEditComponent.EditComponent, data: { createCommunity: true, title: 'Create community' }},
    { path: 'communities/:id/edit', pathMatch: 'full', canActivate: [LoggedInAuthGuard], component: CommunitiesEditComponent.EditComponent, data: { createCommunity: false, title: 'Edit community' }},
    { path: 'communities/:id', pathMatch: 'full', component: CommunitiesDetailComponent.DetailComponent },
    { path: 'communities/:c-id/threads/create', pathMatch: 'full', canActivate: [LoggedInAuthGuard], component: ThreadsEditComponent.EditComponent, data: { createThread: true, title: 'Create thread' }},
    { path: 'communities/:c-id/threads/:id/edit', pathMatch: 'full', canActivate: [LoggedInAuthGuard], component: ThreadsEditComponent.EditComponent, data: { createThread: false, title: 'Edit thread' }},
    { path: 'communities/:c-id/threads/:id', pathMatch: 'full', component: ThreadsDetailComponent.DetailComponent },
    { path: '**', redirectTo: 'homepage' }
];

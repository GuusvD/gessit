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
import { CommunitiesListComponent } from './pages/communities/communities-list/communities-list.component';

export const appRoutes: Route[] = [
    //Auth
    { path: 'login', pathMatch: 'full', component: LoginComponent, title: 'Login' },
    { path: 'register', pathMatch: 'full', component: RegisterComponent, title: 'Register' },
    //Other
    { path: 'homepage', pathMatch: 'full', component: HomepageComponent, title: 'Homepage' },
    { path: 'about', pathMatch: 'full', component: AboutComponent, title: 'About' },
    //Communities
    { path: 'communities', component: CommunitiesListComponent, children: [
        { path: '', component: CommunitiesComponent, data: { type: 'all' }, title: 'Communities' },
        { path: 'created', component: CommunitiesComponent, data: { type: 'created' }, title: 'Created Communities' },
        { path: 'joined', component: CommunitiesComponent, data: { type: 'joined' }, title: 'Joined Communities' },
        { path: 'create', canActivate: [LoggedInAuthGuard], component: CommunitiesEditComponent.EditComponent, data: { createCommunity: true, title: 'Create community' }, title: 'Create Community'},  
        { path: ':id', component: CommunitiesDetailComponent.DetailComponent, title: 'Community Detail' },
        { path: ':id/edit', canActivate: [LoggedInAuthGuard], component: CommunitiesEditComponent.EditComponent , data: { createCommunity: false, title: 'Edit community' }, title: 'Edit Community'},
    ]},
    //Threads
    { path: 'communities/:c-id/threads/create', pathMatch: 'full', canActivate: [LoggedInAuthGuard], component: ThreadsEditComponent.EditComponent, data: { createThread: true, title: 'Create thread' }, title: 'Create Thread'},
    { path: 'communities/:c-id/threads/:id/edit', pathMatch: 'full', canActivate: [LoggedInAuthGuard], component: ThreadsEditComponent.EditComponent, data: { createThread: false, title: 'Edit thread' }, title: 'Edit Thread'},
    { path: 'communities/:c-id/threads/:id', pathMatch: 'full', component: ThreadsDetailComponent.DetailComponent, title: 'Thread Detail' },
    //Redirect
    { path: '**', redirectTo: 'homepage' }
];

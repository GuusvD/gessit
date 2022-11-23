import { Route } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { CommunitiesComponent } from './pages/communities/communities/communities.component';
import * as CommunitiesDetailComponent from './pages/communities/detail/detail.component';
import * as ThreadsDetailComponent from './pages/threads/detail/detail.component';
import * as CommunitiesEditComponent from './pages/communities/edit/edit.component';
import * as ThreadsEditComponent from './pages/threads/edit/edit.component';
import { HomepageComponent } from './pages/homepage/homepage.component';

export const appRoutes: Route[] = [
    { path: 'homepage', pathMatch: 'full', component: HomepageComponent },
    { path: 'about', pathMatch: 'full', component: AboutComponent },
    { path: 'communities', pathMatch: 'full', component: CommunitiesComponent },
    { path: 'communities/detail/:id', pathMatch: 'full', component: CommunitiesDetailComponent.DetailComponent },
    { path: 'communities/create', pathMatch: 'full', component: CommunitiesEditComponent.EditComponent, data: { createCommunity: true, title: 'Create community' }},
    { path: 'communities/edit/:id', pathMatch: 'full', component: CommunitiesEditComponent.EditComponent, data: { createCommunity: false, title: 'Edit community' }},
    { path: 'threads/detail/:id', pathMatch: 'full', component: ThreadsDetailComponent.DetailComponent },
    { path: 'threads/create', pathMatch: 'full', component: ThreadsEditComponent.EditComponent, data: { createThread: true, title: 'Create thread' }},
    { path: '**', redirectTo: 'homepage' }
];

import { Route } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { CommunitiesComponent } from './pages/communities/communities/communities.component';
import { DetailComponent } from './pages/communities/detail/detail.component';
import { EditComponent } from './pages/communities/edit/edit.component';
import { HomepageComponent } from './pages/homepage/homepage.component';

export const appRoutes: Route[] = [
    { path: 'homepage', pathMatch: 'full', component: HomepageComponent },
    { path: 'communities', pathMatch: 'full', component: CommunitiesComponent },
    { path: 'about', pathMatch: 'full', component: AboutComponent },
    { path: 'detail/:id', pathMatch: 'full', component: DetailComponent },
    { path: 'create', pathMatch: 'full', component: EditComponent, data: { createCommunity: true, title: 'Create community' }},
    { path: 'edit/:id', pathMatch: 'full', component: EditComponent, data: { createCommunity: false, title: 'Edit community' }},
    { path: '**', redirectTo: 'homepage' }
];

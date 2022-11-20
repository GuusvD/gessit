import { Route } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { CommunitiesComponent } from './pages/communities/communities.component';
import { DetailComponent } from './pages/detail/detail.component';
import { HomepageComponent } from './pages/homepage/homepage.component';

export const appRoutes: Route[] = [
    { path: 'homepage', pathMatch: 'full', component: HomepageComponent },
    { path: 'communities', pathMatch: 'full', component: CommunitiesComponent },
    { path: 'about', pathMatch: 'full', component: AboutComponent, },
    { path: 'detail/:id', pathMatch: 'full', component: DetailComponent, }
];

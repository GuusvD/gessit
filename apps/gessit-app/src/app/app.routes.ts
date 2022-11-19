import { Route } from '@angular/router';
import { CommunitiesComponent } from './pages/communities/communities.component';
import { HomepageComponent } from './pages/homepage/homepage.component';

export const appRoutes: Route[] = [
    { path: 'homepage', pathMatch: 'full', component: HomepageComponent },
    { path: 'communities', pathMatch: 'full', component: CommunitiesComponent }
];

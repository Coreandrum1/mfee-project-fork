import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    title: 'Home Page',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePageComponent,
    title: 'Home Page',
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: AuthPageComponent,
    title: 'Home Page',
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '/home' },
];

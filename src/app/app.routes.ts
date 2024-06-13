import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { authGuard } from './auth.guard';
import { RegisterFormComponent } from './register-form/register-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { DetailsComponent } from './details/details.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePageComponent,
    title: 'Home',
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginFormComponent,
    title: 'Login',
  },
  {
    path: 'register',
    component: RegisterFormComponent,
    title: 'Sign Up',
  },
  {
    path: 'cat-breed/:id',
    component: DetailsComponent,
    title: 'Cat Details',
    canActivate: [authGuard],
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '/home' },
];

import { Routes } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

export const RoutesConstant = {
  LOGIN: 'login',
  SIGNU: 'signup',
  Home: 'home',
  BLOG: 'blog',
  NOT_FOUND: 'not-found',
};

export const routes: Routes = [
  {
    path: RoutesConstant.BLOG,
    component: BlogComponent,
  },
  {
    path: RoutesConstant.Home,
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: RoutesConstant.LOGIN,
    loadComponent: () =>
      import('./login/login.component').then(c => c.LoginComponent),
    canActivate: [loginGuard],
  },
  {
    path: RoutesConstant.SIGNU,
    loadComponent: () =>
      import('./signup/signup.component').then(c => c.SignupComponent),
    canActivate: [loginGuard],
  },
  { path: '', redirectTo: `/${RoutesConstant.BLOG}`, pathMatch: 'full' },
  { path: RoutesConstant.NOT_FOUND, component: NotFoundComponent },
  { path: '**', redirectTo: RoutesConstant.NOT_FOUND },
];

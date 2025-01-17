import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/login/login.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { AuthGuard } from './guards/auth.guards';

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: 'login', component: AuthComponent },
  { path: 'register', component: AuthComponent },
  { path: 'articles', component: ArticlesComponent, canActivate: [AuthGuard] },
];

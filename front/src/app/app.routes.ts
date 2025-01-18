import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PostsComponent } from './pages/posts/posts.component';
import { AuthGuard } from './guards/auth.guards';
import { RegisterComponent } from './pages/register/register.component';
import { TopicsComponent } from './pages/topics/topics.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { PostCreationComponent } from './pages/post-creation/post-creation.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'articles', component: PostsComponent, canActivate: [AuthGuard] },
  { path: 'themes', component: TopicsComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'post/create', component: PostCreationComponent, canActivate: [AuthGuard] },
  { path: 'post/:id', component: PostDetailComponent, canActivate: [AuthGuard] },
  { path: '404', component: NotFoundComponent, canActivate: [AuthGuard] },
];

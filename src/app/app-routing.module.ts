import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from 'src/modules/auth/components/signup/signup.component';
import { LoginComponent } from 'src/modules/auth/components/login/login.component';
import { UserProfileComponent } from 'src/modules/auth/components/user-profile/user-profile.component';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { ForgotPasswordComponent } from 'src/modules/auth/components/forgot-password/forgot-password.component';
// import { CreatePostComponent } from './post/create-post/create-post.component';
// import { ViewPostComponent } from './post/view-post/view-post.component';
// import { CreateForumComponent } from './forum/create-forum/create-forum.component';
// import { ListForumsComponent } from './forum/list-forums/list-forums.component';
// import { ViewForumComponent } from './forum/view-forum/view-forum.component';

const routes: Routes = [
  // { path: 'user-profile/:name', component: UserProfileComponent, canActivate: [AuthGuard] },
  // { path: 'signup', component: SignupComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'forgotpassword', component: ForgotPasswordComponent },

  // { path: 'view-post/:id', component: ViewPostComponent },
  // { path: 'create-post', component: CreatePostComponent, canActivate: [AuthGuard] },

  // { path: 'view-forum/:id', component: ViewForumComponent },
  // { path: 'forums', component: ListForumsComponent },
  // { path: 'forum/add', component: CreateForumComponent, canActivate: [AuthGuard] },

  // { path: '',
  //   pathMatch: 'full',
  //   redirectTo: '/dashboard', },


  { path: 'posts',
    loadChildren: () => 
        import('../modules/post/post-routing.module').then(m => m.PostRoutingModule),},
  
  { path: 'forums',
    loadChildren: () => 
        import('../modules/forum/forum-routing.module').then(m => m.ForumRoutingModule),},
    
  { path: 'charts',
    loadChildren: () => 
        import('../modules/charts/charts-routing.module').then(m => m.ChartsRoutingModule),},

  { path: '',
    loadChildren: () =>
        import('../modules/dashboard/dashboard-routing.module').then(m => m.DashboardRoutingModule),},

  { path: 'auth',
    loadChildren: () =>
        import('../modules/auth/auth-routing.module').then(m => m.AuthRoutingModule),},

  { path: 'error',
    loadChildren: () =>
        import('../modules/error/error-routing.module').then(m => m.ErrorRoutingModule),},

  { path: 'tables',
    loadChildren: () =>
        import('../modules/tables/tables-routing.module').then(m => m.TablesRoutingModule),},

  { path: 'version',
    loadChildren: () =>
        import('../modules/utility/utility-routing.module').then(m => m.UtilityRoutingModule),},

  { path: '**',
    pathMatch: 'full',
    loadChildren: () =>
        import('../modules/error/error-routing.module').then(m => m.ErrorRoutingModule),},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

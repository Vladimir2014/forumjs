import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from 'src/modules/auth/components/signup/signup.component';
import { LoginComponent } from 'src/modules/auth/components/login/login.component';
import { UserProfileComponent } from 'src/modules/auth/components/user-profile/user-profile.component';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { ForgotPasswordComponent } from 'src/modules/auth/components/forgot-password/forgot-password.component';

// { path: 'user-profile/:name', component: UserProfileComponent, canActivate: [AuthGuard] },
// { path: 'signup', component: SignupComponent },
// { path: 'login', component: LoginComponent },
// { path: 'forgotpassword', component: ForgotPasswordComponent },

const routes: Routes = [

  { path: 'forums',
    loadChildren: () => 
    import('../modules/forum/forum-routing.module').then(m => m.ForumRoutingModule),},

  { path: 'charts',
    loadChildren: () => 
    import('../modules/charts/charts-routing.module').then(m => m.ChartsRoutingModule),},

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

  { path: '',
    loadChildren: () =>
    import('../modules/dashboard/dashboard-routing.module').then(m => m.DashboardRoutingModule),},

  { path: '**',
    pathMatch: 'full',
    loadChildren: () =>
    import('../modules/error/error-routing.module').then(m => m.ErrorRoutingModule),},

  ];
      
@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

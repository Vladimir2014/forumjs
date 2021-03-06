import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '../navigation/models';

/* Module */
import { AuthModule } from './auth.module';

/* Containers */
import * as authContainers from './containers';

/* Components */
import * as authComponents from './components';

/* Guards */
import { AuthGuard } from './guards/auth.guard';

/* Routes */
export const ROUTES: Routes = [
    {
        path: 'login',
        canActivate: [],
        component: authComponents.LoginComponent,
        data: {
            title: 'Login',
        } as SBRouteData,
    },

    {
        path: 'register',
        canActivate: [],
        component: authComponents.SignupComponent,
        data: {
            title: 'Register',
        } as SBRouteData,
    },

    {
        path: 'forgotpassword',
        canActivate: [],
        component: authComponents.ForgotPasswordComponent,
        data: {
            title: 'Forgot Password',
        } as SBRouteData,
    },

    {
        path: 'user/settings',
        canActivate: [AuthGuard],
        component: authComponents.UserProfileComponent,
        data: {
            title: 'User Settings',
        } as SBRouteData,
    },

    {
        path: 'user/activity',
        canActivate: [AuthGuard],
        component: authComponents.UserProfileComponent,
        data: {
            title: 'User Settings',
        } as SBRouteData,
    },

    {
        path: 'user/:?',
        canActivate: [AuthGuard],
        component: authComponents.UserProfileComponent,
        data: {
            title: 'User Profiles',
        } as SBRouteData,
    },

    
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
    },

    {
        path: '**',
        pathMatch: 'full',
        loadChildren: () =>
        import('../error/error-routing.module').then(m => m.ErrorRoutingModule)
    },
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}

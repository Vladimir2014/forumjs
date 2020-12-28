import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
    redirectTo: 'forums', 
    pathMatch: 'full' },

  { path: '**',
    pathMatch: 'full',
    loadChildren: () =>
    import('../modules/error/error-routing.module').then(m => m.ErrorRoutingModule),},

  ];
      
@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'forums',
    loadChildren: () => 
    import('./modules/application/application-routing.module').then(m => m.ApplicationRoutingModule),
  },

  { path: 'auth',
    loadChildren: () =>
    import('./modules/auth/auth-routing.module').then(m => m.AuthRoutingModule),
  },

  { path: 'error',
    loadChildren: () =>
    import('./modules/error/error-routing.module').then(m => m.ErrorRoutingModule),
  },

  { path: '',
    redirectTo: 'forums', 
    pathMatch: 'full' 
  },

  { path: '**',
    pathMatch: 'full',
    loadChildren: () =>
    import('./modules/error/error-routing.module').then(m => m.ErrorRoutingModule),
  },
];
      
@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

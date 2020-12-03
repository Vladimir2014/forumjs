import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';

import * as postComponents from './components';

const routes: Routes = [
  { path: '', component: postComponents.ListPostsComponent, outlet: 'posts' },
  { path: 'add', component: postComponents.CreatePostComponent, outlet: 'posts', canActivate: [AuthGuard] },
  { path: ':id', component: postComponents.ViewPostComponent, outlet: 'posts' },
  { path: '**',
    pathMatch: 'full',
    loadChildren: () =>
    import('src/modules/error/error-routing.module').then(m => m.ErrorRoutingModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }

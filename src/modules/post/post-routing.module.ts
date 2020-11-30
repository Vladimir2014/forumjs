import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';

import * as postComponents from './components';

const routes: Routes = [
  { path: '', component: postComponents.ListPostsComponent },
  { path: 'add', component: postComponents.CreatePostComponent, canActivate: [AuthGuard] },
  { path: ':id', component: postComponents.ViewPostComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }

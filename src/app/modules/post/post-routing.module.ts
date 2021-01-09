import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { SBRouteData } from '../navigation/models';

import * as postComponents from './components';
import { PostModule } from './post.module';

export const postRoutes: Routes = [  
  { path: 'add', 
    component: postComponents.CreatePostComponent, 
    canActivate: [AuthGuard],
    data: {
      title: 'New Post',
      breadcrumbs: [
        {
          text: 'Forum',
          link: '/forums',
          active: false,
        },
      ],
    } as SBRouteData, 
  },

  { path: '', 
    component: postComponents.ListPostsComponent, 
    data: {
      title: 'Forum',
      breadcrumbs: [
        {
            text: 'Forums',
            link: '/forums',
            active: false,
        },
      ],
    } as SBRouteData, 
  },
  
  { path: ':id', 
    component: postComponents.ViewPostComponent, 
    data: {
      title: 'Forum',
      breadcrumbs: [
        {
            text: 'Forums',
            link: '/forums',
            active: false,
        },
      ],
    } as SBRouteData,
  },

  { path: '**',
    pathMatch: 'full',
    loadChildren: () =>
    import('../error/error-routing.module').then(m => m.ErrorRoutingModule)
  },
];

@NgModule({
  imports: [PostModule, RouterModule.forChild(postRoutes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }

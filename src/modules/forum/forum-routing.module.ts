/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from 'src/modules/navigation/models';

/* Module */
import { ForumModule } from './forum.module';

/* Components */
import * as forumComponents from './components';
import { AuthGuard } from '../auth/guards/auth.guard';

const ROUTES: Routes = [
  {
    path: '',
    canActivate: [],
    component: forumComponents.ListForumsComponent,
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
  
  {
    path: 'add',
    canActivate: [AuthGuard],
    component: forumComponents.CreateForumComponent,
    data: {
      title: 'Forum',
      breadcrumbs: [
        {
          text: 'Forums',
          link: '/forums',
        },
        {
          text: 'New',
          active: true,
        },
      ],
    } as SBRouteData,
  },
  
  {
    path: 'invalid',
    canActivate: [],
    component: forumComponents.ErrorForumComponent,
    data: {
      title: 'Forum',
      breadcrumbs: [
        {
          text: 'Forum',
          link: '/forums',
        },
        {
          text: 'Invalid Forum',
          active: false,
        },
      ],
    } as SBRouteData,
  },

  {
    path: ':id',
    canActivate: [],
    component: forumComponents.ViewForumComponent,
    data: {
        title: 'Forum',
        breadcrumbs: [           
            {
                text: 'Forum',
                link: '/forums',
            },
            {
                text: 'View',
                active: true,
            },
        ],
    } as SBRouteData,
    children: [
      { path: 'posts',
        loadChildren: () => 
        import('src/modules/post/post-routing.module').then(m => m.PostRoutingModule),},
        { path: 'posts/add',
        loadChildren: () => 
        import('src/modules/post/post-routing.module').then(m => m.PostRoutingModule),},
    ]
  },

  // {
  //   path: '',
  //   pathMatch: 'full',
  //   redirectTo: '/forums',
  // },

  { path: '**',
    pathMatch: 'full',
    loadChildren: () =>
    import('src/modules/error/error-routing.module').then(m => m.ErrorRoutingModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ForumRoutingModule { }

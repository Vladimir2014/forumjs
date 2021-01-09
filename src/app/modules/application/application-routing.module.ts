import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/guards';
import { SBRouteData } from '../navigation/models';

/* Components */
import * as applicationComponents from './components';

const applicationRoutes: Routes = [
  {
    path: '',
    canActivate: [],
    component: applicationComponents.ListForumsComponent,
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
    component: applicationComponents.CreateForumComponent,
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
    component: applicationComponents.ErrorForumComponent,
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
      { 
        path: 'posts',
        component: applicationComponents.ViewForumsComponent,
      },
      { 
        path: 'posts/add',
        component: applicationComponents.CreatePostComponent,
      },
      { 
        path: '',
        pathMatch: 'full',
        redirectTo: 'posts'
      },
    ]
  },

  { path: '**',
    pathMatch: 'full',
    loadChildren: () => import('../error/error-routing.module').then(m => m.ErrorRoutingModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(applicationRoutes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }

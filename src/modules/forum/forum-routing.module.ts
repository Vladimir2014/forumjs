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
                text: 'Forum',
                link: '/forums',
            },
            {
                text: 'List',
                active: true,
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
          text: 'Forum',
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
      },
];

@NgModule({
  imports: [ForumModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ForumRoutingModule { }

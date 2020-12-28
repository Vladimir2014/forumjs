import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostRoutingModule } from './post-routing.module';

/* Components */
import * as postComponents from './components';

/* Modules */
import { NavigationModule } from '../navigation/navigation.module';
import { RouterModule } from '@angular/router';
import { AppCommonModule } from '../app-common/app-common.module';
import { VoteModule } from '../vote/vote.module';
import { ListPostsComponent } from './components/list-posts/list-posts.component';

@NgModule({
  declarations: [
    ...postComponents.components,
    ListPostsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PostRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppCommonModule,
    NavigationModule,
    VoteModule,
  ],
  exports: [
    ...postComponents.components
  ]
})
export class PostModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { ApplicationRoutingModule } from './application-routing.module';
import { ForumModule } from '../forum/forum.module';
import { AppCommonModule } from '../app-common/app-common.module';
import { NavigationModule } from '../navigation/navigation.module';
import { TablesModule } from '../tables/tables.module';
import { PostModule } from '../post/post.module';

/* Components */
import * as components from './components';
import { CreatePostComponent } from './components/create-post/create-post.component';

@NgModule({
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    ForumModule,
    AppCommonModule,
    RouterModule,
    ReactiveFormsModule,
    NavigationModule,
    FormsModule,
    PostModule,
    TablesModule
  ],
  declarations: [...components.components, CreatePostComponent],
  exports: [...components.components]
    
})
export class ApplicationModule { }

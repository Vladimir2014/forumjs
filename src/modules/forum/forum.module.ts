import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from '../app-common/app-common.module';
import { NavigationModule } from '../navigation/navigation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

/* Components */
import * as forumComponents from './components';

/* Modules */
import { TablesModule } from '../tables/tables.module';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorForumComponent } from './components/error-forum/error-forum.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    AppCommonModule,
    NavigationModule,
    FormsModule,
    TablesModule
  ],
  declarations: [...forumComponents.components, ErrorForumComponent],
  exports: [...forumComponents.components]

})
export class ForumModule { }

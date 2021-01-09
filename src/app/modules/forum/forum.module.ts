import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

/* Modules */
import { AppCommonModule } from '../app-common/app-common.module';
import { NavigationModule } from '../navigation/navigation.module';
import { TablesModule } from '../tables/tables.module';

/* Components */
import * as forumComponents from './components';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AppCommonModule,
    NavigationModule,
    FormsModule,
    TablesModule
  ],
  declarations: [...forumComponents.components],
  exports: [...forumComponents.components]

})
export class ForumModule { }

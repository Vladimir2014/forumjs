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

@NgModule({
  imports: [
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

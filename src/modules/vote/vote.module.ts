import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Components */
import * as voteComponents from './components'; 
import { IconsModule } from '../icons/icons.module';

@NgModule({
  declarations: [
    ...voteComponents.components,
  ],
  imports: [
    CommonModule,
    IconsModule
  ],
  exports: [
    ...voteComponents.components,
  ]
})
export class VoteModule { }

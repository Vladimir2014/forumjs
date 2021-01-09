/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { TablesModule } from './tables.module';

/* Guards */
import * as tablesGuards from './guards';

/* Routes */
export const ROUTES: Routes = [];

@NgModule({
    imports: [TablesModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class TablesRoutingModule {}

/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { AppCommonModule } from '../app-common/app-common.module';
import { NavigationModule } from '../navigation/navigation.module';

/* Components */
import * as tablesComponents from './components';

/* Directives */
import * as tablesDirectives from './directives';

/* Guards */
import * as tablesGuards from './guards';

/* Services */
import * as tablesServices from './services';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        NavigationModule,
    ],
    providers: [
        DecimalPipe,
        ...tablesServices.services,
        ...tablesGuards.guards,
        ...tablesDirectives.directives,
    ],
    declarations: [
        ...tablesComponents.components,
        ...tablesDirectives.directives,
    ],
    exports: [ ...tablesComponents.components],
})
export class TablesModule {}

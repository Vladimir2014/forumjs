/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { AppCommonModule } from '../app-common/app-common.module';
import { NavigationModule } from '../navigation/navigation.module';

/* Components */
import * as chartsComponents from './components';

/* Containers */
import * as chartsContainers from './containers';

/* Guards */
import * as chartsGuards from './guards';

/* Services */
import * as chartsServices from './services';

@NgModule({
    imports: [
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        NavigationModule,
    ],
    providers: [...chartsServices.services, ...chartsGuards.guards],
    declarations: [...chartsContainers.containers, ...chartsComponents.components],
    exports: [...chartsContainers.containers, ...chartsComponents.components],
})
export class ChartsModule {}

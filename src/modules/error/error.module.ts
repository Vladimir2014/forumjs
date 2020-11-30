/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { AppCommonModule } from 'src/modules/app-common/app-common.module';
import { NavigationModule } from 'src/modules/navigation/navigation.module';

/* Components */
import * as errorComponents from './components';

/* Containers */
import * as errorContainers from './containers';

/* Guards */
import * as errorGuards from './guards';

/* Services */
import * as errorServices from './services';

@NgModule({
    imports: [
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        NavigationModule,
    ],
    providers: [...errorServices.services, ...errorGuards.guards],
    declarations: [...errorContainers.containers, ...errorComponents.components],
    exports: [...errorContainers.containers, ...errorComponents.components],
})
export class ErrorModule {}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ToastrModule } from 'ngx-toastr';
import { NgxWebstorageModule } from 'ngx-webstorage';

/* Modules */
// import { AppCommonModule } from 'src/modules/app-common/app-common.module';
import { NavigationModule } from '../navigation/navigation.module';
import { PostModule } from '../post/post.module';

/* Components */
import * as authComponents from './components';

/* Containers */
import * as authContainers from './containers';

/* Guards */
import * as authGuards from './guards';

/* Services */
import * as authServices from './services';
import { UserActivityComponent } from './components/user-activity/user-activity.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        PostModule,
        NavigationModule,
        NgxWebstorageModule.forRoot(),
        ToastrModule.forRoot(),
        EditorModule,
        NgbModule,
    ],
    providers: [...authServices.services, ...authGuards.guards],
    declarations: [...authContainers.containers, ...authComponents.components, UserActivityComponent],
    exports: [...authContainers.containers, ...authComponents.components],
})
export class AuthModule {}

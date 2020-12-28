import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule, DecimalPipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TokenInterceptor } from './token.interceptor';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationModule } from 'src/modules/navigation/navigation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from 'src/modules/auth/auth.module';
import { TablesModule } from 'src/modules/tables/tables.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule,
    NgxWebstorageModule.forRoot(),
    ToastrModule.forRoot(),
    EditorModule,
    NgbModule,
    NavigationModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    DecimalPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

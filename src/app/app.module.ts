import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './home/home.component';
import { TokenInterceptor } from './token.interceptor';
import { PostTileComponent } from './shared/post-tile/post-tile.component';
import { VoteButtonComponent } from './shared/vote-button/vote-button.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { ForumSideBarComponent } from './shared/forum-side-bar/forum-side-bar.component';
import { CreateForumComponent } from './forum/create-forum/create-forum.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { ListForumsComponent } from './forum/list-forums/list-forums.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ViewPostComponent } from './post/view-post/view-post.component';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { ArrowUpComponent } from './svg/arrow-up/arrow-up.component';
import { ArrowDownComponent } from './svg/arrow-down/arrow-down.component';
import { ViewForumComponent } from './forum/view-forum/view-forum.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { AvatarComponent } from './svg/avatar/avatar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    PostTileComponent,
    VoteButtonComponent,
    SideBarComponent,
    ForumSideBarComponent,
    CreateForumComponent,
    CreatePostComponent,
    ListForumsComponent,
    ViewPostComponent,
    UserProfileComponent,
    ArrowUpComponent,
    ArrowDownComponent,
    ViewForumComponent,
    ForgotPasswordComponent,
    AvatarComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    EditorModule,
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

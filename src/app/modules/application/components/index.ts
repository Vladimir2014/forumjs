import { CreatePostComponent } from './create-post/create-post.component';
import { CreateForumComponent } from './create-forum/create-forum.component';
import { ErrorForumComponent } from './error-forum/error-forum.component';
import { ListForumsComponent } from './list-forums/list-forums.component';
import { ViewForumsComponent } from './view-forum/view-forum.component';

export const components = [
    CreateForumComponent,
    CreatePostComponent,
    ErrorForumComponent,
    ListForumsComponent,
    ViewForumsComponent,
];

export * from './create-forum/create-forum.component';
export * from './create-post/create-post.component';
export * from './error-forum/error-forum.component';
export * from './list-forums/list-forums.component';
export * from './view-forum/view-forum.component';
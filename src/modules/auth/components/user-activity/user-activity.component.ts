import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/modules/post/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/modules/comment/services/comment.service';
import { Post } from 'src/modules/post/models/post';
import { CommentPayload } from 'src/modules/comment/models/comment.payload';

@Component({
  selector: 'app-user-activity',
  templateUrl: './user-activity.component.html',
  styleUrls: ['./user-activity.component.scss']
})
export class UserActivityComponent {
  name: string;
  posts: Post[];
  comments: CommentPayload[];
  postLength: number;
  commentLength: number;

  constructor(private activatedRoute: ActivatedRoute, 
              private postService: PostService,
              private commentService: CommentService) {
                console.log(this.activatedRoute);
    this.name = this.activatedRoute.snapshot.url[1].path;

    this.postService.getAllPostsByUser(this.name).subscribe(data => {
      this.posts = data;
      this.postLength = data.length;
    });
    this.commentService.getAllCommentsByUser(this.name).subscribe(data => {
      this.comments = data;
      this.commentLength = data.length;
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/modules/post/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/modules/comment/services/comment.service';
import { Post } from 'src/modules/post/models/post';
import { CommentPayload } from 'src/modules/comment/models/comment.payload';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  name: string;
  posts: Post[];
  comments: CommentPayload[];
  postLength: number;
  commentLength: number;

  constructor(private activatedRoute: ActivatedRoute, private postService: PostService,
    private commentService: CommentService) {
    this.name = this.activatedRoute.snapshot.params.name;

    this.postService.getAllPostsByUser(this.name).subscribe(data => {
      this.posts = data;
      this.postLength = data.length;
    });
    this.commentService.getAllCommentsByUser(this.name).subscribe(data => {
      this.comments = data;
      this.commentLength = data.length;
    });
  }

  ngOnInit(): void {
  }

}
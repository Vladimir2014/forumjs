import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Forum } from 'src/modules/forum/models/forum';
import { ForumService } from 'src/modules/forum/services/forum.service';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss']
})
export class ListPostsComponent implements OnInit {
  posts: Post[];
  forum: Forum = new Forum();

  constructor(private router: Router, 
              private activatedRoute: ActivatedRoute,
              private postService: PostService,
              private forumService: ForumService) { }

  ngOnInit(): void {
    this.forumService.getCurrentForum()
    .subscribe(forum => {
      this.forum = forum
      this.posts = this.forum.posts;
    });
  

    // if (this.forum.id) {
    //   this.postService.getAllPostsForForum(this.forum.id)
    //   .subscribe(posts => this.posts = posts)
    //   ;
    // }
  }

}

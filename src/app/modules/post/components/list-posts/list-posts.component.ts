import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Forum } from '../../../forum/models/forum';
import { ForumService } from '../../../forum/services/forum.service';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-list-posts-component',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss']
})
export class ListPostsComponent implements OnInit {
  posts: Subject<Array<Post>> = new Subject();
  forum: Forum = new Forum();
  header: any[] = [ 'Description', 
                    'Forum Name', 
                    'Post Name', 
                    'URL', 
                    'Username', 
                    '# Comments',
                    'Duration', 
                    '# Votes', 
                    'Up Votes', 
                    'Down Votes' ];

  constructor(private router: Router, 
              private route: ActivatedRoute,
              private postService: PostService,
              private forumService: ForumService) { }

  ngOnInit(): void {
    console.log(this.route.pathFromRoot);

    const forumId = parseInt(this.route.snapshot.paramMap.get('id'));

    if (!isNaN(forumId)) {
      this.forumService.getForum(forumId)
      .subscribe(forum => {
        this.forum = forum;
        this.posts.next(this.forum.posts);
      });
    }

  

    if (this.forum.id) {
      this.postService.getAllPostsForForum(this.forum.id)
      .subscribe(posts => this.posts.next(posts))
      ;
    }
  }

}

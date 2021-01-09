import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Forum } from '../../../forum/models/forum';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { ForumService } from '../../../forum/services/forum.service';
import { throwError } from 'rxjs';
import { CreatePostPayload } from '../../models/create.post.payload';

@Component({
  selector: 'app-create-post-component',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  createPostForm: FormGroup;
  postPayload: CreatePostPayload;
  forum: Forum = new Forum();

  constructor(private router: Router, 
              private route: ActivatedRoute,
              private postService: PostService,
              private forumService: ForumService) {
                console.log('here');
    this.postPayload = {
      postName: '',
      url: '',
      description: '',
      forumName: ''
    }
  }

  ngOnInit() {
    this.createPostForm = new FormGroup({
      postName: new FormControl('', Validators.required),
      forumName: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });

    const forumId = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log('--------------->', forumId);

    if (!isNaN(forumId)) {
      this.forumService.getForum(forumId).subscribe(forum => {
        console.log('--------------->', forum);
        this.forum = forum;
      });
    }
  }

  createPost() {
    console.log(this.forum);
    this.postPayload.postName = this.createPostForm.get('postName').value;
    this.postPayload.forumId = this.forum.id;
    this.postPayload.forumName = this.forum.name;
    this.postPayload.url = this.createPostForm.get('url').value;
    this.postPayload.description = this.createPostForm.get('description').value;

    this.postService.createPost(this.postPayload).subscribe((data) => {
    this.router.navigateByUrl('/');
    }, error => {
      throwError(error);
    })
  }

  discardPost() {
    this.router.navigateByUrl('/');
  }
}

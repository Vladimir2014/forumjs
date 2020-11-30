import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ForumModel } from 'src/modules/forum/models/forum-response';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { ForumService } from 'src/modules/forum/services/forum.service';
import { throwError } from 'rxjs';
import { CreatePostPayload } from '../../models/create.post.payload';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  createPostForm: FormGroup;
  postPayload: CreatePostPayload;
  forums: Array<ForumModel>;

  constructor(private router: Router, 
              private postService: PostService,
              private forumService: ForumService) {
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
    this.forumService.getAllForums().subscribe((data) => {
      this.forums = data;
    }, error => {
      throwError(error);
    });
  }

  createPost() {
    this.postPayload.postName = this.createPostForm.get('postName').value;
    this.postPayload.forumName = this.createPostForm.get('forumName').value;
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

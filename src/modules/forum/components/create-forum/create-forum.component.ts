import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ForumModel } from '../../models/forum-response';
import { Router } from '@angular/router';
import { ForumService } from '../../services/forum.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-create-forum',
  templateUrl: './create-forum.component.html',
  styleUrls: ['./create-forum.component.scss']
})
export class CreateForumComponent {
  createForumForm: FormGroup;
  forumModel: ForumModel;
  title = new FormControl('');
  description = new FormControl('');

  constructor(private router: Router, private forumService: ForumService) {
    this.createForumForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
    this.forumModel = {
      name: '',
      description: ''
    }
  }

  discard() {
    this.router.navigateByUrl('/');
  }

  createForum() {
    this.forumModel.name = this.createForumForm.get('title').value;
    this.forumModel.description = this.createForumForm.get('description').value;
    this.forumService.createForum(this.forumModel).subscribe(data => {
      this.router.navigateByUrl('/forums');
    }, error => {
      throwError(error);
    })
  }
}
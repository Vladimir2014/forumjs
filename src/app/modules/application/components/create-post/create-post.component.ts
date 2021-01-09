import { Component, Input, OnInit } from '@angular/core';
import { Forum } from 'src/app/modules/forum/models/forum';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  @Input("forum") forum: Forum;
  
  constructor() { }

  ngOnInit(): void {
  }

}

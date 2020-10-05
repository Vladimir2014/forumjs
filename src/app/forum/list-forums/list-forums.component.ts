import { Component, OnInit } from '@angular/core';
import { ForumModel } from '../forum-response';
import { ForumService } from '../forum.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-list-forums',
  templateUrl: './list-forums.component.html',
  styleUrls: ['./list-forums.component.scss']
})
export class ListForumsComponent implements OnInit {
  forums: Array<ForumModel>;
  constructor(private forumService: ForumService) { }

  ngOnInit() {
    this.forumService.getAllForums().subscribe(data => {
      this.forums = data;
    }, error => {
      throwError(error);
    })
  }
}
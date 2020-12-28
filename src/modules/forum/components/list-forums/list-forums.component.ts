import { Component, OnInit } from '@angular/core';
import { Forum } from '../../models/forum';
import { ForumService } from '../../services/forum.service';
import { Subject, throwError } from 'rxjs';
import { Field } from 'src/modules/tables/models';

@Component({
  selector: 'app-list-forums',
  templateUrl: './list-forums.component.html',
  styleUrls: ['./list-forums.component.scss']
})
export class ListForumsComponent implements OnInit {
  forums: Subject<Array<Forum>> = new Subject();
  fields: Field[] = this.defineTableFields();

  constructor(private forumService: ForumService) {}

  ngOnInit() {
    this.forumService.getAllForums().subscribe(data => {
      this.forums.next(data);
    }, error => {
      throwError(error);
    })
  }

  private defineTableFields() : Field[] {
    return [
      { type: String,
        name: 'Name',
        key: 'name',
      },
      { type: String,
        name: 'Description',
        key: 'description'
      },
      { type: Number,
        name: 'Posts',
        key: 'numberOfPosts'
      },
    ];
  }
}
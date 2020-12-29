import { Component, OnInit } from '@angular/core';
import { Forum } from '../../models/forum';
import { ForumService } from '../../services/forum.service';
import { Subject, throwError } from 'rxjs';

@Component({
  selector: 'app-list-forums',
  templateUrl: './list-forums.component.html',
  styleUrls: ['./list-forums.component.scss']
})
export class ListForumsComponent implements OnInit {
  forums: Subject<Array<Forum>> = new Subject();
  header: any[] = [ 'Name', 'Description', 'Posts' ];

  constructor(private forumService: ForumService) {}

  ngOnInit() {
    this.forumService.getAllForums().subscribe(data => {
      this.forums.next(data);
    }, error => {
      throwError(error);
    })
  }
}
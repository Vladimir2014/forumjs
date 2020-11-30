import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForumModel } from '../../models/forum-response';
import { ForumService } from '../../services/forum.service';

@Component({
  selector: 'app-view-forum',
  templateUrl: './view-forum.component.html',
  styleUrls: ['./view-forum.component.scss']
})
export class ViewForumComponent implements OnInit {
  id: number;
  forum = new ForumModel();

  constructor(private forumService: ForumService,
              private activateRoute: ActivatedRoute) {
    this.id = this.activateRoute.snapshot.params.id;
  }
  
  ngOnInit(): void {
    this.getForuById();
  }
  
  private getForuById() {
    console.log('id: ', this.id);
    this.forumService.getForum(this.id).subscribe(data => {
        this.forum = data;
    });
  }
}

import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Forum } from '../../models/forum';
import { ForumService } from '../../services/forum.service';

@Component({
  selector: 'app-view-forum',
  templateUrl: './view-forum.component.html',
  styleUrls: ['./view-forum.component.scss']
})
export class ViewForumComponent implements OnInit {
  id: number;
  forum = new Forum();

  constructor(private forumService: ForumService,
              private activateRoute: ActivatedRoute,
              private router: Router) {
    this.id = this.activateRoute.snapshot.params.id;

    if (!this.id || isNaN(this.id)) {
      this.router.navigate(['invalid'], { relativeTo: this.activateRoute.parent });
    } else {
      this.router.navigate(['posts'], { relativeTo: this.activateRoute });
    }
  }
  
  ngOnInit(): void {
    this.getForuById();
  }
  
  private getForuById() {
    this.forumService.getForum(this.id).subscribe(data => {
        this.forum = data;
    });
  }
}

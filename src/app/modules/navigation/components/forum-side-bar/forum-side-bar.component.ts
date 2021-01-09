import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../../forum/services/forum.service';
import { Forum } from '../../../forum/models/forum';

@Component({
  selector: 'app-forum-side-bar',
  templateUrl: './forum-side-bar.component.html',
  styleUrls: ['./forum-side-bar.component.scss']
})
export class ForumSideBarComponent implements OnInit {
  forums: Array<Forum> = [];
  displayViewAll: boolean;

  constructor(private forumService: ForumService) {
    this.forumService.getAllForums().subscribe(data => {
      if (data.length > 3) {
        this.forums = data.splice(0, 3);
        this.displayViewAll = true;
      } else {
        this.forums = data;
      }
    });
  }

  ngOnInit(): void {
  }
}
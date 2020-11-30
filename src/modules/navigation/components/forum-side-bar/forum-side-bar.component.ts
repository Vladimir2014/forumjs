import { Component, OnInit } from '@angular/core';
import { ForumService } from 'src/modules/forum/services/forum.service';
import { ForumModel } from 'src/modules/forum/models/forum-response';

@Component({
  selector: 'app-forum-side-bar',
  templateUrl: './forum-side-bar.component.html',
  styleUrls: ['./forum-side-bar.component.scss']
})
export class ForumSideBarComponent implements OnInit {
  forums: Array<ForumModel> = [];
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
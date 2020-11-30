import { Component, Input, ViewEncapsulation } from '@angular/core';
import { PostModel } from 'src/modules/post/models/post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PostTileComponent {

  @Input() posts: PostModel[];

  constructor(private router: Router) { }

  goToPost(id: number): void {
    this.router.navigateByUrl('/view-post/' + id);
  }
}

import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Post } from '../../../post/models/post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PostTileComponent {

  @Input() posts: Post[];

  constructor(private router: Router) { }

  goToPost(id: number): void {
    this.router.navigateByUrl('/posts/' + id);
  }
}

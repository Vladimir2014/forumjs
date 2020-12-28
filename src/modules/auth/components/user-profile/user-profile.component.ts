import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/modules/comment/services/comment.service';
import { UserDetails } from '../../models/user.details';
import { AuthService } from '../../services';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  userDetails: UserDetails = {};

  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private location: Location) {

    this.authService.getCurrentUserDetails().subscribe(data => this.userDetails = data);
  }

  goBack() {
    this.location.back();
  }
}
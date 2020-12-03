import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../../post/models/post';
import { VotePayload } from '../../../vote/models/vote-payload';
import { VoteType } from '../../models/vote-type';
import { VoteService } from 'src/modules/vote/services/vote.service';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { PostService } from 'src/modules/post/services/post.service';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.scss']
})
export class VoteButtonComponent implements OnInit {

  @Input() post: Post;
  votePayload: VotePayload;
  upvoteColor: string;
  downvoteColor: string;
  isLoggedIn: boolean;

  constructor(private voteService: VoteService,
    private authService: AuthService,
    private postService: PostService, 
    private toastr: ToastrService) {

    this.votePayload = {
      voteType: undefined,
      postId: undefined
    }
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
  }

  ngOnInit(): void {
     this.updateVoteDetails();
  }

  upvotePost() {
    this.votePayload.voteType = VoteType.UPVOTE;
    this.vote();
    this.downvoteColor = '';
  }

  downvotePost() {
    this.votePayload.voteType = VoteType.DOWNVOTE;
    this.vote();
    this.upvoteColor = '';
  }

  private vote() {
    this.votePayload.postId = this.post.postId;
    this.voteService.vote(this.votePayload).subscribe(() => {
      this.updateVoteDetails();
    }, error => {
      this.toastr.error(error.message);
      throwError(error);
    });
  }

  private updateVoteDetails() {
    if (this.post && this.post.postId) {
      this.postService.getPost(this.post.postId).subscribe(post => {
        this.post = post;
      });
    }
  }
}
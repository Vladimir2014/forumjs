import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { ResetPasswordRequest } from './reset-password-request';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { VerifyPasswordResetCodeRequest } from './verify-password-reset-code-request';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  username: string;
  forgotPasswordForm: FormGroup;
  validateCodeForm: FormGroup;
  resetPasswordRequest: ResetPasswordRequest;
  validateCodeRequest: VerifyPasswordResetCodeRequest;
  passwordResetSuccessMessage: string = '';
  isError: boolean;
  invalidInput: boolean;
  codeVerified: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private toastrService: ToastrService) {
    this.resetPasswordRequest = {
      username: null,
      code: null,
      password: null
    };

    this.validateCodeRequest = {
      username: null,
      code: null,
    }
   }

  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      code: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

    this.validateCodeForm = new FormGroup({
      code: new FormControl('', Validators.required),
    });

    this.activatedRoute.queryParams.subscribe(params => {
      if (params.username) {
        this.username = params.username;
      }
    })
  }

  sendCode() {
    this.errorMessage = '';
    this.authService.sendCode(this.username).subscribe(
      data => {
        if (data) {
          this.isError = false;
          this.toastrService.success('Code has been sent');
        } else {
          this.isError = true;
          console.log('err', data);
          this.errorMessage = 'Cannot send verification code at this time. Please try again later';
        }
      },
      err => { 
        this.isError = true;
        console.log(err);
        this.errorMessage = 'Cannot send verification code at this time. Please try again later';
      }
    );
  }

  validateCode() {
    this.errorMessage = '';
    this.codeVerified = false;
    this.isError = false;

    this.authService.validateCode(this.validateCodeRequest).subscribe(
      data => {
        if (data) {
          this.toastrService.success('Code has been verified');
          this.codeVerified = true;
        } else {
          this.isError = true;
          this.errorMessage = 'Incorrect code. Please try again.';
        }
      },
      err => { 
        this.isError = true;
        this.errorMessage = 'Incorrect code. Please try again.';
      }
    );
  }
}

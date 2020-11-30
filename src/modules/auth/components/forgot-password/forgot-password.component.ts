import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { ResetPasswordRequest } from '../../models/reset-password-request';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { VerifyPasswordResetCodeRequest } from 'src/modules/auth/models/verify-password-reset-code-request';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  username: string;
  usernameForm: FormGroup;
  resetPasswordForm: FormGroup;
  validateCodeForm: FormGroup;
  resetPasswordRequest: ResetPasswordRequest;
  verifyPasswordResetCodeRequest: VerifyPasswordResetCodeRequest;
  passwordResetSuccessMessage: string = '';
  isError: boolean;
  invalidInput: boolean;
  codeVerified: boolean = false;
  code: number;
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

    this.verifyPasswordResetCodeRequest = {
      username: null,
      code: null,
    }
   }

  ngOnInit(): void {
    this.usernameForm = new FormGroup({
      username: new FormControl('', Validators.required),
    });

    this.resetPasswordForm = new FormGroup({
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
    });
  }

  setUsername(event) {
    this.username = this.usernameForm.get('username').value;
    this.sendCode();
  }

  sendCode() {
    if (!this.username) {
      this.invalidInput = true;
      this.errorMessage = 'Invalid username';

    } else {
      this.invalidInput = false;
      this.errorMessage = '';
      this.authService.sendPasswordResetCode(this.username).subscribe(
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
  }

  verifyPasswordResetCode() {
    this.errorMessage = '';
    this.codeVerified = false;
    this.isError = false;
    this.verifyPasswordResetCodeRequest.code = this.validateCodeForm.get("code").value;
    this.verifyPasswordResetCodeRequest.username = this.username;

    if (!this.verifyPasswordResetCodeRequest.code || isNaN(this.verifyPasswordResetCodeRequest.code)) {
      this.isError = true;
      this.errorMessage = 'Invalid code';
      return;
    }
    
    if (!this.verifyPasswordResetCodeRequest.username) {
      this.isError = true;
      this.errorMessage = 'Invalid username';
      return;
    }

    this.authService.verifyPasswordResetCode(this.verifyPasswordResetCodeRequest).subscribe(
      data => {
        if (data) {
          this.toastrService.success('Code has been verified');
          this.codeVerified = true;
          this.code = this.verifyPasswordResetCodeRequest.code;
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

  resetPassword() {
    this.errorMessage = '';
    this.codeVerified = false;
    this.isError = false;
    this.resetPasswordRequest.password = this.resetPasswordForm.get("password").value;
    this.resetPasswordRequest.username = this.username;
    this.resetPasswordRequest.code = this.code;

    if (!this.resetPasswordRequest.code || isNaN(this.resetPasswordRequest.code)) {
      this.isError = true;
      this.errorMessage = 'Invalid code';
      return;
    }
    
    if (!this.resetPasswordRequest.username) {
      this.isError = true;
      this.errorMessage = 'Invalid username';
      return;
    }

    if (!this.resetPasswordRequest.password) {
      this.isError = true;
      this.errorMessage = 'Invalid password';
      return;
    }

    this.authService.resetPassword(this.resetPasswordRequest).subscribe(
      data => {
        if (data) {
          this.toastrService.success('Password has been updated');
          this.router.navigateByUrl('/login');
        } else {
          this.isError = true;
          this.errorMessage = 'Unable to update password. Please try again.';
        }
      },
      err => { 
        this.isError = true;
        this.errorMessage = 'Unable to update password. Please try again.';
      }
    );
  }
}

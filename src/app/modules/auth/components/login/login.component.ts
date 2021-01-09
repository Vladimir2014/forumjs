import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services//auth.service';
import { LoginRequestPayload } from '../../models/login.request.payload';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginRequestPayload: LoginRequestPayload;
  registerSuccessMessage: string = '';
  isError: boolean;
  invalidInput: boolean;

  constructor(private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private toastrService: ToastrService) {
    this.loginRequestPayload = {
      username: '',
      password: ''
    };
   }

  ngOnInit(): void {
      this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.activatedRoute
    .queryParams.subscribe(params => {
      if (params.registered !== undefined && params.registered === 'true') {
        this.toastrService.success('Signup Successful');
        this.registerSuccessMessage = 'Please check your inbox for activation link. '
        + ' You must activate your account before login'; 
      }
    })
  }

  login() {

    if (this.loginForm.get('username').valid && this.loginForm.get('password').valid) {
      this.invalidInput = false;
      this.loginRequestPayload.username = this.loginForm.get('username').value;
      this.loginRequestPayload.password = this.loginForm.get('password').value;
    
      this.authService.login(this.loginRequestPayload).subscribe(
        data => {
          if (data) {
            this.isError = false;
            this.router.navigateByUrl('/');
          } else {
            this.isError = true;
          }
        },
        err => { 
          this.isError = true;
        }
      );
    } else {
      this.invalidInput = true;
    }
  }

}

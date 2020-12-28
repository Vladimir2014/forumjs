import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UserService } from 'src/modules/auth/services';

@Component({
    selector: 'sb-top-nav-user',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav-user.component.html',
    styleUrls: ['top-nav-user.component.scss'],
})
export class TopNavUserComponent implements OnInit {
    isLoggedIn: boolean = this.authService.isLoggedIn();

    constructor(public userService: UserService,
                public authService: AuthService,
                public router: Router) {}
    ngOnInit() {
        this.authService.loggedIn.subscribe((data: boolean) => {console.log('logged in: ', data); this.isLoggedIn = data});
    }

    
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('');
  }
}

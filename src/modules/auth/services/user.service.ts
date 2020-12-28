import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { UserProfileComponent } from '../components';

import { User } from '../models';
import { AuthService } from './auth.service';

const userSubject: ReplaySubject<User> = new ReplaySubject(1);

@Injectable()
export class UserService {
    // currentUser:any = {};
    constructor(authService: AuthService) {
        this.user = {
            userName: authService.getUserName(),
        };

        authService.username.subscribe((data: string) => {
            console.log('---', data, this.user); 
        //    this.user.userName = data;
        let u: User = { userName: '' };
        userSubject.next(u);
        
        });
    }

    set user(user: User) {
        userSubject.next(user);
    }

    get user$(): Observable<User> {
        return userSubject.asObservable();
    }
}

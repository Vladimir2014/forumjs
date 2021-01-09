import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { User } from '../models';
import { AuthService } from './auth.service';

const userSubject: ReplaySubject<User> = new ReplaySubject(1);

@Injectable()
export class UserService {
    constructor(authService: AuthService) {
        this.user = {
            userName: authService.getUserName(),
        };

        authService.username.subscribe((username: string) => {
            let u: User = { userName: username };
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

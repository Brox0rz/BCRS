/**
 * Title: auth.service.ts
 * Author: Brock Hemsouvanh
 * Date: 07/19/2024
 * Updated: 07/21/2024 by Brock Hemsouvanh
 * Description: Service for handling authorization and authentication API requests
 */

'use strict';

import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean>;
  private userSubject: BehaviorSubject<{ fullName: string } | null>;

  constructor(private cookieService: CookieService) {
    this.isLoggedInSubject = new BehaviorSubject<boolean>(this.cookieService.check('session_user'));
    const sessionUser = this.cookieService.get('session_user');
    const user = sessionUser ? JSON.parse(sessionUser) : null;
    this.userSubject = new BehaviorSubject<{ fullName: string } | null>(
      user ? { fullName: `${user.firstName} ${user.lastName}` } : null
    );
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  getUser(): Observable<{ fullName: string } | null> {
    return this.userSubject.asObservable();
  }

  loginUser(user: any): void {
    const sessionCookie = {
      _id: user._id,
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      address: user.address,
      isDisabled: user.isDisabled,
      role: user.role,
      selectedSecurityQuestions: user.selectedSecurityQuestions
    };
    this.cookieService.set('session_user', JSON.stringify(sessionCookie), 1);
    this.isLoggedInSubject.next(true);
    this.userSubject.next({ fullName: `${user.firstName} ${user.lastName}` });
  }

  logoutUser(): void {
    this.cookieService.deleteAll();
    this.isLoggedInSubject.next(false);
    this.userSubject.next(null);
  }
}

/**
 * Title: nav.component.ts
 * Author: Professor Krasso and Brock Hemsouvanh
 * Date: 8/5/23
 * Updated: 07/21/2024 by Brock Hemsouvanh
 */

// Import statements
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';

// AppUser interface with fullName property
export interface AppUser {
  fullName: string;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  appUser: AppUser | null = null;
  isSignedIn: boolean = false;

  constructor(private cookieService: CookieService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((loggedIn) => {
      this.isSignedIn = loggedIn;
      console.log('Is Signed In:', this.isSignedIn);
      this.setUserDetails();
    });
  }

  setUserDetails(): void {
    if (this.isSignedIn) {
      const sessionUser = this.cookieService.get('session_user');
      if (sessionUser) {
        const user = JSON.parse(sessionUser);
        this.appUser = { fullName: user.firstName + ' ' + user.lastName };
        console.log('Signed in as', this.appUser.fullName);
      } else {
        console.log('No session user found in cookies.');
      }
    } else {
      this.appUser = null;
      console.log('User is not signed in.');
    }
  }

  signout(): void {
    console.log('Clearing cookies');
    this.cookieService.deleteAll();
    this.isSignedIn = false;
    this.appUser = null;
    this.router.navigate(['/']);
  }

  logDropdownToggle(): void {
    console.log('Dropdown toggle clicked');
  }
}

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

  // Constructor with cookieService, router, and authService dependencies
  constructor(private cookieService: CookieService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((loggedIn) => {
      this.isSignedIn = loggedIn;
      this.setUserDetails();
    });
  }

  // Set the appUser object if the user is signed in
  setUserDetails(): void {
    if (this.isSignedIn) {
      const sessionUser = this.cookieService.get('session_user');
      const sessionName = this.cookieService.get('session_name');
      
      if (sessionUser && sessionName) {
        this.appUser = { fullName: sessionName };
        console.log('Signed in as', this.appUser.fullName);
      }
    }
  }

  // Signout function to clear the session cookie
  signout(): void {
    console.log('Clearing cookies');
    // Delete all cookies
    this.cookieService.deleteAll();
    // Redirect to the home page
    this.router.navigate(['/']);
  }

  // Log function for dropdown toggle
  logDropdownToggle(): void {
    console.log('Dropdown toggle clicked');
  }
}

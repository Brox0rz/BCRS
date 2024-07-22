/**
 * Title: auth.service.ts
 * Author: Brock Hemsouvanh
 * Date: 07/19/2024
 * Updated: 07/19/2024 by Brock Hemsouvanh
 * Description: Service for handling authorization and authentication API requests
 */

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private cookieService: CookieService) {}

  /**
   * Method to check if the user is logged in
   * @returns Observable<boolean> - True if the user is logged in, otherwise false
   */
  isLoggedIn(): Observable<boolean> {
    // Check if the 'session_user' cookie is present
    return of(this.cookieService.check('session_user'));
  }

  /**
   * Method to get the logged-in user's details
   * @returns Observable<{ fullName: string } | null> - The user's details if logged in, otherwise null
   */
  getUser(): Observable<{ fullName: string } | null> {
    // Get the 'session_name' cookie value
    const sessionName = this.cookieService.get('session_name');
    return of(sessionName ? { fullName: sessionName } : null);
  }
}

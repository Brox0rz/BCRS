/**
 * Title: signin.component.ts
 * Author: Brock Hemsouvanh
 * Date: 07/07/2024
 * Updated: 7/21/2024 by Brock Hemsouvanh
 * Code attribution: 
 * This component was developed with reference to Angular's Reactive Forms documentation:
 * https://angular.io/guide/reactive-forms
 * and the ngx-cookie-service documentation:
 * https://www.npmjs.com/package/ngx-cookie-service
 */

import { Component } from '@angular/core';
import { SecurityService } from 'src/app/security.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent {
  errMessage: string = '';
  isLoading: boolean = false;
  fieldTextType: boolean = false; 
  signinForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private cookieService: CookieService, 
    private secService: SecurityService, 
    private route: ActivatedRoute
  ) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]]
    });
    this.errMessage = '';
  }

  signIn(): void {
    if (this.signinForm.valid) {
      // Spinner
      this.isLoading = true;

      const { email, password } = this.signinForm.value;

      // If email and password fields are empty, display error message
      if (!email) {
        this.errMessage = 'Please provide your email address';
        this.isLoading = false;
        return;
      }
      if (!password) {
        this.errMessage = 'Please provide your password';
        this.isLoading = false;
        return;
      }
      // Call signin function from security service
      this.secService.signin(email, password).subscribe({
        // If successful, set session_user cookie and redirect user to logged in homepage
        next: (user: any) => {
          console.log('user', user);
          // Create the sessionCookie object 
          const sessionCookie = {
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
          // Set session user 
          this.cookieService.set('session_user', JSON.stringify(sessionCookie), 1);

          // Check if there is a return URL, if not redirect to home page
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
          // Set is loading to false when logged in 
          this.isLoading = false;
          // Redirect user to the returnURL 
          this.router.navigate([returnUrl]);
        },
        error: (err) => {
          this.isLoading = false;

          console.log('err', err);
          if (err.error.status === 400) {
            this.errMessage = 'Invalid email and/or password. Please try again.'
            return;
          }
        }
      });
    }
  }

  toggleFieldTextType(): void {
    this.fieldTextType = !this.fieldTextType;
  }
}

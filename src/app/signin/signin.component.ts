/**
 * Title: signin.component.ts
 * Author: Brock Hemsouvanh
 * Date: 07/07/2024
 * 
 * Code attribution: 
 * This component was developed with reference to Angular's Reactive Forms documentation:
 * https://angular.io/guide/reactive-forms
 * and the ngx-cookie-service documentation:
 * https://www.npmjs.com/package/ngx-cookie-service
 */

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  signinForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.signinForm.valid) {
      const { email, password } = this.signinForm.value;
// add credentials
      this.cookieService.set('email', email);
      this.cookieService.set('role', 'user'); // Set the user's role here (e.g., 'admin' for admin users)
      this.router.navigate(['/home']); // Redirect to the home page after successful sign-in
    }
  }
}

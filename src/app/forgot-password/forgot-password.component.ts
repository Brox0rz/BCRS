/**
 * Title: forgot-password.component.ts
 * Author: Brock Hemsouvanh
 * Date: 07/12/2024
 * Description: Forgot Password Component for handling password reset requests
 */

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = ''; // Variable to hold the email input from the user
  successMessage: string = ''; // Variable to hold success message
  errorMessage: string = ''; // Variable to hold error message

  constructor(private http: HttpClient) {}

  // Method to handle form submission
  onSubmit() {
    const payload = { email: this.email };

    // Sending the password reset request to the backend API
    this.http.post('http://localhost:3000/api/security/users/reset-password', payload)
      .subscribe(response => {
        console.log('Password reset link sent to email.');
        this.successMessage = 'Password reset link sent to your email.';
        this.errorMessage = ''; // Clear any previous error message
      }, error => {
        console.error('Error sending password reset link', error);
        this.errorMessage = 'Error sending password reset link. Please try again.';
        this.successMessage = ''; // Clear any previous success message
      });
  }
}

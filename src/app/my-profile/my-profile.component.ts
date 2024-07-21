/**
 * Title: my-profile.component.ts
 * Author: Professor Richard Krasso and Brock Hemsouvanh
 * Date: 07/18/2024
 * Updated: 07/19/2024 by Brock Hemsouvanh
 * Description: Component for managing the user's profile
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  profileForm: FormGroup;
  employee: any = {};
  errorMessage: string = ''; // Initialize with an empty string
  successMessage: string = ''; // Initialize with an empty string

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private cookieService: CookieService
  ) {
    // Initialize the profile form with validators
    this.profileForm = this.fb.group({
      address: [null, Validators.required],
      phoneNumber: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    const email = this.cookieService.get('session_user'); // Get email from cookie
    // Fetch the employee details by email
    this.employeeService.getEmployeeByEmail(email).subscribe(
      data => {
        this.employee = data;
        // Populate the form with fetched employee data
        this.profileForm.patchValue({
          address: this.employee.address,
          phoneNumber: this.employee.phoneNumber
        });
      },
      err => this.errorMessage = err.error.message // Handle error
    );
  }

  // Method to save changes made to the profile
  saveChanges(): void {
    if (this.profileForm.valid) {
      const { address, phoneNumber } = this.profileForm.value;
      // Call the service to update employee profile
      this.employeeService.updateEmployeeProfile(this.employee.email, address, phoneNumber).subscribe(
        res => this.successMessage = 'Profile updated successfully!', // Handle success
        err => this.errorMessage = err.error.message // Handle error
      );
    }
  }
}

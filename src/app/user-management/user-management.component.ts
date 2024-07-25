/**
 * Title: user-management.component.ts
 * Author: Brock Hemsouvanh
 * Date: 07/24/2024
 * Description: User management component for managing users
 */

'use strict';

import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service'; // Import EmployeeService
import { User } from '../models/user.model'; // Import the User model

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: User[] = []; // Array to store user data

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    console.log('UserManagementComponent initialized');
    this.loadUsers();
  }

  // Method to load all users from the API
  loadUsers(): void {
    this.employeeService.getAllUsers().subscribe(
      (data: User[]) => {
        this.users = data;
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  // Method to handle user editing
  editUser(user: User): void {
    // Placeholder for edit functionality
    console.log('Edit user:', user);
  }

  // Method to handle user deletion
  deleteUser(userId: string): void {
    this.employeeService.deleteUser(userId).subscribe(
      (response: any) => {
        console.log('User deleted:', response);
        this.loadUsers(); // Reload users after deletion
      },
      (error: any) => {
        console.error('Error deleting user:', error);
      }
    );
  }
}

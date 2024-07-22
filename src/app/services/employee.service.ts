/**
 * Title: employee.service.ts
 * Author: Brock Hemsouvanh
 * Date: 07/18/2024
 * Updated: 07/21/2024 by Brock Hemsouvanh
 * Description: Service for handling employee-related API requests
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }

  /**
   * Method to get employee details by ID
   * @param id - The ID of the employee
   * @returns Observable<any> - The employee details
   */
  getEmployeeById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  /**
   * Method to update employee profile details by email
   * @param email - The email of the employee
   * @param address - The new address of the employee
   * @param phoneNumber - The new phone number of the employee
   * @returns Observable<any> - The response from the API
   */
  updateEmployeeProfile(email: string, address: string, phoneNumber: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile/${email}/update-profile`, { address, phoneNumber });
  }

  /**
   * Method to get employee details by email
   * @param email - The email of the employee
   * @returns Observable<any> - The employee details
   */
  getEmployeeByEmail(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile/${email}`);
  }
}

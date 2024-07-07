/**
 * Title: role.guard.ts
 * Author: Brock Hemsouvanh
 * Date: 07/06/2024
 * 
 * This code was developed with reference to the Angular documentation on Injectables:
 * https://v17.angular.io/api/core/Injectable
 * 
 * Description: 
 * RoleGuard service to protect routes based on user roles.
 */

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

/**
 * RoleGuard service to protect routes based on user roles.
 */
@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  /**
   * Constructor to inject dependencies.
   * @param router - Router to navigate if the user is not authorized.
   * @param cookieService - Service to handle cookies.
   */
  constructor(private router: Router, private cookieService: CookieService) { }

  /**
   * Method to check if the route can be activated based on user role.
   * @param route - The activated route snapshot.
   * @param state - The router state snapshot.
   * @returns boolean - Returns true if the user has the 'admin' role, otherwise navigates to 'not-authorized' page and returns false.
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Get the user role from the cookies.
    const userRole = this.cookieService.get('role');

    // Check if the user role is 'admin'.
    if (userRole && userRole === 'admin') {
      return true; // Allow access to the route.
    } else {
      this.router.navigate(['/not-authorized']); // Navigate to 'not-authorized' page if the user is not an admin.
      return false; // Deny access to the route.
    }
  }
}

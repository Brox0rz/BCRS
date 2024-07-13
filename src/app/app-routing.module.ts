/**
 * Title: app-routing.module.ts
 * Author: Professor Krasso and Brock Hemsouvanh
 * Date: 07/04/24
 * Updated: 07/13/2024 by Brock Hemsouvanh
 */

// imports statements
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { SigninComponent } from './signin/signin.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterComponent } from './security/register/register.component';
import { EmployeeDirectoryComponent } from './employee-directory/employee-directory.component'; // Import the component

// routes array with a path, component, and title for each route in the application
const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        title: 'BCRS: Home' // title for the home page
      },
      {
        path: 'home',
        component: HomeComponent,
        data: { hideNavbar: true },
        title: 'BCRS: Home'
      },
      {
        path: 'signin',
        component: SigninComponent,
        title: 'BCRS: Sign In'
      },
      {
        path: 'register',
        component: RegisterComponent,
        title: 'BCRS: Register'
      },
      {
        path: 'admin',
        component: AdminComponent,
        title: 'BCRS: Admin' // title for the admin page
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        title: 'BCRS: Forgot Password'
      },
      {
        path: 'employee-directory', // Add the route
        component: EmployeeDirectoryComponent,
        title: 'BCRS: Employee Directory'
      },
    ]
  },
  {
    path: '**',
    component: NotFoundPageComponent, // Route for 404 Not Found page
    title: 'BCRS: 404 Not Found'
  }
];

@NgModule({
  // imports the RouterModule and defines the routes array and other options
  imports: [RouterModule.forRoot(routes, { 
    useHash: true, 
    enableTracing: false, 
    scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

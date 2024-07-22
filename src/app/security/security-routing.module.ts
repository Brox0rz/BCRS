/**
 * Title: security-routing.module.ts
 * Author: Professor Krasso
 * Date: 8/5/23
 * Updated: 07/13/2024 by Brock Hemsouvanh and Phuong Tran
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityComponent } from './security.component';
import { SigninComponent } from '../signin/signin.component';
import { RoleGuard } from './guards/role.guard'; // Importing RoleGuard
import { RegisterComponent } from './register/register.component'; 
// Defining routes for the security module
const routes: Routes = [
  {
    path: '',
    component: SecurityComponent,
    title: 'BCRS: Security',
    canActivate: [RoleGuard] // Adding RoleGuard for the base path
  },
  {
    path: 'signin',
    component: SigninComponent,
    title: 'BCRS: Sign In' // Updated title for the Signin page
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'BCRS: Register' // Updated title for the Signin page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }

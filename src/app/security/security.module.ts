/**
 * Title: security.module.ts
 * Author: Professor Krasso
 * Date: 8/5/23
 * Updated: 07/06/2024 by Brock Hemsouvanh
*/

// imports statements
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityRoutingModule } from './security-routing.module';
import { SecurityComponent } from './security.component';
import { SigninComponent } from './signin/signin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

@NgModule({
  declarations: [
    SecurityComponent, 
    SigninComponent, 
    RegisterComponent, VerifyEmailComponent,
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    HttpClientModule,
    RouterModule,
    HttpClientModule,
    FormBuilder,
    FormGroup,
    Validators,
    FormControl,

  
  ]
})
export class SecurityModule { }

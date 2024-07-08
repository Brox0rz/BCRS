/**
 * Title: security.module.ts
 * Author: Professor Krasso
 * Date: 8/5/23
 * Updated: 07/06/2024 by Brock Hemsouvanh
*/

// imports statements
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityRoutingModule } from './security-routing.module';
import { SecurityComponent } from './security.component';

@NgModule({
  declarations: [
    SecurityComponent
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule
  ]
})
export class SecurityModule { }

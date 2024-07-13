/**
 * Title: app.module.ts
 * Author: Professor Krasso and Brock Hemsouvanh
 * Date: 8/5/23
 * Updated: 07/08/2024 by Brock Hemsouvanh
 */

// imports statements
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './layouts/nav/nav.component';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';

import { FooterComponent } from './layouts/footer/footer.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { AdminComponent } from './admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    FooterComponent,
    NotFoundPageComponent,
    AdminComponent,
    BaseLayoutComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

   
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }

/**
 * Title: invoice-summary.component.ts
 * Author: Brock Hemsouvanh
 * Date: 07/21/2024
 * Description: Invoice Summary component logic for BCRS application
 */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice-summary',
  templateUrl: './invoice-summary.component.html',
  styleUrls: ['./invoice-summary.component.css']
})
export class InvoiceSummaryComponent implements OnInit {
  customerName: string;
  customerEmail: string;
  orderDate: string;
  servicePrice: number;
  partsAmount: number;
  laborAmount: number;
  invoiceTotal: number;

  constructor() {
    this.customerName = 'John Doe';
    this.customerEmail = 'johndoe@example.com';
    this.orderDate = new Date().toISOString().split('T')[0];
    this.servicePrice = 99.99;
    this.partsAmount = 49.99;
    this.laborAmount = 50.00;
    this.invoiceTotal = this.calculateInvoiceTotal();
  }

  ngOnInit(): void {
    // Initialization logic if needed
  }

  calculateInvoiceTotal(): number {
    return this.servicePrice + this.partsAmount + this.laborAmount;
  }

  printInvoice(): void {
    window.print();
  }
}

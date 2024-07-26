/**
 * Title: service-request.component.ts
 * Author: Brock Hemsouvanh
 * Date: 07/21/2024
 * Description: Service Request component logic for BCRS application
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.component.html',
  styleUrls: ['./service-request.component.css']
})
export class ServiceRequestComponent implements OnInit {
  serviceRequestForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.serviceRequestForm = this.fb.group({
      customerFirstName: ['', Validators.required],
      customerLastName: ['', Validators.required],
      customerEmail: ['', [Validators.required, Validators.email]],
      orderDate: ['', Validators.required],
      partsAmount: [0, Validators.min(0)],
      laborAmount: [0, Validators.min(0)]
    });
  }

  ngOnInit(): void {
    // Initialization logic goes here
  }

  onSubmit(): void {
    if (this.serviceRequestForm.valid) {
      console.log('Form Submitted', this.serviceRequestForm.value);
      // Process the form values
    } else {
      console.log('Form is invalid');
    }
  }
}

/*
* Title: register.component.ts
* Author: Professor Krasso
* Date: 10/2023
*/

// Import statements
import { Component, OnInit } from '@angular/core';
import { SecurityService } from 'src/app/security.service';
import { Router } from '@angular/router'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterViewModel } from './register-view-model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // Variables for the register component
  securityQuestions: string[]
  qArr1: string[]
  qArr2: string[]
  qArr3: string[]

  user: RegisterViewModel // User variable
  errorMessage: string // Error message variable

  // Register form group with builder and validators
  registerForm: FormGroup = this.fb.group({
    firstName: [null, Validators.compose([Validators.required])],
    lastName: [null, Validators.compose([Validators.required])],
    email: [null, Validators.compose([Validators.required, Validators.email])],
    password: [null, Validators.compose([Validators.required, Validators.pattern(
      '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[A-Z])[A-Za-z\\d]{8,}$')])],
    question1: [null, Validators.compose([Validators.required])],
    answer1: [null, Validators.compose([Validators.required])],
    question2: [null, Validators.compose([Validators.required])],
    answer2: [null, Validators.compose([Validators.required])],
    question3: [null, Validators.compose([Validators.required])],
    answer3: [null, Validators.compose([Validators.required])],
  })

  // Constructor for the register component that takes in the router, form builder, and security service
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private securityService: SecurityService
  ) {
    // Array of security questions
    this.securityQuestions = [
      "What is your mother's maiden name?",
      "What was the name of your first pet?",
      "What is your favorite color?",
      "What is your favorite movie?",
      "What is your favorite song?"
    ]

    this.qArr1 = this.securityQuestions // Initialize the first array of questions to the security questions array
    this.qArr2 = [] // Initialize the second array of questions to an empty array 
    this.qArr3 = [] // Initialize the third array of questions to an empty array 

    this.user = {} as RegisterViewModel // Initialize the user to an empty object
    this.errorMessage = '' // Initialize the error message to an empty string
  }

  ngOnInit(): void {
    // Subscribe to the value changes of question 1
    this.registerForm.get('question1')?.valueChanges.subscribe(val => {
      console.log("Value changed from question 1", val)
      this.qArr2 = this.qArr1.filter(q => q !== val) // Filter the first array of questions to remove the selected question
    })

    // Subscribe to the value changes of question 2
    this.registerForm.get('question2')?.valueChanges.subscribe(val => {
      console.log('Value changed from question 2', val)
      this.qArr3 = this.qArr2.filter(q => q !== val) // Filter the second array of questions to remove the selected question
    })
  }

  // Register function that takes in no parameters and returns nothing 
  // This function registers a new user and navigates to the signin page
  register() {
    // Set the user object to the values of the register form 
    this.user = {
      firstName: this.registerForm.get('firstName')?.value,
      lastName: this.registerForm.get('lastName')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      selectedSecurityQuestions: [ 
        {
          questionText: this.registerForm.get('question1')?.value,
          answerText: this.registerForm.get('answer1')?.value
        },
        {
          questionText: this.registerForm.get('question2')?.value,
          answerText: this.registerForm.get('answer2')?.value
        },
        {
          questionText: this.registerForm.get('question3')?.value,
          answerText: this.registerForm.get('answer3')?.value
        },
      ]
    }
    console.log('Registering new user', this.user) // Log the user object to the console

    // Call the register function from the security service and subscribe to the result
    this.securityService.register(this.user).subscribe({
      next: (result) => {
        console.log('Result from Register API call:', result)
        this.router.navigate(['/security/signin']) // Navigate to the signin page
      },
      error: (err) => {
        if (err.error.message) {
          console.log('db error: ', err.error.message) // Log the error message to the console
          this.errorMessage = err.error.message // Set the error message to the error message from the API
        } else {
          this.errorMessage = 'Something went wrong. Please contact the system administrator';
          console.log(err)
        }
      }
    })
  }
}

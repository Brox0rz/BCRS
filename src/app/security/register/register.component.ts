/*
* Title: register.component.ts
* Author: Professor Krass
* Date: 10/2023
*/

// Import statements
import { Component, OnInit } from '@angular/core';
import { SecurityService } from 'src/app/security.service';
import { Router } from '@angular/router'; 
import { FormBuilder, FormGroup, Validators } from '@angular/router';
import { RegisterViewModel } from './register-view-model';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // variables for the register component
  securityQuestions: string[]
  qArr1: string[]
  qArr2: string[]
  qArr3: string[]

  user: RegisterViewModel //user variable
  errorMessage: string // error message variable

  // register form group with builder and validators
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
    question4: [null, Validators.compose([Validators.required])],
    answer4: [null, Validators.compose([Validators.required])],
    question5: [null, Validators.compose([Validators.required])],
    answer5: [null, Validators.compose([Validators.required])],
  })
// constructor for the register component that takes in the router, form builder, cookie service, and security service
constructor(
    private router: Router,
    private fb: FormBuilder,
    private securityService: SecurityService
) {
  // array of security questions
  this.securityQuestions = [
    "What is your mother's maiden name?",
    "What is the name of your first 's pet?",
    "What is your favorite color?",
    "What is your favorite movie?",
    "What is your favorite song?"
  ]

  this.qArr1 = this.securityQuestions // initialize the first array of questions to the security questions array
  this.qArr2 = [] //initialize the second way of questions to an empty array 
  this.qArr3 = [] //initialize the second way of questions to an empty array 

  this.user = {} as RegisterViewModel // Initialize the user to an empty object
  this.errorMessage = '' // initialize the error message to an empty string
}

ngOnInit(): void {
  // subscribe to the value charges of question 1
  this.registerForm.get('question')?.valueChanges.subscribe(val => {
    console.log("Value changed from question 1", val)
    this.qArr2 = this.qArr1.filter(q => q !== val) // filter the first array of questions to remove the selected question
  })

  // subscribe to the value changes of question 1
  this.registerForm.get('question1')?.valueChanges.subscribe(val => {
    console.log('Value changed from question 2', val)
    this.qArr3 = this.qArr2.filter(q => q !== val)
 })
}
//register function that takes in no parameters and returns nothing 
// this function registers a new user and navigate to the signin page
register() {
  //set the employee object to the values of the register form 
  this.user = {
    firstName: this.registerForm.get('firstName')?.value,
    lastName: this.registerForm.get('lastName')?.value,
    email: this.registerForm.get('email')?.value,
    password: this.registerForm.get('password')?.value,
    selectSecurityQuestions: [ 
      {
      question: this.registerForm.get('question1')?.value,
      answer: this.registerForm.get('answer1')?.value
      },
      {
      question: this.registerForm.get('question2')?.value,
      answer: this.registerForm.get('answer2')?.value
      },
      {
        question: this.registerForm.get('question3')?.value,
        answer: this.registerForm.get('answer3')?.value
      },
      {
        question: this.registerForm.get('question4')?.value,
        answer: this.registerForm.get('answer4')?.value
      },
      {
        question: this.registerForm.get('question5')?.value,
        answer: this.registerForm.get('answer5')?.value
      },
    ]
  }
  console.log('Registering new user', this.user) // log the employee object to the console

  // call the register function from the security and subscribe to the result
  this.securityService.register(this.user).subscribe({
    next: (result) => {
      console.log('Result from Register API call:', result)
      this.router.navigate(['/security/signin']) // navigate to the signin page
    },
    error: (err) => {
      if (err.error.message) {
        console.log('db error: ', err.error.errorMessage) // log the erroor mesage to the console
        this.errorMessage = err.error.message // set the error message to the error message form the API
      } else {
        this.errorMessage = 'Something went wrong. Please contact the system adminitrator';
        console.log(err)
      }
    }
  })
 }
}


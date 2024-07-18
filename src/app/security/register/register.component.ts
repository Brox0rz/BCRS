/**
 * Title: register.component.ts
 * Author: Professor Krasso
 * Date: 10/2023
 */

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
  // variables for the register component
  securityQuestions: string[];
  qArr1: string[];
  qArr2: string[];
  qArr3: string[];
  qArr4: string[];
  qArr5: string[];

  user: RegisterViewModel; //user variable
  errorMessage: string; // error message variable

  // register form group with builder and validators
  registerForm: FormGroup;

  // constructor for the register component that takes in the router, form builder, and security service
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private securityService: SecurityService
  ) {
    // array of security questions
    this.securityQuestions = [
      "What is your mother's maiden name?",
      "What is the name of your first pet?",
      "What is your favorite color?",
      "What is your favorite movie?",
      "What is your favorite song?"
    ];

    this.qArr1 = this.securityQuestions; // initialize the first array of questions to the security questions array
    this.qArr2 = []; //initialize the second array of questions to an empty array 
    this.qArr3 = []; //initialize the third array of questions to an empty array 
    this.qArr4 = []; //initialize the fourth array of questions to an empty array 
    this.qArr5 = []; //initialize the fifth array of questions to an empty array 

    this.user = {} as RegisterViewModel; // Initialize the user to an empty object
    this.errorMessage = ''; // initialize the error message to an empty string

    this.registerForm = this.fb.group({
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
    });
  }

  ngOnInit(): void {
    // subscribe to the value changes of question 1
    this.registerForm.get('question1')?.valueChanges.subscribe(val => {
      console.log("Value changed from question 1", val);
      this.qArr2 = this.qArr1.filter(q => q !== val); // filter the first array of questions to remove the selected question
    });

    // subscribe to the value changes of question 2
    this.registerForm.get('question2')?.valueChanges.subscribe(val => {
      console.log('Value changed from question 2', val);
      this.qArr3 = this.qArr2.filter(q => q !== val);
    });

    // subscribe to the value changes of question 3
    this.registerForm.get('question3')?.valueChanges.subscribe(val => {
      console.log('Value changed from question 3', val);
      this.qArr4 = this.qArr3.filter(q => q !== val);
    });

    // subscribe to the value changes of question 4
    this.registerForm.get('question4')?.valueChanges.subscribe(val => {
      console.log('Value changed from question 4', val);
      this.qArr5 = this.qArr4.filter(q => q !== val);
    });
  }

  //register function that takes in no parameters and returns nothing 
  // this function registers a new user and navigate to the signin page
  register() {
    //set the user object to the values of the register form 
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
        {
          questionText: this.registerForm.get('question4')?.value,
          answerText: this.registerForm.get('answer4')?.value
        },
        {
          questionText: this.registerForm.get('question5')?.value,
          answerText: this.registerForm.get('answer5')?.value
        }
      ]
    };
    console.log('Registering new user', this.user); // log the employee object to the console

    // call the register function from the security service and subscribe to the result
    this.securityService.register(this.user).subscribe({
      next: (result) => {
        console.log('Result from Register API call:', result);
        this.router.navigate(['/security/signin']); // navigate to the signin page
      },
      error: (err) => {
        if (err.error.message) {
          console.log('db error: ', err.error.message); // log the error message to the console
          this.errorMessage = err.error.message; // set the error message to the error message from the API
        } else {
          this.errorMessage = 'Something went wrong. Please contact the system administrator';
          console.log(err);
        }
      }
    });
  }
}

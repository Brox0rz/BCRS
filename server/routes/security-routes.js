/**
 * Title: security-routes.js
 * Author: Professor Richard Krasso and Brock Hemsouvanh
 * Date: 7/05/24
 * Updated: 7/08/24 by Brock Hemsouvanh, Phuong Tran
 * Description: Route for handling user API requests
 */

'use strict';

// Imports
const express = require('express');
const { mongo } = require('../utils/mongo');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const Ajv  = require('ajv');

const router = express.Router();
const saltRounds = 10;
const ajvInstance = new Ajv();

const registerSchema = {
    type: 'object',
    properties: { 
                  firstName: { type: 'string' },
                  lastName: { type: 'string' },
                  email: { type: 'string' },
                  password: { type: 'string' },
                  address: { type: 'string' },
                  phoneNumber: { type: 'string' },
                  role: { type: 'string' },
                  isDisabled: { type: 'boolean'},
                  selectedSecurityQuestions: securityQuestionSchema
                },
                  required: ['firstName', 'lastName', 'email', 'password', 'address', 'phoneNumber', 'selectedSecurityQuestions'],
                  additionalProperties: false
  };
  
  const signInSchema = {
    type: 'object',
    properties: {
      email: {
        type: 'string'
      },
      password: {
        type: 'string'
      }
    },
    required: [ 'email', 'password'],
    additionalProperties: false
  }
  
  // Routes
/**
 * user Register
 * @openapi
 * /api/security/register:
 *   post:
 *     tags:
 *      - Security
 *     description: API for creating new employees
 *     summary: User Registration
 *     requestBody:
 *       description: User Information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - emailAddress
 *               - password
 *               - phoneNumber
 *               - address
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phoneNumber:
 *                 type: number
 *               address:
 *                 type: string
 *               selectedSecurityQuestions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     question:
 *                       type: string
 *                     answer:
 *                       type: string
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad request
 *       '409':
 *         description: User already exists
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post('/register', (req, res, next) => {
    try {
      console.log('Creating a new user...');
  
      // Get the user information from the request body
      const user = req.body;
  
      console.log(user);
  
      // Validate the employee data against the registerSchema
      const validate = ajvInstance.compile(registerSchema);
      const valid = validate(user);
  
      // If the employee object is not valid; then return a status code 400 with message 'Bad request'
      if(!valid) {
        console.error('User object does not match the registerSchema: ', validate.errors);
        return next(createError(400, `Bad request: ${validate.errors}`));
      }
  
      // Encrypt the employee's password using bcrypt
      user.password = bcrypt.hashSync(user.password, saltRounds);
  
      // Make phoneNumber number input into a number
      user.phoneNumber = Number(user.phoneNumber);
  
      // Call mongo and create the new user
      mongo(async db => {
  
        console.log("Checking if the employee email exists in the database...");
        // Get all the users from the database and sort them by the userId
        const users = await db.collection('users')
        .find()
        .sort({ userId: 1 }).
        toArray();
  
        // Check if the employee exists already in the database
        const existingUser = users.find(user => user.email === user.email);
  
        // If the employee exists; then throw an error status code 409 with message 'Employee already exists!'
        if (existingUser) {
          console.error('User already exists!');
          return next(createError(409, 'User already exists'));
        }
  
        // Create the new employeeId for the registering user by getting the lastEmployee's employeeId and adding 1 to it
        const lastUser = users[users.length - 1];
        console.log(`lastUserId: ${lastUser.employeeId}\n First name: ${lastUser.firstName}\n Last name: ${lastEmployee.lastName}`);
  
        const newUserId = lastUser.userId + 1;
        console.log('new userId:' + newUserId);
  
  
        // Create the new user object for standard role
        const newUser = {
          UserId: newUserId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
          phoneNumber: user.phoneNumber,
          address: user.address,
          isDisabled: false,
          role: 'standard',
          selectedSecurityQuestions: user.selectedSecurityQuestions
        };
  
        // Insert new employee to the employee collection
        const result = await db.collection("users").insertOne(newUser);
        console.log('New User created successfully!');
        res.status(201).send(user);
  
      }, next);
  
    } catch (err) {
      console.error('Error: ', err);
      next(err);
    }
  });
  
  /**
   * user Sign in
   * @openapi
   * /api/security/signin:
   *   post:
   *     tags:
   *      - Security
   *     description: API for signing in users
   *     summary: User Sign in
   *     requestBody:
   *       description: User Information
   *       content:
   *         application/json:
   *           schema:
   *             required:
   *               - email
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       '201':
   *         description: User Sign In Successfully
   *       '400':
   *         description: Bad request
   *       '401':
   *         description: Invalid Credentials
   *       '500':
   *         description: Server Exception
   *       '501':
   *         description: MongoDB Exception
   */

  router.post('/signin', (req, res, next) => {
    try {
  
      console.log("User singing in...");
      // Get the email address and password from the request body
      const signIn = req.body;
  
      // Validate the sign in data against the singInSchema
      const validate = ajvInstance.compile(signInSchema);
      const valid = validate(signIn);
  
      // If the singIn object is not valid; then return a 400 status code with message 'Bad request'
      if(!valid) {
        console.error('Error validating the singIn data with the signInSchema!');
        console.log('signin validation error: ', validate.errors);
        return next(createError(400, `Bad request: ${validate.errors}`));
      }
  
      // Call mongo and log in employee
      mongo(async db => {
        console.log("Looking up the user...");
        // Find the employee
        const user = await db.collection("users").findOne({
          email: signIn.email
        });
  
        // If the employee is found; Then compare password passed in from the body with the password in the database
        if (user) {
          console.log("User found!");
          console.log("Comparing passwords...");
          // Compare the password
          let passwordIsValid = bcrypt.compareSync(signIn.password, user.password);
  
          // Else if the password doesn't match; then return status code 400 with message "Invalid credentials"
          if (!passwordIsValid) {
            console.error('Invalid password!');
            return next(createError(401, "Unauthorized"));
          }
          // If the password matches; then return status code 200 with message "Employee sign in"
          console.log("Password matches!");
          res.send(user);
        }
      }, next);
  
      // Catch any Database errors
    } catch (err) {
      console.error("Error: ", err);
      next(err);
    }
  });
  
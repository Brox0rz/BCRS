/**
 * Title: user-route.js
 * Author: Professor Richard Krasso and Brock Hemsouvanh
 * Date: 7/05/24
 * Updated: 07/12/2024 by Brock Hemsouvanh
 * Description: Routes for handling user-related API requests
 */

"use strict";

const express = require("express");
const { mongo } = require("../utils/mongo");
const createError = require("http-errors");
const { ObjectId } = require('mongodb');
const Ajv = require('ajv');
const ajv = new Ajv(); // create a new instance of the Ajv object from the npm package

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - firstName
 *         - lastName
 *         - phoneNumber
 *         - address
 *       properties:
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *         firstName:
 *           type: string
 *           description: The user's first name
 *         lastName:
 *           type: string
 *           description: The user's last name
 *         phoneNumber:
 *           type: string
 *           description: The user's phone number
 *         address:
 *           type: string
 *           description: The user's address
 *         isDisabled:
 *           type: boolean
 *           description: Whether the user is disabled
 *         role:
 *           type: string
 *           enum: [standard, admin]
 *           description: The user's role
 *         selectedSecurityQuestions:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               questionText:
 *                 type: string
 *                 description: The text of the security question
 *               answerText:
 *                 type: string
 *                 description: The answer to the security question
 *       example:
 *         email: "jimbob@bcrs.com"
 *         password: "SecurePassword123"
 *         firstName: "James"
 *         lastName: "Robert"
 *         phoneNumber: "123-456-7890"
 *         address: "456 Tech Lane, Urban City, USA"
 *         isDisabled: false
 *         role: "admin"
 *         selectedSecurityQuestions:
 *           - questionText: "What is your mother's maiden name?"
 *             answerText: "Smith"
 *           - questionText: "What was your first pet's name?"
 *             answerText: "Rover"
 *           - questionText: "What is your favorite color?"
 *             answerText: "Blue"
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.post("/", async (req, res) => {
  console.log("Let's create a new user!");
  try {
    console.log(`email: ${req.body.email}`);

    const newUser = {
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      isDisabled: req.body.isDisabled || false,
      role: req.body.role || 'standard',
      selectedSecurityQuestions: req.body.selectedSecurityQuestions
    };

    mongo(async (db) => {
      const result = await db.collection("users").insertOne(newUser);

      res.status(201).send({ User: newUser });
    });
  } catch (e) {
    console.log(e);
    if (e.name === 'ValidationError') {
      res.status(400).send({
        message: `Bad Request: ${e.message}`,
      });
    } else if (e.name === 'NotFoundError') {
      res.status(404).send({
        message: `Not Found: ${e.message}`,
      });
    } else {
      res.status(500).send({
        message: `Internal Server Error: ${e.message}`,
      });
    }
  }
});

/**
 * @swagger
 * /api/users/{userId}:
 *   delete:
 *     summary: Disable a user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to disable
 *     responses:
 *       204:
 *         description: User disabled successfully
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.delete("/:userId", async (req, res) => {
  console.log("Deleting user...");
  try {
    // Validate the userId parameter
    const userId = req.params.userId;
    if (!ObjectId.isValid(userId)) {
      return res.status(400).send({ message: "Bad Request: Invalid userId" });
    }

    mongo(async (db) => {
      // "Delete" the user document by setting isDisabled to true
      const result = await db.collection("users").updateOne(
        { _id: new ObjectId(userId) },
        { $set: { isDisabled: true } } // User is not actually deleted, but updated to disabled status.
      );

      if (result.matchedCount === 0) {
        return res.status(404).send({ message: "Not Found: User not found" });
      }

      // Send a 204 No Content response if the update was successful
      res.status(204).send();
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Internal Server Error: ${e.message}`,
    });
  }
});

/**
 * @swagger
 * /api/users:
 *  get:
 *    summary: Find all users
 *    tags: [User]
 *    responses: 
 *      200: 
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *      400: 
 *         description: Bad Request
 *      404: 
 *         description: Not Found
 *      500: 
 *         description: Internal Server Error
 */

// findAllUsers
router.get('/users', (req, res, next) => {
  try {
    mongo(async db => {
      const users = await db.collection('users').find(
        {},
        { projection: { userId: 1, firstName: 1, lastName: 1, email: 1, role: 1 } },
      )
      .sort({ userId: 1}) // sorts the results by userId ascending (1) or descending (-1)
      .toArray(); // convert the results to an array

      console.log('users', users);

      res.send(users);
    }, next);
  } catch (err) {
    console.log('err', err);
    next(err);
  }
});

/**
 * @swagger
 * /api/users/{userId}:
 *  get:
 *    summary: Find User By Id
 *    tags: [User]
 *    parameters:
 *      - name: userId
 *        in: path
 *        required: true
 *        description: ID of user to retrieve
 *        schema: 
 *          type: string
 *    responses: 
 *      200: 
 *         description: User successfully found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *      400:
 *         description: Bad Request
 *      404: 
 *         description: Not Found
 *      500: 
 *         description: Internal Server Error
 */

// findUserById
router.get('/:userId', (req, res, next) => {
  try {
    let { userId } = req.params; // user Id
    userId = new ObjectId(userId);

    mongo(async db => {
      // find user by userId
      const user = await db.collection('users').findOne(
        { _id: userId }, 
        { projection: { userId: 1, firstName: 1, lastName: 1, email: 1, role: 1 } },
      );

      if (!user) {
        // if the user is not found
        const err = new Error('Unable to find user with userId ' + userId);
        err.status = 404;
        console.log('err', err);
        next(err);
        return;
      }

      res.send(user);
    }, next);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

/**
 * @swagger
 * /api/users/{userId}:
 *   put:
 *     tags: [User]
 *     description: API for updating a user's data
 *     summary: Update a user
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: The User ID requested by the user.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updating data request
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - role
 *               - isDisabled
 *             properties:
 *               role:
 *                 type: string
 *               isDisabled:
 *                 type: boolean
 *     responses:
 *       204:
 *         description: User updated successfully
 *       400:
 *         description: Bad Request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Database Error
 */
router.put('/:userId', (req, res, next) => {
  try {
    let { userId } = req.params;
    userId = new ObjectId(userId);

    mongo(async db => {
      const result = await db.collection('users').updateOne(
        { _id: userId },
        { $set: req.body }
      );

      if (result.matchedCount === 0) {
        const err = new Error('Unable to find user with userId ' + userId);
        err.status = 404;
        console.log('err', err);
        next(err);
        return;
      }

      res.status(204).send();
    }, next);
  } catch (err) {
    console.log('err', err);
    next(err);
  }
});

module.exports = router;

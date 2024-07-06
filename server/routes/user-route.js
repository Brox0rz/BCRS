/**
 * Title: user-route.js
 * Author: Professor Richard Krasso and Brock Hemsouvanh
 * Date: 7/05/24
 * Updated: 7/05/24 by Brock Hemsouvanh
 * Description: Route for handling user API requests
 */

"use strict";

const express = require("express");
const { mongo } = require("../utils/mongo");
const createError = require("http-errors");
const Ajv = require('ajv');
const { ObjectId } = require('mongodb');
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
  console.log("Let's post something!");
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


module.exports = router;  // end module.exports = router

/**
 * Title: security-route.js
 * Author: Professor Richard Krasso and Brock Hemsouvanh
 * Date: 7/10/24
 * Description: Routes for handling security-related API requests
 */

"use strict";

const express = require("express");
const { mongo } = require("../utils/mongo");

const router = express.Router();

/**
 * @swagger
 * /api/security/verify/users/{email}/security-questions:
 *   post:
 *     summary: Verify user's security questions
 *     tags: [Security]
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               selectedSecurityQuestions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionText:
 *                       type: string
 *                     answerText:
 *                       type: string
 *     responses:
 *       200:
 *         description: Security questions verified successfully
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.post("/verify/users/:email/security-questions", async (req, res) => {
  try {
    const { email } = req.params; // Extract email from the request parameters
    const { selectedSecurityQuestions } = req.body; // Extract security questions from the request body

    // Validate the input
    if (!email || !selectedSecurityQuestions || !Array.isArray(selectedSecurityQuestions)) {
      return res.status(400).send({ message: "Bad Request: Invalid input" });
    }

    // Connect to the database
    mongo(async (db) => {
      // Find the user by email
      const user = await db.collection("users").findOne({ email });

      // If the user is not found, return a 404 error
      if (!user) {
        return res.status(404).send({ message: "Not Found: User not found" });
      }

      // Verify that the provided security questions and answers match the user's stored questions and answers
      const isVerified = selectedSecurityQuestions.every((question, index) =>
        question.questionText === user.selectedSecurityQuestions[index].questionText &&
        question.answerText === user.selectedSecurityQuestions[index].answerText
      );

      // If the verification fails, return a 400 error
      if (!isVerified) {
        return res.status(400).send({ message: "Bad Request: Security questions do not match" });
      }

      // If verification is successful, return a 200 response
      res.status(200).send({ message: "Security questions verified successfully" });
    });
  } catch (e) {
    // Handle any other errors with a 500 response
    res.status(500).send({ message: `Internal Server Error: ${e.message}` });
  }
});

module.exports = router; // Export the router to be used in other parts of the application

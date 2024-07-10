/**
 * Title: app.js
 * Author: Professor Krasso and Brock Hemsouvanh
 * Date: 07/03/2024
 * Updated: 07/10/2024 by Brock Hemsouvanh
 */
'use strict'

// Import statements
const express = require('express');
const createError = require('http-errors');
const path = require('path');
const userRoute = require("./routes/user-route");
const securityRoute = require("./routes/security-route");
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Create the Express app
const app = express();

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'BCRS API Documentation',
    version: '1.0.0',
    description: 'This is the API documentation for Bob’s Computer Repair Shop',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local server'
    },
  ],
}

// Options for the swagger docs
const options = {
  swaggerDefinition,
  // Path to the API docs
  apis: ['./server/routes/*.js'],
}

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

// Configure the app
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(express.static(path.join(__dirname, '../dist/bcrs'))); // Serve static files from the 'dist/bcrs' directory
app.use('/', express.static(path.join(__dirname, '../dist/bcrs'))); // Serve the Angular app
app.use("/api/users", userRoute); // Route for user-related API endpoints
app.use("/api/security", securityRoute); // Route for security-related API endpoints

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Serve the Swagger API docs

// Catch all other routes and return the Angular app index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/bcrs/index.html'));
});

// Error handler for 404 errors
app.use((req, res, next) => {
  next(createError(404)); // Forward to error handler
})

// Error handler for all other errors
app.use((err, req, res, next) => {
  res.status(err.status || 500); // Set response status code

  // Send response to client in JSON format with a message and stack trace
  res.json({
    type: 'error',
    status: err.status,
    message: err.message,
    stack: req.app.get('env') === 'development' ? err.stack : undefined
  });
})

module.exports = app; // Export the Express application

/**
 * Title: app.js
 * Author: Professor Krasso and Brock Hemsouvanh
 * Date: 07/03/2024
 * Updated: 07/07/2024 by Brock Hemsouvanh
 */
'use strict'

// Require statements
const express = require('express')
const createError = require('http-errors')
const path = require('path')
const userRoute = require("./routes/user-route")
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

// Create the Express app
const app = express()

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
const swaggerSpec = swaggerJsdoc(options)

// Configure the app
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../dist/bcrs')))
app.use('/', express.static(path.join(__dirname, '../dist/bcrs')))
app.use("/api/users", userRoute); // Has to be before the middleware handlers

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Catch all other routes and return the Angular app index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/bcrs/index.html'));
});

// error handler for 404 errors
app.use(function(req, res, next) {
  next(createError(404)) // forward to error handler
})

// error handler for all other errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500) // set response status code

  // send response to client in JSON format with a message and stack trace
  res.json({
    type: 'error',
    status: err.status,
    message: err.message,
    stack: req.app.get('env') === 'development' ? err.stack : undefined
  })
})

module.exports = app // export the Express application

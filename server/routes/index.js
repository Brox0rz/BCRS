/**
 * Title: index.js
 * Author: Brock Hemsouvanh
 * Date: 07/09/2024
 * Description: Aggregates all route modules
 */

'use strict';

const express = require('express');
const router = express.Router();
const userRoute = require('./user-route');
const securityRoute = require('./security-route');

// Use user routes
router.use('/users', userRoute);

// Use security routes
router.use('/security', securityRoute);

module.exports = router;

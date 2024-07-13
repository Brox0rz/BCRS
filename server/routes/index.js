/**
 * Title: index.js
 * Author: Brock Hemsouvanh
 * Date: 07/09/2024
 * Description: Aggregates all route modules
 */

'use strict';

const express = require('express');
const router = express.Router();
const userRoute = require('./user-routes');
const securityRoutes = require('./security-routes');

// Use user routes
router.use('/users', userRoutes);

// Use security routes
router.use('/security', securityRoutes);

module.exports = router;

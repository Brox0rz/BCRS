/**
 * Title: service-routes.js
 * Author: Brock Hemsouvanh
 * Date: 7/18/24
 * Description: Routes for handling service-related API requests
 * This code was developed with reference to the MongoDB aggregation documentation:
 * https://www.mongodb.com/docs/manual/reference/operator/aggregation/unwind/
 */

"use strict";

// Imports
const express = require('express');
const { mongo } = require('../utils/mongo');
const createError = require('http-errors');

const router = express.Router();

/**
 * @swagger
 * /api/invoices/purchases-graph:
 *   get:
 *     summary: Get a summary of purchases by service
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: Purchases summary retrieved successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.get("/purchases-graph", async (req, res) => {
  try {
    // Connect to the database and perform the aggregation
    mongo(async (db) => {
      // Define the aggregation pipeline
      const aggregationPipeline = [
        { $unwind: "$lineItems" }, // Unwind the lineItems array to process each item individually
        {
          $group: {
            _id: "$lineItems.name",
            totalAmount: { $sum: "$lineItems.price" },
            count: { $sum: 1 }
          }
        },
        {
          $project: {
            _id: 0,
            serviceName: "$_id",
            totalAmount: 1,
            count: 1
          }
        }
      ];

      // Perform the aggregation
      const purchasesSummary = await db.collection("invoices").aggregate(aggregationPipeline).toArray();

      // Return the aggregation result
      res.status(200).send(purchasesSummary);
    });
  } catch (e) {
    console.log(e);
    // Handle internal server errors
    res.status(500).send({
      message: `Internal Server Error: ${e.message}`,
    });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();

const ordersController = require("../controllers/orders");

// get all post
router.post("/create", ordersController.createOrder);
router.get("/all", ordersController.allOrders);

module.exports = router;

const express = require("express");
const router = express.Router();
const models = require("../models");

// ==========================
// Customers
// ==========================

/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Get all customers
 *     description: Retrieve a list of all customers with their referral agents
 *     tags:
 *       - Customers
 *     responses:
 *       200:
 *         description: List of customers retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Internal server error
 */
router.get("/customers", async (req, res) => {
  try {
    const customers = await models.Customer.findAll({ include: models.ReferralAgent });
    res.json(customers);
  } catch (err) {
    console.error("❌ Error fetching customers:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @swagger
 * /api/customers:
 *   post:
 *     summary: Create a new customer
 *     description: Create a new customer record
 *     tags:
 *       - Customers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *                 example: "Alex"
 *               phone:
 *                 type: string
 *                 example: "0711111111"
 *               primary_suburb:
 *                 type: string
 *                 example: "Nairobi"
 *               referral_agent_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Customer created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Internal server error
 */
router.post("/customers", async (req, res) => {
  try {
    const { nickname, phone, primary_suburb, referral_agent_id } = req.body;
    const customer = await models.Customer.create({ nickname, phone, primary_suburb, referral_agent_id });
    res.status(201).json(customer);
  } catch (err) {
    console.error("❌ Error creating customer:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ==========================
// Products
// ==========================

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of all products
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: List of products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error
 */
router.get("/products", async (req, res) => {
  try {
    const products = await models.Product.findAll();
    res.json(products);
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product record
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Sugar 1kg"
 *               price:
 *                 type: number
 *                 example: 120
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error
 */
router.post("/products", async (req, res) => {
  try {
    const { name, price } = req.body;
    const product = await models.Product.create({ name, price });
    res.status(201).json(product);
  } catch (err) {
    console.error("❌ Error creating product:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ==========================
// Orders
// ==========================

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     description: Retrieve a list of all orders with related data
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: List of orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Internal server error
 */
router.get("/orders", async (req, res) => {
  try {
    const orders = await models.Order.findAll({
      include: [
        { model: models.Customer },
        { model: models.OrderItem, include: [models.Product] },
        { model: models.Rider },
        { model: models.Darkstore }
      ]
    });
    res.json(orders);
  } catch (err) {
    console.error("❌ Error fetching orders:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     description: Create a new order with items
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: integer
 *                 example: 1
 *               darkstore_id:
 *                 type: integer
 *                 example: 1
 *               rider_id:
 *                 type: integer
 *                 example: 1
 *               total:
 *                 type: number
 *                 example: 420
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product_id:
 *                       type: integer
 *                       example: 1
 *                     quantity:
 *                       type: integer
 *                       example: 1
 *                     price:
 *                       type: number
 *                       example: 120
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       500:
 *         description: Internal server error
 */
router.post("/orders", async (req, res) => {
  try {
    const { customer_id, darkstore_id, rider_id, total, items } = req.body;
    // Create Order
    const order = await models.Order.create({ customer_id, darkstore_id, rider_id, total });
    // Create Items
    if (items && Array.isArray(items)) {
      for (const item of items) {
        await models.OrderItem.create({
          order_id: order.order_id,
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price
        });
      }
    }
    res.status(201).json(order);
  } catch (err) {
    console.error("❌ Error creating order:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
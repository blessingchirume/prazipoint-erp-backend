require("dotenv").config();
const express = require("express");
const cors = require("cors");
const models = require("./models");
const apiRoutes = require("./routes/api");
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Swagger configuration
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ERP API Documentation',
      version: '1.0.0',
      description: 'API documentation for ERP Backend System',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Customer: {
          type: 'object',
          properties: {
            customer_id: { type: 'integer' },
            nickname: { type: 'string' },
            phone: { type: 'string' },
            primary_suburb: { type: 'string' },
            referral_agent_id: { type: 'integer' },
          },
        },
        Product: {
          type: 'object',
          properties: {
            product_id: { type: 'integer' },
            name: { type: 'string' },
            price: { type: 'number' },
          },
        },
        Order: {
          type: 'object',
          properties: {
            order_id: { type: 'integer' },
            customer_id: { type: 'integer' },
            darkstore_id: { type: 'integer' },
            rider_id: { type: 'integer' },
            total: { type: 'number' },
          },
        },
      },
    },
  },
  apis: [path.join(__dirname, './routes/api.js')],
};

const specs = swaggerJsdoc(options);

console.log('✅ Swagger specs generated');
console.log('📍 API docs path:', path.join(__dirname, './routes/api.js'));

// Swagger Documentation - MUST be before other routes
app.use("/api-docs", swaggerUi.serve);
app.get("/api-docs", swaggerUi.setup(specs));

console.log('✅ Swagger UI mounted at /api-docs');

// Root
app.get("/", (req, res) => {
  res.send("🚀 ERP Backend is running with MySQL + Sequelize!");
});

// API routes
app.use("/api", apiRoutes);

// Sync DB
models.sequelize
  .sync()
  .then(() => {
    console.log("✅ Database ready");
  })
  .catch((err) => {
    console.error("❌ Database sync error:", err);
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📚 Swagger docs available at http://localhost:${PORT}/api-docs`);
});
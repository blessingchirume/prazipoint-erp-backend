const sequelize = require("../config/db");

// Import models
const Customer = require("./Customer");
const ReferralAgent = require("./ReferralAgent");
const AccountManager = require("./AccountManager");
const Darkstore = require("./Darkstore");
const Rider = require("./Rider");
const Product = require("./Product");
const DarkstoreStock = require("./DarkstoreStock");
const Order = require("./Order");
const OrderItem = require("./OrderItem");
const OtpConfirmation = require("./OtpConfirmation");
const Commission = require("./Commission");
const Supplier = require("./Supplier");
const SupplierProduct = require("./SupplierProduct");

// Collect models
const models = {
  Customer,
  ReferralAgent,
  AccountManager,
  Darkstore,
  Rider,
  Product,
  DarkstoreStock,
  Order,
  OrderItem,
  OtpConfirmation,
  Commission,
  Supplier,
  SupplierProduct,
  sequelize
};

// =============================
// Define Associations
// =============================

// Customer → ReferralAgent
models.Customer.belongsTo(models.ReferralAgent, { foreignKey: "referral_agent_id" });
models.ReferralAgent.hasMany(models.Customer, { foreignKey: "referral_agent_id" });

// Darkstore → AccountManager
models.Darkstore.belongsTo(models.AccountManager, { foreignKey: "account_manager_id" });
models.AccountManager.hasMany(models.Darkstore, { foreignKey: "account_manager_id" });

// Orders
models.Order.belongsTo(models.Customer, { foreignKey: "customer_id" });
models.Customer.hasMany(models.Order, { foreignKey: "customer_id" });

models.Order.belongsTo(models.Darkstore, { foreignKey: "darkstore_id" });
models.Darkstore.hasMany(models.Order, { foreignKey: "darkstore_id" });

models.Order.belongsTo(models.Rider, { foreignKey: "rider_id" });
models.Rider.hasMany(models.Order, { foreignKey: "rider_id" });

// Order Items
models.Order.hasMany(models.OrderItem, { foreignKey: "order_id" });
models.OrderItem.belongsTo(models.Order, { foreignKey: "order_id" });

models.Product.hasMany(models.OrderItem, { foreignKey: "product_id" });
models.OrderItem.belongsTo(models.Product, { foreignKey: "product_id" });

// OTP Confirmations
models.Order.hasMany(models.OtpConfirmation, { foreignKey: "order_id" });
models.OtpConfirmation.belongsTo(models.Order, { foreignKey: "order_id" });

// Commissions
models.Order.hasOne(models.Commission, { foreignKey: "order_id" });
models.Commission.belongsTo(models.Order, { foreignKey: "order_id" });

// Supplier Products
models.Supplier.hasMany(models.SupplierProduct, { foreignKey: "supplier_id" });
models.SupplierProduct.belongsTo(models.Supplier, { foreignKey: "supplier_id" });

models.Product.hasMany(models.SupplierProduct, { foreignKey: "product_id" });
models.SupplierProduct.belongsTo(models.Product, { foreignKey: "product_id" });

// Darkstore Stock
models.Darkstore.hasMany(models.DarkstoreStock, { foreignKey: "darkstore_id" });
models.DarkstoreStock.belongsTo(models.Darkstore, { foreignKey: "darkstore_id" });

models.Product.hasMany(models.DarkstoreStock, { foreignKey: "product_id" });
models.DarkstoreStock.belongsTo(models.Product, { foreignKey: "product_id" });

// =============================

module.exports = models;

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Customer = require("./Customer");
const Darkstore = require("./Darkstore");
const Rider = require("./Rider");
const OrderItem = require("./OrderItem");
const OtpConfirmation = require("./OtpConfirmation");
const Commission = require("./Commission");

const Order = sequelize.define("Order", {
  order_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  customer_id: { type: DataTypes.INTEGER, allowNull: false },
  darkstore_id: { type: DataTypes.INTEGER },
  rider_id: { type: DataTypes.INTEGER },
  status: { type: DataTypes.STRING, defaultValue: "pending" },
  total_amount: { type: DataTypes.DECIMAL(12, 2), defaultValue: 0 },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: "orders",
  timestamps: false
});



module.exports = Order;
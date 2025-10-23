const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Order = require("./Order");

const Commission = sequelize.define("Commission", {
  commission_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  order_id: { type: DataTypes.INTEGER, allowNull: false },
  rider_commission: { type: DataTypes.DECIMAL(12, 2), defaultValue: 0 },
  referral_commission: { type: DataTypes.DECIMAL(12, 2), defaultValue: 0 },
  account_manager_commission: { type: DataTypes.DECIMAL(12, 2), defaultValue: 0 },
  company_overhead: { type: DataTypes.DECIMAL(12, 2), defaultValue: 0 },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: "commissions",
  timestamps: false
});



module.exports = Commission;
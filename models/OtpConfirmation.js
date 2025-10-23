const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Order = require("./Order");

const OtpConfirmation = sequelize.define("OtpConfirmation", {
  otp_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  order_id: { type: DataTypes.INTEGER, allowNull: false },
  otp_code: { type: DataTypes.STRING(10), allowNull: false },
  stage: { type: DataTypes.STRING, allowNull: false },
  verified: { type: DataTypes.BOOLEAN, defaultValue: false },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: "otp_confirmations",
  timestamps: false
});


module.exports = OtpConfirmation;
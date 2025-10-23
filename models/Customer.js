const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Customer = sequelize.define("Customer", {
  customer_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nickname: {
    type: DataTypes.STRING
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  primary_suburb: {
    type: DataTypes.STRING
  },
  referral_agent_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: "customers",
  timestamps: false
});

module.exports = Customer;

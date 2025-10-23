const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const AccountManager = sequelize.define("AccountManager", {
  manager_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, unique: true, allowNull: false },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: "account_managers",
  timestamps: false
});

module.exports = AccountManager;
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const AccountManager = require("./AccountManager");

const Darkstore = sequelize.define("Darkstore", {
  darkstore_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  owner: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  latitude: { type: DataTypes.DOUBLE },
  longitude: { type: DataTypes.DOUBLE },
  float_balance: { type: DataTypes.DECIMAL(12, 2), defaultValue: 0 },
  account_manager_id: { type: DataTypes.INTEGER },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: "darkstores",
  timestamps: false
});



module.exports = Darkstore;
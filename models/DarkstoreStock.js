const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Darkstore = require("./Darkstore");
const Product = require("./Product");

const DarkstoreStock = sequelize.define("DarkstoreStock", {
  stock_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  darkstore_id: { type: DataTypes.INTEGER, allowNull: false },
  product_id: { type: DataTypes.INTEGER, allowNull: false },
  quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
  last_updated: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: "darkstore_stock",
  timestamps: false
});

// Associations
DarkstoreStock.belongsTo(Darkstore, { foreignKey: "darkstore_id" });
DarkstoreStock.belongsTo(Product, { foreignKey: "product_id" });
Darkstore.hasMany(DarkstoreStock, { foreignKey: "darkstore_id" });
Product.hasMany(DarkstoreStock, { foreignKey: "product_id" });

module.exports = DarkstoreStock;
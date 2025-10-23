const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Supplier = require("./Supplier");
const Product = require("./Product");

const SupplierProduct = sequelize.define("SupplierProduct", {
  supplier_product_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  supplier_id: { type: DataTypes.INTEGER, allowNull: false },
  product_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: "supplier_products",
  timestamps: false
});


module.exports = SupplierProduct;
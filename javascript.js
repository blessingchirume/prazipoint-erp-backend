const Order = sequelize.define("Order", {
  order_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  customer_id: { type: DataTypes.INTEGER, allowNull: false },
  darkstore_id: { type: DataTypes.INTEGER },
  rider_id: { type: DataTypes.INTEGER },
  status: { type: DataTypes.STRING, defaultValue: "pending" },
  total_amount: { type: DataTypes.DECIMAL },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: "orders",
  timestamps: false
});
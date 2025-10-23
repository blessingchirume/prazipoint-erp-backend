const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Rider = sequelize.define("Rider", {
  rider_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, unique: true, allowNull: false },
  address: { type: DataTypes.TEXT },
  next_of_kin: { type: DataTypes.STRING },
  next_of_kin_phone: { type: DataTypes.STRING },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: "riders",
  timestamps: false
});

module.exports = Rider;
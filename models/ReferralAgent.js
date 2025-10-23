const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ReferralAgent = sequelize.define("ReferralAgent", {
  agent_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  tableName: "referral_agents",
  timestamps: false
});

module.exports = ReferralAgent;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const UserPurchase = sequelize.define('UserPurchase', {
  phone_number: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  payment_status: {
    type: DataTypes.ENUM('PAID', 'PENDING'),
    defaultValue: 'PENDING'
  }
}, {
  tableName: 'users_purchases',
  timestamps: true,
  createdAt: 'purchase_date',
  updatedAt: false
});

module.exports = UserPurchase;

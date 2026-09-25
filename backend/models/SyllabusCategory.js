const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const SyllabusCategory = sequelize.define('SyllabusCategory', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'syllabus_categories',
  timestamps: true
});

module.exports = SyllabusCategory;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const CourseMaterial = sequelize.define('CourseMaterial', {
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  file_url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  file_size: {
    type: DataTypes.STRING(50),
    allowNull: true
  }
}, {
  tableName: 'course_materials',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

module.exports = CourseMaterial;

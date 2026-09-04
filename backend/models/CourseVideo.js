const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const CourseVideo = sequelize.define('CourseVideo', {
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  lesson_number: {
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
  video_url: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  video_data: {
    type: DataTypes.BLOB('long'),
    allowNull: true
  },
  duration: {
    type: DataTypes.STRING(50),
    allowNull: true
  }
}, {
  tableName: 'course_videos',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

module.exports = CourseVideo;

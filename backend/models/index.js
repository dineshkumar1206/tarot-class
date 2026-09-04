const sequelize = require('../config/db');
const Course = require('./Course');
const CourseVideo = require('./CourseVideo');
const CourseMaterial = require('./CourseMaterial');
const UserPurchase = require('./UserPurchase');

// Associations
Course.hasMany(CourseVideo, { foreignKey: 'course_id', as: 'videos' });
CourseVideo.belongsTo(Course, { foreignKey: 'course_id' });

Course.hasMany(CourseMaterial, { foreignKey: 'course_id', as: 'materials' });
CourseMaterial.belongsTo(Course, { foreignKey: 'course_id' });

Course.hasMany(UserPurchase, { foreignKey: 'course_id', as: 'purchases' });
UserPurchase.belongsTo(Course, { foreignKey: 'course_id' });

module.exports = {
  sequelize,
  Course,
  CourseVideo,
  CourseMaterial,
  UserPurchase
};

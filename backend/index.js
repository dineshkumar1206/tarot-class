require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const sequelize = require('./config/db');
const Course = require('./models/Course');
const CourseVideo = require('./models/CourseVideo');
const CourseMaterial = require('./models/CourseMaterial');
const UserPurchase = require('./models/UserPurchase');

// Associations
Course.hasMany(CourseVideo, { foreignKey: 'course_id', as: 'videos' });
CourseVideo.belongsTo(Course, { foreignKey: 'course_id' });

Course.hasMany(CourseMaterial, { foreignKey: 'course_id', as: 'materials' });
CourseMaterial.belongsTo(Course, { foreignKey: 'course_id' });

Course.hasMany(UserPurchase, { foreignKey: 'course_id', as: 'purchases' });
UserPurchase.belongsTo(Course, { foreignKey: 'course_id' });

// Route imports
const contentRoutes = require('./routes/contentRoutes');
const accessRoutes = require('./routes/accessRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['https://tarot-class.vercel.app', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev')); // Logging

// Serve static files (like uploaded videos)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health Check Endpoint
app.get('/', (req, res) => {
  res.send('Tarot Classes API is running');
});

app.get('/api/health', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({
      status: 'UP',
      database: 'Connected (Sequelize)',
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({
      status: 'DOWN',
      database: 'Disconnected',
      error: error.message,
      timestamp: new Date()
    });
  }
});

// API Routes
app.use('/api/content', contentRoutes);
app.use('/api/check-access', accessRoutes);

// (Old placeholder upload endpoint removed)

// Sync and Seed Database
const syncAndSeed = async () => {
  try {
    await sequelize.sync({ force: false }); // Change to true to drop tables on restart
    console.log('✅ Sequelize Models Synced');

    // Auto-seed if empty
    const courseCount = await Course.count();
    if (courseCount === 0) {
      console.log('🌱 Seeding database...');
      
      const course = await Course.create({
        title: 'Tarot Card Reading Classes',
        slug: 'tarot-card-reading-classes',
        description: 'Step into the realm of Tarot and uncover the hidden truths waiting for you.'
      });

      await CourseVideo.bulkCreate([
        { course_id: course.id, lesson_number: 1, title: 'Introduction to the Major Arcana', video_url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', duration: '45m' },
        { course_id: course.id, lesson_number: 2, title: 'The Minor Arcana Secrets', video_url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', duration: '1h 10m' },
        { course_id: course.id, lesson_number: 3, title: 'Celtic Cross Spread Mastery', video_url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4', duration: '55m' }
      ]);

      await CourseMaterial.bulkCreate([
        { course_id: course.id, title: 'Major Arcana Reference Guide', file_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', file_size: '2.4 MB' },
        { course_id: course.id, title: 'Celtic Cross Cheatsheet', file_url: 'https://www.orimi.com/pdf-test.pdf', file_size: '1.8 MB' }
      ]);

      await UserPurchase.bulkCreate([
        { phone_number: '+1234567890', course_id: course.id, payment_status: 'PAID' },
        { phone_number: '+0987654321', course_id: course.id, payment_status: 'PAID' }
      ]);
      console.log('🌱 Seed complete!');
    }
  } catch (err) {
    console.error('❌ Sync/Seed Error:', err);
  }
};

// Start Server
app.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  await syncAndSeed();
});

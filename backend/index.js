require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const { sequelize, Course, CourseVideo, CourseMaterial, UserPurchase } = require('./models');

// Route imports
const contentRoutes = require('./routes/contentRoutes');
const accessRoutes = require('./routes/accessRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // Logging

// Multer setup for video uploads (stored in memory to save to DB)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Health Check Endpoint
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

// Example upload endpoint placeholder
app.post('/api/upload/video', upload.single('video'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No video uploaded' });
  
  try {
    // Assuming course_id and lesson_number come from req.body
    const { course_id, lesson_number, title } = req.body;
    
    const newVideo = await CourseVideo.create({
      course_id: course_id || 1, // Defaulting to 1 for MVP
      lesson_number: lesson_number || 4,
      title: title || 'New Uploaded Video',
      video_data: req.file.buffer // Storing the file buffer directly in MySQL
    });

    res.json({ success: true, message: 'Video stored in database successfully', videoId: newVideo.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to store video in database' });
  }
});

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

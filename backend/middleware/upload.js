const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // We expect the client to send a category slug in the body, e.g., req.body.categorySlug
    // If not provided, fallback to 'uncategorized'
    const categorySlug = req.body.categorySlug || 'uncategorized';
    const uploadPath = path.join(__dirname, '..', 'uploads', 'syllabus', categorySlug);
    
    // Auto-create directory structure if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generate unique filename using timestamp and random string
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  }
});

const upload = multer({ storage });
module.exports = upload;

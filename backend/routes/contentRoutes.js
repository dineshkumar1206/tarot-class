const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');
const multer = require('multer');
const path = require('path');

// Multer Config for Video Uploads
const videoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/videos/'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const uploadVideo = multer({ 
  storage: videoStorage,
  limits: { fileSize: 5000 * 1024 * 1024 } // 5GB limit
});

// Multer Config for Material Uploads
const materialStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/materials/'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const uploadMaterial = multer({ 
  storage: materialStorage,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit for PDFs
});

// Get all course content
router.get('/', contentController.getCourseContent);

// Video CRUD
router.post('/video', uploadVideo.single('video_file'), contentController.addVideo);
router.put('/video/:id', uploadVideo.single('video_file'), contentController.updateVideo);
router.delete('/video/:id', contentController.deleteVideo);

// Material (PDF) CRUD
router.post('/material', uploadMaterial.single('material_file'), contentController.addMaterial);
router.put('/material/:id', uploadMaterial.single('material_file'), contentController.updateMaterial);
router.delete('/material/:id', contentController.deleteMaterial);

module.exports = router;

const express = require('express');
const router = express.Router();
const syllabusController = require('../controllers/syllabusController');
const upload = require('../middleware/upload');

router.get('/categories', syllabusController.getCategories);
router.get('/categories/:categoryId/videos', syllabusController.getVideosByCategory);
router.post('/videos', upload.fields([{ name: 'video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]), syllabusController.addVideo);
router.delete('/videos/:id', syllabusController.deleteVideo);

module.exports = router;

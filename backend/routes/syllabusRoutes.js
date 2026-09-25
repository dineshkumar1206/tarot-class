const express = require('express');
const router = express.Router();
const syllabusController = require('../controllers/syllabusController');
const upload = require('../middleware/upload');

router.get('/categories', syllabusController.getCategories);
router.get('/categories/:categoryId/videos', syllabusController.getVideosByCategory);
router.get('/categories/:categoryId/images', syllabusController.getImagesByCategory);
router.post('/videos', upload.fields([{ name: 'video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]), syllabusController.addVideo);
router.put('/videos/:id', upload.fields([{ name: 'video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]), syllabusController.updateVideo);
router.post('/images', upload.single('image'), syllabusController.addImage);
router.delete('/videos/:id', syllabusController.deleteVideo);
router.delete('/images/:id', syllabusController.deleteImage);

module.exports = router;

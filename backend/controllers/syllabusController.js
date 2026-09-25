const SyllabusCategory = require('../models/SyllabusCategory');
const SyllabusVideo = require('../models/SyllabusVideo');
const fs = require('fs');
const path = require('path');

exports.getCategories = async (req, res) => {
  try {
    const categories = await SyllabusCategory.findAll({
      order: [['id', 'ASC']]
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getVideosByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const videos = await SyllabusVideo.findAll({
      where: { category_id: categoryId },
      order: [['order', 'ASC'], ['createdAt', 'DESC']]
    });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addVideo = async (req, res) => {
  try {
    const { title, description, category_id, duration, order } = req.body;
    
    // Multer saves files, we construct the URL
    const categorySlug = req.body.categorySlug || 'uncategorized';
    
    let videoUrl = '';
    let thumbnailUrl = '';

    if (req.files) {
      if (req.files.video && req.files.video.length > 0) {
        videoUrl = `/api/uploads/syllabus/${categorySlug}/${req.files.video[0].filename}`;
      }
      if (req.files.thumbnail && req.files.thumbnail.length > 0) {
        thumbnailUrl = `/api/uploads/syllabus/${categorySlug}/${req.files.thumbnail[0].filename}`;
      }
    }

    const newVideo = await SyllabusVideo.create({
      category_id,
      title,
      description,
      video_url: videoUrl,
      thumbnail_url: thumbnailUrl,
      duration,
      order: order || 0
    });

    res.status(201).json(newVideo);
  } catch (error) {
    console.error("Add video error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await SyllabusVideo.findByPk(id);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    await video.destroy();
    res.json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

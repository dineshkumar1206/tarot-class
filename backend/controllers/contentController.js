const Course = require('../models/Course');
const CourseVideo = require('../models/CourseVideo');
const CourseMaterial = require('../models/CourseMaterial');

// Get all course content
exports.getCourseContent = async (req, res) => {
  try {
    const courseSlug = 'tarot-card-reading-classes';

    const course = await Course.findOne({
      where: { slug: courseSlug },
      include: [
        {
          model: CourseVideo,
          as: 'videos',
        },
        {
          model: CourseMaterial,
          as: 'materials',
        }
      ],
      order: [
        [{ model: CourseVideo, as: 'videos' }, 'lesson_number', 'ASC']
      ]
    });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json({
      success: true,
      data: {
        videos: course.videos,
        pdfs: course.materials
      }
    });

  } catch (error) {
    console.error('Error fetching course content:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

// --- VIDEO CRUD ---

exports.addVideo = async (req, res) => {
  try {
    const { course_id, title, description, duration, lesson_number } = req.body;
    
    // Check if a file was uploaded; if so, construct the URL
    let videoUrl = req.body.video_url;
    if (req.file) {
      videoUrl = `${req.protocol}://${req.get('host')}/uploads/videos/${req.file.filename}`;
    }

    let finalCourseId = course_id;
    if (!finalCourseId) {
      const course = await Course.findOne();
      if (course) finalCourseId = course.id;
    }

    const newVideo = await CourseVideo.create({
      course_id: finalCourseId || 1,
      lesson_number: lesson_number || 1,
      title,
      description,
      video_url: videoUrl,
      duration
    });

    res.json({ success: true, data: newVideo });
  } catch (error) {
    console.error('Error adding video:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

exports.updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, duration, lesson_number } = req.body;
    
    const video = await CourseVideo.findByPk(id);
    if (!video) return res.status(404).json({ success: false, error: 'Video not found' });

    let videoUrl = video.video_url;
    if (req.file) {
      videoUrl = `${req.protocol}://${req.get('host')}/uploads/videos/${req.file.filename}`;
    } else if (req.body.video_url) {
      videoUrl = req.body.video_url;
    }

    await video.update({
      title: title !== undefined ? title : video.title,
      description: description !== undefined ? description : video.description,
      video_url: videoUrl,
      duration: duration !== undefined ? duration : video.duration,
      lesson_number: lesson_number !== undefined ? lesson_number : video.lesson_number
    });

    res.json({ success: true, data: video });
  } catch (error) {
    console.error('Error updating video:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

exports.deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await CourseVideo.findByPk(id);
    
    if (!video) return res.status(404).json({ success: false, error: 'Video not found' });
    
    await video.destroy();
    res.json({ success: true, message: 'Video deleted successfully' });
  } catch (error) {
    console.error('Error deleting video:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};


// --- MATERIAL (PDF) CRUD ---

exports.addMaterial = async (req, res) => {
  try {
    const { course_id, title, description, file_size } = req.body;
    
    let fileUrl = req.body.file_url;
    if (req.file) {
      fileUrl = `${req.protocol}://${req.get('host')}/uploads/materials/${req.file.filename}`;
    }

    let finalCourseId = course_id;
    if (!finalCourseId) {
      const course = await Course.findOne();
      if (course) finalCourseId = course.id;
    }

    const newMaterial = await CourseMaterial.create({
      course_id: finalCourseId || 1,
      title,
      description,
      file_url: fileUrl,
      file_size
    });

    res.json({ success: true, data: newMaterial });
  } catch (error) {
    console.error('Error adding material:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

exports.updateMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, file_size } = req.body;
    
    const material = await CourseMaterial.findByPk(id);
    if (!material) return res.status(404).json({ success: false, error: 'Material not found' });

    let fileUrl = material.file_url;
    if (req.file) {
      fileUrl = `${req.protocol}://${req.get('host')}/uploads/materials/${req.file.filename}`;
    } else if (req.body.file_url) {
      fileUrl = req.body.file_url;
    }

    await material.update({
      title: title !== undefined ? title : material.title,
      description: description !== undefined ? description : material.description,
      file_url: fileUrl,
      file_size: file_size !== undefined ? file_size : material.file_size
    });

    res.json({ success: true, data: material });
  } catch (error) {
    console.error('Error updating material:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

exports.deleteMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const material = await CourseMaterial.findByPk(id);
    
    if (!material) return res.status(404).json({ success: false, error: 'Material not found' });
    
    await material.destroy();
    res.json({ success: true, message: 'Material deleted successfully' });
  } catch (error) {
    console.error('Error deleting material:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

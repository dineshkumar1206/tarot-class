const { Course, CourseVideo, CourseMaterial } = require('../models');

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

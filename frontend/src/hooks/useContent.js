import { useState, useEffect } from 'react';

// Fallback Mock Data
const mockVideos = [
  {
    id: 'v1',
    title: 'Lesson 1: Introduction to Major Arcana',
    duration: '15:20',
    url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    description: 'A deep dive into the Fool’s Journey and the foundational archetypes of the Tarot.'
  },
  {
    id: 'v2',
    title: 'Lesson 2: Card Spreads, Layouts & Celtic Cross',
    duration: '22:45',
    url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
    description: 'Learn the most powerful spreads and how to lay out the Celtic Cross with confidence.'
  },
  {
    id: 'v3',
    title: 'Lesson 3: Minor Arcana & Intuitive Symbolism',
    duration: '18:10',
    url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    description: 'Understanding the suits, numerology, and unlocking your intuitive connections.'
  }
];

const mockPdfs = [
  {
    id: 'p1',
    title: 'Major Arcana Symbolic Reference Sheet',
    description: 'A quick guide to all 22 Major Arcana cards and their core meanings.',
    size: '2.4 MB',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    id: 'p2',
    title: 'Tarot Spread Cheatsheet',
    description: 'Visual diagrams for 3-card, 5-card, and Celtic Cross layouts.',
    size: '1.8 MB',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    id: 'p3',
    title: 'Reading Logbook Template',
    description: 'Printable sheets to record and reflect on your daily readings.',
    size: '800 KB',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  }
];

export const useContent = () => {
  const [videos, setVideos] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/content');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setVideos(data.videos || mockVideos);
        setPdfs(data.pdfs || mockPdfs);
      } catch (error) {
        console.warn('Backend unavailable or error occurred, using mock data:', error);
        setVideos(mockVideos);
        setPdfs(mockPdfs);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return { videos, pdfs, loading };
};

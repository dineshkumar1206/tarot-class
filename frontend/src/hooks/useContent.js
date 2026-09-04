import { useState, useEffect, useCallback } from 'react';
import { config } from '../config';

// Fallback Mock Data
const mockVideos = [
  {
    id: 'v1',
    title: 'Lesson 1: Introduction to Major Arcana',
    duration: '15:20',
    video_url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    description: 'A deep dive into the Fool’s Journey and the foundational archetypes of the Tarot.'
  },
  {
    id: 'v2',
    title: 'Lesson 2: Card Spreads, Layouts & Celtic Cross',
    duration: '22:45',
    video_url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
    description: 'Learn the most powerful spreads and how to lay out the Celtic Cross with confidence.'
  }
];

const mockPdfs = [
  {
    id: 'p1',
    title: 'Major Arcana Symbolic Reference Sheet',
    description: 'A quick guide to all 22 Major Arcana cards and their core meanings.',
    file_size: '2.4 MB',
    file_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  }
];

export const useContent = () => {
  const [videos, setVideos] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContent = useCallback(async () => {
    try {
      const response = await fetch(`${config.API_BASE_URL}/api/content`);
      if (!response.ok) throw new Error('Network response was not ok');
      const json = await response.json();
      
      // Map API response to our expected keys if needed, 
      // although the backend should be returning them correctly now.
      setVideos(json.data.videos || mockVideos);
      setPdfs(json.data.pdfs || mockPdfs);
    } catch (error) {
      console.warn('Backend unavailable or error occurred, using mock data:', error);
      setVideos(mockVideos);
      setPdfs(mockPdfs);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  // Video CRUD
  const addVideo = async (videoData) => {
    const isFormData = videoData instanceof FormData;
    const res = await fetch(`${config.API_BASE_URL}/api/content/video`, {
      method: 'POST',
      headers: isFormData ? {} : { 'Content-Type': 'application/json' },
      body: isFormData ? videoData : JSON.stringify(videoData)
    });
    if (res.ok) await fetchContent();
    return res;
  };

  const updateVideo = async (id, videoData) => {
    const isFormData = videoData instanceof FormData;
    const res = await fetch(`${config.API_BASE_URL}/api/content/video/${id}`, {
      method: 'PUT',
      headers: isFormData ? {} : { 'Content-Type': 'application/json' },
      body: isFormData ? videoData : JSON.stringify(videoData)
    });
    if (res.ok) await fetchContent();
    return res;
  };

  const deleteVideo = async (id) => {
    const res = await fetch(`${config.API_BASE_URL}/api/content/video/${id}`, {
      method: 'DELETE'
    });
    if (res.ok) await fetchContent();
    return res;
  };

  // Material CRUD
  const addMaterial = async (materialData) => {
    const isFormData = materialData instanceof FormData;
    const res = await fetch(`${config.API_BASE_URL}/api/content/material`, {
      method: 'POST',
      headers: isFormData ? {} : { 'Content-Type': 'application/json' },
      body: isFormData ? materialData : JSON.stringify(materialData)
    });
    if (res.ok) await fetchContent();
    return res;
  };

  const updateMaterial = async (id, materialData) => {
    const isFormData = materialData instanceof FormData;
    const res = await fetch(`${config.API_BASE_URL}/api/content/material/${id}`, {
      method: 'PUT',
      headers: isFormData ? {} : { 'Content-Type': 'application/json' },
      body: isFormData ? materialData : JSON.stringify(materialData)
    });
    if (res.ok) await fetchContent();
    return res;
  };

  const deleteMaterial = async (id) => {
    const res = await fetch(`${config.API_BASE_URL}/api/content/material/${id}`, {
      method: 'DELETE'
    });
    if (res.ok) await fetchContent();
    return res;
  };

  return {
    videos,
    pdfs,
    loading,
    refreshContent: fetchContent,
    addVideo,
    updateVideo,
    deleteVideo,
    addMaterial,
    updateMaterial,
    deleteMaterial
  };
};

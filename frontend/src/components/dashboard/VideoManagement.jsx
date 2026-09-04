import React, { useState } from 'react';
import { useContent } from '../../hooks/useContent';
import { Plus, Edit2, Trash2, X, Save, Upload } from 'lucide-react';

const VideoManagement = () => {
  const { videos, loading, addVideo, updateVideo, deleteVideo } = useContent();
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    lesson_number: ''
  });
  const [videoFile, setVideoFile] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleEdit = (video) => {
    setEditingId(video.id);
    setFormData({
      title: video.title || '',
      description: video.description || '',
      duration: video.duration || '',
      lesson_number: video.lesson_number || ''
    });
    setVideoFile(null);
    setIsAdding(false);
  };

  const handleAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      duration: '',
      lesson_number: ''
    });
    setVideoFile(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAdding(false);
    setVideoFile(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('duration', formData.duration);
      data.append('lesson_number', formData.lesson_number);
      if (videoFile) {
        data.append('video_file', videoFile);
      }

      if (isAdding) {
        await addVideo(data);
      } else if (editingId) {
        await updateVideo(editingId, data);
      }
      setEditingId(null);
      setIsAdding(false);
      setVideoFile(null);
    } catch (err) {
      console.error('Save failed:', err);
      alert('Failed to save video. It might be too large or the server disconnected.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      await deleteVideo(id);
    }
  };

  if (loading) return <div className="text-white">Loading videos...</div>;

  return (
    <div className="text-slate-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Manage Videos</h2>
        {!isAdding && !editingId && (
          <button 
            onClick={handleAdd}
            className="flex items-center gap-2 bg-amber-500 text-slate-950 px-4 py-2 rounded-lg font-medium hover:bg-amber-400 transition"
          >
            <Plus className="w-4 h-4" /> Add Video
          </button>
        )}
      </div>

      {(isAdding || editingId) && (
        <div className="bg-slate-800 p-6 rounded-xl border border-indigo-500/30 mb-8">
          <h3 className="text-xl font-bold text-white mb-4">{isAdding ? 'Add New Video' : 'Edit Video'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm mb-1 text-slate-400">Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
            </div>
            <div>
              <label className="block text-sm mb-1 text-slate-400">Lesson Number</label>
              <input type="number" name="lesson_number" value={formData.lesson_number} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm mb-1 text-slate-400">Upload Video File</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 px-4 py-2 bg-indigo-900/50 border border-indigo-500/50 rounded-lg cursor-pointer hover:bg-indigo-800/50 transition">
                  <Upload className="w-4 h-4 text-indigo-400" />
                  <span className="text-indigo-200">Choose File</span>
                  <input type="file" accept="video/*" onChange={handleFileChange} className="hidden" />
                </label>
                <span className="text-sm text-slate-500">
                  {videoFile ? videoFile.name : (editingId ? 'Keep existing video' : 'No file chosen')}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1 text-slate-400">Duration (e.g., 15m)</label>
              <input type="text" name="duration" value={formData.duration} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm mb-1 text-slate-400">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white h-24" />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button onClick={cancelEdit} disabled={isSaving} className="flex items-center gap-2 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 disabled:opacity-50">
              <X className="w-4 h-4" /> Cancel
            </button>
            <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:opacity-50">
              {isSaving ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" /> 
              )}
              {isSaving ? 'Saving (Uploading...)' : 'Save'}
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {videos.map(video => (
          <div key={video.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
            <div>
              <h4 className="text-lg font-bold text-white">Lesson {video.lesson_number}: {video.title}</h4>
              <p className="text-sm text-slate-400 truncate max-w-lg">{video.description}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(video)} className="p-2 bg-slate-800 rounded-lg hover:bg-indigo-600/50 text-indigo-400 hover:text-white transition">
                <Edit2 className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(video.id)} className="p-2 bg-slate-800 rounded-lg hover:bg-red-600/50 text-red-400 hover:text-white transition">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoManagement;

import React, { useState, useEffect } from 'react';
import { Upload, Trash2, Edit2, Play, Image as ImageIcon } from 'lucide-react';

const SyllabusManagement = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [videos, setVideos] = useState([]);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/syllabus/categories')
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        if (data.length > 0) setSelectedCategory(data[0]);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchVideos();
    }
  }, [selectedCategory]);

  const fetchVideos = () => {
    fetch(`http://localhost:5000/api/syllabus/categories/${selectedCategory.id}/videos`)
      .then(res => res.json())
      .then(data => setVideos(data))
      .catch(err => console.error(err));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!videoFile || !title) return alert("Title and Video file are required");
    
    setLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('duration', duration);
    formData.append('category_id', selectedCategory.id);
    formData.append('categorySlug', selectedCategory.slug);
    formData.append('video', videoFile);
    if (thumbnailFile) {
      formData.append('thumbnail', thumbnailFile);
    }

    try {
      const res = await fetch('http://localhost:5000/api/syllabus/videos', {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        setTitle('');
        setDescription('');
        setDuration('');
        setVideoFile(null);
        setThumbnailFile(null);
        fetchVideos();
      } else {
        alert("Upload failed");
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/syllabus/videos/${id}`, { method: 'DELETE' });
        if (res.ok) fetchVideos();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 min-h-[70vh]">
      {/* Categories Sidebar */}
      <div className="w-full md:w-72 bg-slate-900 border border-indigo-900/50 rounded-2xl p-4 overflow-y-auto max-h-[80vh] shadow-xl">
        <h3 className="text-xl font-bold text-white mb-4 border-b border-indigo-900/50 pb-4 pl-2">Syllabus Categories</h3>
        <div className="flex flex-col gap-1.5">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat)}
              className={`text-left px-4 py-3.5 rounded-xl text-sm font-bold transition-all ${
                selectedCategory?.id === cat.id ? 'bg-amber-500 text-slate-950 shadow-lg scale-[1.02]' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col gap-6">
        {selectedCategory && (
          <>
            <div className="bg-slate-900 border border-indigo-900/50 rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-2">Upload to: <span className="text-amber-500">{selectedCategory.name}</span></h3>
              <p className="text-slate-400 text-sm mb-8">{selectedCategory.description}</p>
              
              <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-slate-300 text-sm font-bold mb-2">Video Title *</label>
                  <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="w-full bg-slate-950 text-white rounded-xl p-4 border border-indigo-900/50 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none transition-colors" placeholder="e.g. The Magician Card Meaning" />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-slate-300 text-sm font-bold mb-2">Description</label>
                  <textarea value={description} onChange={e => setDescription(e.target.value)} rows="3" className="w-full bg-slate-950 text-white rounded-xl p-4 border border-indigo-900/50 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none transition-colors" placeholder="Brief description of the video content..."></textarea>
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-slate-300 text-sm font-bold mb-2">Duration (optional)</label>
                  <input type="text" value={duration} onChange={e => setDuration(e.target.value)} className="w-full bg-slate-950 text-white rounded-xl p-4 border border-indigo-900/50 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none transition-colors" placeholder="e.g. 15 min" />
                </div>
                
                <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                  <div className="border-2 border-dashed border-indigo-900/50 hover:border-amber-500/50 transition-colors rounded-2xl p-6 bg-slate-950/50 flex flex-col items-center justify-center text-center group">
                    <Play className="w-10 h-10 text-amber-500 mb-3 group-hover:scale-110 transition-transform" />
                    <label className="cursor-pointer text-amber-400 hover:text-amber-300 font-bold text-sm px-4 py-2 bg-amber-500/10 rounded-lg">
                      Select Video File *
                      <input type="file" accept="video/*" className="hidden" onChange={e => setVideoFile(e.target.files[0])} required />
                    </label>
                    {videoFile && <span className="text-xs text-slate-400 mt-4 truncate max-w-full px-2 font-mono bg-slate-900 p-2 rounded">{videoFile.name}</span>}
                  </div>
                  
                  <div className="border-2 border-dashed border-indigo-900/50 hover:border-indigo-500/50 transition-colors rounded-2xl p-6 bg-slate-950/50 flex flex-col items-center justify-center text-center group">
                    <ImageIcon className="w-10 h-10 text-indigo-400 mb-3 group-hover:scale-110 transition-transform" />
                    <label className="cursor-pointer text-indigo-400 hover:text-indigo-300 font-bold text-sm px-4 py-2 bg-indigo-500/10 rounded-lg">
                      Select Thumbnail (Optional)
                      <input type="file" accept="image/*" className="hidden" onChange={e => setThumbnailFile(e.target.files[0])} />
                    </label>
                    {thumbnailFile && <span className="text-xs text-slate-400 mt-4 truncate max-w-full px-2 font-mono bg-slate-900 p-2 rounded">{thumbnailFile.name}</span>}
                  </div>
                </div>
                
                <div className="col-span-1 md:col-span-2 flex justify-end mt-6">
                  <button type="submit" disabled={loading} className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-4 px-10 rounded-xl flex items-center gap-3 transition-all shadow-lg hover:shadow-amber-500/25 disabled:opacity-50 disabled:hover:scale-100 hover:-translate-y-1">
                    {loading ? 'Uploading & Saving...' : <><Upload className="w-5 h-5" /> Upload Video to Syllabus</>}
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-slate-900 border border-indigo-900/50 rounded-2xl p-8 flex-1 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-8 border-b border-indigo-900/50 pb-4">Uploaded Videos ({videos.length})</h3>
              
              {videos.length === 0 ? (
                <div className="text-slate-500 text-center py-16 bg-slate-950/50 rounded-xl border border-dashed border-indigo-900/30">
                  <Video className="w-12 h-12 mx-auto text-slate-700 mb-4" />
                  No videos uploaded for this category yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {videos.map(video => (
                    <div key={video.id} className="flex flex-col md:flex-row items-center gap-6 p-4 bg-slate-950/50 rounded-xl border border-indigo-900/30 hover:border-indigo-500/30 transition-colors">
                      <div className="w-full md:w-48 h-28 bg-black rounded-xl overflow-hidden flex-shrink-0 relative group">
                        {video.thumbnail_url ? (
                           <img src={`http://localhost:5000${video.thumbnail_url}`} alt="Thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                           <video src={`http://localhost:5000${video.video_url}`} className="w-full h-full object-cover opacity-50"></video>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                          <Play className="w-10 h-10 text-white/90 drop-shadow-lg" />
                        </div>
                      </div>
                      
                      <div className="flex-1 w-full py-2">
                        <h4 className="text-xl font-bold text-white mb-1">{video.title}</h4>
                        <p className="text-sm text-slate-400 line-clamp-2 mb-3 leading-relaxed">{video.description}</p>
                        <span className="inline-block text-xs text-amber-500 font-bold bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20">{video.duration || 'Duration N/A'}</span>
                      </div>
                      
                      <div className="flex gap-3 w-full md:w-auto justify-end px-4">
                        <button className="p-3 text-slate-400 hover:text-indigo-400 hover:bg-indigo-400/10 rounded-xl transition-colors" title="Edit">
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleDelete(video.id)} className="p-3 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-colors" title="Delete">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SyllabusManagement;

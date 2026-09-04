import React, { useState } from 'react';
import { useContent } from '../../hooks/useContent';
import { Plus, Edit2, Trash2, X, Save, Upload } from 'lucide-react';

const PdfManagement = () => {
  const { pdfs, loading, addMaterial, updateMaterial, deleteMaterial } = useContent();
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file_size: ''
  });
  const [pdfFile, setPdfFile] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleEdit = (pdf) => {
    setEditingId(pdf.id);
    setFormData({
      title: pdf.title || '',
      description: pdf.description || '',
      file_size: pdf.file_size || ''
    });
    setPdfFile(null);
    setIsAdding(false);
  };

  const handleAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      file_size: ''
    });
    setPdfFile(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAdding(false);
    setPdfFile(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('file_size', formData.file_size);
      
      if (pdfFile) {
        data.append('material_file', pdfFile);
      }

      if (isAdding) {
        await addMaterial(data);
      } else if (editingId) {
        await updateMaterial(editingId, data);
      }
      setEditingId(null);
      setIsAdding(false);
      setPdfFile(null);
    } catch (err) {
      console.error('Save failed:', err);
      alert('Failed to save PDF. It might be too large or the server disconnected.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this PDF?')) {
      await deleteMaterial(id);
    }
  };

  if (loading) return <div className="text-white">Loading PDFs...</div>;

  return (
    <div className="text-slate-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Manage PDF Materials</h2>
        {!isAdding && !editingId && (
          <button 
            onClick={handleAdd}
            className="flex items-center gap-2 bg-amber-500 text-slate-950 px-4 py-2 rounded-lg font-medium hover:bg-amber-400 transition"
          >
            <Plus className="w-4 h-4" /> Add PDF
          </button>
        )}
      </div>

      {(isAdding || editingId) && (
        <div className="bg-slate-800 p-6 rounded-xl border border-indigo-500/30 mb-8">
          <h3 className="text-xl font-bold text-white mb-4">{isAdding ? 'Add New PDF' : 'Edit PDF'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm mb-1 text-slate-400">Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
            </div>
            <div>
              <label className="block text-sm mb-1 text-slate-400">File Size (e.g., 2.4 MB)</label>
              <input type="text" name="file_size" value={formData.file_size} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm mb-1 text-slate-400">Upload PDF File</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 px-4 py-2 bg-indigo-900/50 border border-indigo-500/50 rounded-lg cursor-pointer hover:bg-indigo-800/50 transition">
                  <Upload className="w-4 h-4 text-indigo-400" />
                  <span className="text-indigo-200">Choose File</span>
                  <input type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" />
                </label>
                <span className="text-sm text-slate-500">
                  {pdfFile ? pdfFile.name : (editingId ? 'Keep existing PDF' : 'No file chosen')}
                </span>
              </div>
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
        {pdfs.map(pdf => (
          <div key={pdf.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
            <div>
              <h4 className="text-lg font-bold text-white">{pdf.title}</h4>
              <p className="text-sm text-slate-400 max-w-xl line-clamp-2">{pdf.description}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(pdf)} className="p-2 bg-slate-800 rounded-lg hover:bg-indigo-600/50 text-indigo-400 hover:text-white transition">
                <Edit2 className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(pdf.id)} className="p-2 bg-slate-800 rounded-lg hover:bg-red-600/50 text-red-400 hover:text-white transition">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PdfManagement;

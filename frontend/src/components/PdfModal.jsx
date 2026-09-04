import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const PdfModal = ({ pdfUrl, title, onClose }) => {
  // Prevent scrolling on body when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!pdfUrl) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div 
        className="relative bg-slate-900 border border-indigo-500/30 w-full max-w-5xl h-[85vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300"
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-indigo-900/50 bg-slate-900/90">
          <h3 className="text-xl font-medium text-amber-500">{title}</h3>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex-1 bg-slate-800 p-2">
          <iframe 
            src={pdfUrl} 
            className="w-full h-full rounded border-0 bg-white"
            title={title}
          />
        </div>
      </div>
    </div>
  );
};

export default PdfModal;

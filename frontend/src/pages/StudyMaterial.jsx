import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { FileText, Download } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import PdfModal from '../components/PdfModal';

const StudyMaterial = () => {
  const { pdfs, loading } = useContent();
  const [selectedPdf, setSelectedPdf] = useState(null);

  return (
    <div className="min-h-screen font-sans selection:bg-[#c19b52]/30">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-16 px-4 md:px-12">
        <div data-aos="fade-up">
          <div className="flex items-center gap-3 mb-10 pb-4 border-b border-[#c19b52]/20">
            <div className="w-1.5 h-8 bg-[#c19b52] rounded-full"></div>
            <h1 className="text-3xl font-bold text-slate-900 uppercase tracking-widest">
              PDF <span className="text-[#c19b52]">Study Materials</span>
            </h1>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-12 h-12 border-4 border-[#c19b52]/30 border-t-[#c19b52] rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {pdfs.length === 0 ? (
                <div className="col-span-full text-center text-slate-500 py-10">
                  No study materials available yet.
                </div>
              ) : (
                pdfs.map((pdf, idx) => (
                  <div 
                    key={pdf.id}
                    data-aos="fade-up"
                    data-aos-delay={idx * 100}
                    onClick={() => setSelectedPdf(pdf)}
                    className="bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all cursor-pointer group flex flex-col h-full"
                  >
                    <div className="w-full aspect-[4/3] bg-slate-50 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden group-hover:bg-[#c19b52]/5 transition-colors">
                      <FileText className="w-16 h-16 text-[#c19b52]/40 group-hover:scale-110 group-hover:text-[#c19b52] transition-all duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    
                    <h3 className="font-bold text-slate-800 text-lg mb-2 line-clamp-2 group-hover:text-[#c19b52] transition-colors">
                      {pdf.title}
                    </h3>
                    
                    {pdf.description && (
                      <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-grow">
                        {pdf.description}
                      </p>
                    )}
                    
                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded">
                        {pdf.file_size || 'PDF Document'}
                      </span>
                      
                      <div className="flex items-center gap-2">
                        <a 
                          href={pdf.file_url || pdf.url} 
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 text-slate-400 hover:text-[#c19b52] hover:bg-[#c19b52]/10 rounded-lg transition-colors"
                          title="Download PDF"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </main>

      <PdfModal 
        pdfUrl={selectedPdf ? (selectedPdf.file_url || selectedPdf.url) : null}
        title={selectedPdf ? selectedPdf.title : ''}
        onClose={() => setSelectedPdf(null)}
      />
    </div>
  );
};

export default StudyMaterial;

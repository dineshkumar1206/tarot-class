import React from 'react';

const CardsMeaning = () => {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-[#0C3229] mb-6 font-serif">Video Classes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Video list placeholder */}
        <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 text-center">
          <p className="text-slate-500">Videos coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default CardsMeaning;

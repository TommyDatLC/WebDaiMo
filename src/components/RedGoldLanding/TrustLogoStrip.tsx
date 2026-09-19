import React from 'react';

export const TrustLogoStrip: React.FC = () => {
  const logos = [
    { name: 'Compass', text: 'COMPASS' },
    { name: "L'Oréal", text: "L'ORÉAL" },
    { name: 'Zendesk', text: 'zendesk' },
    { name: 'Dropbox', text: 'Dropbox' },
    { name: 'Gong', text: 'GONG' },
    { name: 'Viettel', text: 'VIETTEL' },
    { name: 'Vingroup', text: 'VINGROUP' },
  ];

  return (
    <div className="w-full py-12 border-y border-[#EADCCE]/70 bg-[#FAF7F2]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-[#6B4F4F]/80 mb-6">
          Được tin dùng bởi hơn 100,000+ tổ chức, đoàn thể và đơn vị quản lý di tích
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16 opacity-75 hover:opacity-100 transition-opacity">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="text-base sm:text-lg font-black tracking-widest text-[#C9B6B6] hover:text-[#2A0A0A] transition-colors select-none font-sans"
            >
              {logo.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

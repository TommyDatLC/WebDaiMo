import React from 'react';
import { Compass, Landmark, MapPin, Award, ExternalLink, Sparkles } from 'lucide-react';

interface HeritageIntegrationSectionProps {
  onOpenMap: () => void;
}

export const HeritageIntegrationSection: React.FC<HeritageIntegrationSectionProps> = ({ onOpenMap }) => {
  const relicHighlights = [
    { name: 'Chùa Ngọc Trục', type: 'Chùa', ranking: 'Di tích Quốc gia', year: '1992' },
    { name: 'Đình Phùng Khoang', type: 'Đình', ranking: 'Di tích Quốc gia', year: '1991' },
    { name: 'Đền Hàm Rồng', type: 'Đền', ranking: 'Di tích Thành phố', year: '2019' },
    { name: 'Miếu Ngọc Trục', type: 'Miếu', ranking: 'Di tích Thành phố', year: '2010' },
  ];

  return (
    <section id="heritage" className="py-20 md:py-28 bg-[#FAF7F2] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Product Left: Relics Snapshot with Radiant Vermilion Blob */}
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            {/* Radiant Vermilion Blob */}
            <div 
              className="absolute -top-8 -left-8 w-72 h-72 rounded-full bg-[#FF4D4D] opacity-30 filter blur-3xl pointer-events-none"
              style={{ mixBlendMode: 'multiply' }}
            />
            <div 
              className="absolute -bottom-8 -right-8 w-72 h-72 rounded-full bg-[#FBBF24] opacity-30 filter blur-3xl pointer-events-none"
              style={{ mixBlendMode: 'multiply' }}
            />

            {/* Elevated Card */}
            <div 
              className="relative bg-white rounded-2xl border border-[#EADCCE] p-6 overflow-hidden"
              style={{
                boxShadow: 'rgba(107, 79, 79, 0.05) 0px 4px 5px 0px, rgba(107, 79, 79, 0.04) 0px 8px 15px 0px, rgba(107, 79, 79, 0.09) 0px 30px 50px 0px'
              }}
            >
              {/* Map Preview Graphic */}
              <div className="relative h-48 rounded-xl overflow-hidden bg-gradient-to-br from-[#2A0A0A] to-[#421515] p-4 text-white flex flex-col justify-between border border-[#D97706]/40">
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D9232E] animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-wider text-amber-200">
                      Bản đồ Số Địa chính & Di tích
                    </span>
                  </div>
                  <span className="text-[10px] font-bold bg-[#D9232E] text-white px-2 py-0.5 rounded shadow-sm">
                    Phường Đại Mỗ
                  </span>
                </div>

                <div className="z-10 space-y-1">
                  <h4 className="text-lg font-black tracking-tight text-white">
                    10 Di tích Lịch sử – Văn hóa
                  </h4>
                  <p className="text-xs text-amber-100/80 font-normal">
                    Hệ thống ranh giới vệ tinh GIS, tọa độ GPS chuẩn xác và hồ sơ trích yếu số tay di tích.
                  </p>
                </div>

                {/* Decorative Map Grid Lines */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#FBBF24_1px,transparent_1px)] [background-size:16px_16px]" />
              </div>

              {/* Relic List Quick Preview */}
              <div className="mt-4 space-y-2.5">
                {relicHighlights.map((r, i) => (
                  <div
                    key={i}
                    onClick={onOpenMap}
                    className="p-2.5 rounded-xl border border-[#EADCCE] hover:border-[#D9232E]/60 bg-[#FAF7F2]/60 hover:bg-white flex items-center justify-between transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-white border border-[#EADCCE] text-[#D9232E] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                        <Landmark className="w-4 h-4 text-[#D9232E]" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-[#2A0A0A] group-hover:text-[#D9232E] transition-colors">
                          {r.name}
                        </h5>
                        <p className="text-[10px] text-[#6B4F4F]">Xếp hạng năm {r.year}</p>
                      </div>
                    </div>

                    <span
                      className={`text-[9.5px] font-extrabold px-2 py-0.5 rounded-md border ${
                        r.ranking.includes('Quốc gia')
                          ? 'bg-[#FEF2F2] text-[#D9232E] border-[#FEE2E2]'
                          : 'bg-[#FEF3C7] text-[#9A3412] border-[#FDE68A]'
                      }`}
                    >
                      {r.ranking}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Button to launch full map */}
              <button
                type="button"
                onClick={onOpenMap}
                className="mt-4 w-full py-2.5 px-4 rounded-lg bg-[#2A0A0A] hover:bg-[#3D1414] text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95"
              >
                <Compass className="w-4 h-4 text-[#FBBF24]" />
                <span>Khám phá Trực quan trên Bản đồ Đại Mỗ →</span>
              </button>
            </div>
          </div>

          {/* Text Right Column */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF3C7] text-[#9A3412] text-xs font-bold border border-[#FDE68A]">
              <Award className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Di sản Văn hóa & Lịch sử Quốc gia</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2A0A0A] tracking-tight leading-tight">
              Tích hợp Bản đồ GIS & <br />
              <span className="text-[#D9232E]">Sổ tay Di tích Đại Mỗ</span>
            </h2>

            <p className="text-base text-[#6B4F4F] font-normal leading-relaxed">
              Trang web cung cấp bản đồ số tương tác 100% không gian thực của Phường Đại Mỗ (Quận Nam Từ Liêm, Hà Nội). Du khách, các đoàn khảo sát và nhà nghiên cứu có thể tra cứu nhanh thông tin 10 di tích lịch sử - văn hóa được xếp hạng cấp Quốc gia và Thành phố:
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-md bg-[#FEF2F2] text-[#D9232E] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#2A0A0A]">Tọa độ định vị GPS chính xác tuyệt đối</h4>
                  <p className="text-xs text-[#6B4F4F]">Đồng bộ với Google Maps Navigation, chỉ đường tức thì đến từng cổng di tích.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-md bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#2A0A0A]">Hồ sơ trích yếu, thần tích & kiến trúc</h4>
                  <p className="text-xs text-[#6B4F4F]">Ảnh tư liệu thực địa, lịch sử dựng chùa/đình/đền và ngày hội truyền thống của làng.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <button
                type="button"
                onClick={onOpenMap}
                className="py-3 px-5 rounded-lg bg-[#D9232E] hover:bg-[#C81E1E] text-white font-bold text-sm tracking-tight shadow-md shadow-[#D9232E]/25 transition-all flex items-center gap-2 active:scale-95"
              >
                <span>Mở Bản đồ Toàn màn hình</span>
                <ExternalLink className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onOpenMap}
                className="py-3 px-4 rounded-lg bg-transparent hover:bg-[#F5EFE6] border border-[#EADCCE] text-[#2A0A0A] font-bold text-sm transition-all"
              >
                <span>Xem Sổ tay Di tích</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

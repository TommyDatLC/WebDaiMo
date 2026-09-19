import React from 'react';
import { CalendarDays, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const footerColumns = [
    {
      title: 'Sản phẩm',
      links: [
        'Lập lịch cá nhân',
        'Lập lịch đoàn thể',
        'Bản đồ Di tích GIS',
        'Tự động hóa nhắc hẹn',
        'Bảo mật dữ liệu',
      ],
    },
    {
      title: 'Giải pháp',
      links: [
        'Ban Quản lý Di tích',
        'Đoàn khảo sát nghiên cứu',
        'Doanh nghiệp & Đơn vị',
        'Giáo dục & Học đường',
        'Khách du lịch tâm linh',
      ],
    },
    {
      title: 'Di tích Đại Mỗ',
      links: [
        'Chùa Ngọc Trục (Đại Phúc Tự)',
        'Đình Phùng Khoang',
        'Đền Hàm Rồng',
        'Miếu Ngọc Trục',
        'Chùa Trung Văn (Đại Linh Tự)',
      ],
    },
    {
      title: 'Về chúng tôi',
      links: [
        'Giới thiệu dự án',
        'Sổ tay Di tích Lịch sử',
        'Chính sách quyền riêng tư',
        'Điều khoản sử dụng',
        'Liên hệ hỗ trợ',
      ],
    },
  ];

  return (
    <footer className="w-full bg-[#FAF7F2] border-t border-[#EADCCE] pt-16 pb-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-[#EADCCE]">
          {/* Brand Col */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#2A0A0A] text-[#FBBF24] flex items-center justify-center font-bold text-sm">
                <CalendarDays className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base text-[#2A0A0A]">Đại Mỗ Portal</span>
            </div>
            <p className="text-xs text-[#6B4F4F] leading-relaxed">
              Giải pháp điều phối lịch trình hiện đại kết hợp số hóa di sản văn hóa Phường Đại Mỗ.
            </p>
          </div>

          {/* Link Columns */}
          {footerColumns.map((col, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B4F4F]">
                {col.title}
              </h4>
              <ul className="space-y-2 text-sm font-medium text-[#2A0A0A]">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a
                      href="#"
                      className="hover:text-[#D9232E] transition-colors leading-normal block"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B4F4F]">
          <p>© {new Date().getFullYear()} Cổng Thông tin & Điều phối Di tích Phường Đại Mỗ. Bảo lưu mọi quyền.</p>
          <p className="flex items-center gap-1">
            <span>Thiết kế theo chuẩn</span>
            <span className="font-bold text-[#D9232E]">Red & Gold Light Theme</span>
            <span>với sự tận tâm</span>
            <Heart className="w-3 h-3 text-[#D9232E] fill-current" />
          </p>
        </div>
      </div>
    </footer>
  );
};

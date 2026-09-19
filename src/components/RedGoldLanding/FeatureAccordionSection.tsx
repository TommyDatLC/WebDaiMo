import React, { useState } from 'react';
import { Calendar, Bell, Users, Zap, CheckCircle, ChevronRight } from 'lucide-react';

export const FeatureAccordionSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const features = [
    {
      id: 0,
      title: 'Tự động đồng bộ lịch hẹn thông minh',
      description:
        'Kết nối hai chiều với Google Calendar, Outlook và Apple Calendar. Loại bỏ hoàn toàn tình trạng trùng lịch, tự động cập nhật múi giờ và thời gian đệm giữa các phiên làm việc.',
      badge: 'Đồng bộ 2 chiều',
      icon: <Calendar className="w-5 h-5 text-[#D9232E]" />,
      previewTitle: 'Lịch trình tự động tối ưu hóa',
      previewDetails: [
        'Tự động khóa giờ khi có lịch bận trên Google Calendar',
        'Tạo link Google Meet hoặc địa điểm di tích tức thời',
        'Khoảng đệm 15 phút giữa các buổi tiếp đoàn',
      ],
    },
    {
      id: 1,
      title: 'Nhắc nhở và gửi hướng dẫn trước buổi gặp',
      description:
        'Tự động gửi SMS, Zalo và Email thông báo kèm bản đồ định vị GPS, tài liệu giới thiệu và quy định di tích trước 24h và 2h để đảm bảo khách đến đúng giờ.',
      badge: 'Tỷ lệ tham gia 99%',
      icon: <Bell className="w-5 h-5 text-[#D9232E]" />,
      previewTitle: 'Hệ thống tự động chăm sóc khách',
      previewDetails: [
        'Email xác nhận kèm mã QR vào cổng',
        'Tin nhắn nhắc lịch trước 2h có bản đồ chỉ đường',
        'Khảo sát nhanh sau khi kết thúc buổi làm việc',
      ],
    },
    {
      id: 2,
      title: 'Phân luồng và điều phối đoàn tham quan theo nhóm',
      description:
        'Dành cho các đoàn nghiên cứu, học sinh và du khách. Cho phép đặt lịch tập thể, phân bổ hướng dẫn viên phụ trách từng cụm di tích (Ngọc Trục, Phùng Khoang, Trung Văn).',
      badge: 'Quản lý tập trung',
      icon: <Users className="w-5 h-5 text-[#D9232E]" />,
      previewTitle: 'Phân luồng đoàn khách theo giờ',
      previewDetails: [
        'Giới hạn tối đa 30 khách/khung giờ để bảo tồn di tích',
        'Gán cán bộ ban quản lý phụ trách đón tiếp tương ứng',
        'Thống kê lượng khách theo ngày, tháng, năm',
      ],
    },
  ];

  const current = features[activeTab];

  return (
    <section id="features" className="py-20 md:py-28 bg-[#FAF7F2] border-b border-[#EADCCE]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Section Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF3C7] text-[#9A3412] text-xs font-bold border border-[#FDE68A]">
            <Zap className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Quy trình làm việc không gián đoạn</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#2A0A0A] tracking-tight leading-tight">
            Mọi tính năng cần thiết để làm chủ lịch trình
          </h2>
          <p className="text-base text-[#6B4F4F] font-normal leading-relaxed">
            Thiết kế theo tiêu chuẩn công thái học cao cấp: tinh giản thao tác, tập trung vào trải nghiệm khách mời và tôn vinh tính trang nghiêm, khoa học.
          </p>
        </div>

        {/* Two-column Feature Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Feature Accordion */}
          <div className="lg:col-span-6 space-y-4">
            {features.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white border-[#D9232E]/40 shadow-md shadow-[#D9232E]/5'
                      : 'bg-transparent border-[#EADCCE]/70 hover:border-[#D97706]/40 hover:bg-white/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                          isActive
                            ? 'bg-[#FEF2F2] text-[#D9232E] border border-[#FEE2E2]'
                            : 'bg-[#F5EFE6] text-[#C9B6B6]'
                        }`}
                      >
                        {item.icon}
                      </div>
                      <h3
                        className={`text-base sm:text-lg font-bold transition-colors ${
                          isActive ? 'text-[#2A0A0A]' : 'text-[#6B4F4F]'
                        }`}
                      >
                        {item.title}
                      </h3>
                    </div>

                    <ChevronRight
                      className={`w-5 h-5 transition-transform ${
                        isActive ? 'text-[#D9232E] rotate-90' : 'text-[#C9B6B6]'
                      }`}
                    />
                  </div>

                  {isActive && (
                    <div className="mt-3.5 pl-[54px] space-y-3 animate-fade-in">
                      <p className="text-sm text-[#6B4F4F] leading-relaxed font-normal">
                        {item.description}
                      </p>
                      <span className="inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#FEF3C7] text-[#9A3412] border border-[#FDE68A]">
                        {item.badge}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Elevated Product Card with Sunlit Gold Blob */}
          <div className="lg:col-span-6 relative">
            {/* Decorative Gold Blob */}
            <div 
              className="absolute -top-8 -right-8 w-72 h-72 rounded-full bg-[#FBBF24] opacity-35 filter blur-3xl pointer-events-none"
              style={{ mixBlendMode: 'multiply' }}
            />
            <div 
              className="absolute -bottom-6 -left-6 w-60 h-60 rounded-full bg-[#FF4D4D] opacity-20 filter blur-3xl pointer-events-none"
              style={{ mixBlendMode: 'multiply' }}
            />

            {/* Elevated Card */}
            <div 
              className="relative bg-white rounded-2xl border border-[#EADCCE] p-7 overflow-hidden"
              style={{
                boxShadow: 'rgba(107, 79, 79, 0.05) 0px 4px 5px 0px, rgba(107, 79, 79, 0.04) 0px 8px 15px 0px, rgba(107, 79, 79, 0.09) 0px 30px 50px 0px'
              }}
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#EADCCE]">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-[#D9232E]" />
                  <span className="w-3 h-3 rounded-full bg-[#D97706]" />
                  <span className="w-3 h-3 rounded-full bg-[#C9B6B6]" />
                </div>
                <span className="text-[11px] font-bold text-[#6B4F4F] bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#EADCCE]">
                  Quy trình tự động hóa
                </span>
              </div>

              <div className="pt-6 space-y-4">
                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EADCCE]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#D97706] uppercase tracking-wider">
                      Trạng thái hoạt động
                    </span>
                    <span className="text-xs font-bold text-[#D9232E] flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#D9232E] animate-ping" />
                      Thời gian thực
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-[#2A0A0A]">{current.previewTitle}</h4>
                </div>

                <div className="space-y-2.5 pt-2">
                  {current.previewDetails.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-2.5 rounded-lg bg-white border border-[#EADCCE]/80 hover:border-[#D97706]/60 transition-colors">
                      <CheckCircle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                      <span className="text-xs font-semibold text-[#2A0A0A] leading-snug">
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex items-center justify-between text-xs font-bold text-[#6B4F4F]">
                  <span>Hiệu suất vận hành: 100%</span>
                  <span className="text-[#D9232E]">Đang hoạt động ổn định</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

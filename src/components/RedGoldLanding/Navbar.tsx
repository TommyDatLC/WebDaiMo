import React from 'react';
import { CalendarDays, ArrowRight, Compass } from 'lucide-react';

interface NavbarProps {
  onOpenMap: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenMap }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#EADCCE] transition-all">
      <div className="max-w-[1200px] mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-[#2A0A0A] text-white flex items-center justify-center shadow-sm relative overflow-hidden border border-[#D97706]/40">
            <div className="absolute inset-0 bg-gradient-to-br from-[#D9232E]/30 via-transparent to-[#D97706]/30" />
            <CalendarDays className="w-5 h-5 text-[#FBBF24] relative z-10 stroke-[2]" />
          </div>
          <div>
            <span className="text-lg font-black tracking-tight text-[#2A0A0A] flex items-center gap-1.5">
              <span>Đại Mỗ</span>
              <span className="text-xs font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#FEF3C7] text-[#9A3412] border border-[#FDE68A]">
                Portal
              </span>
            </span>
            <p className="text-[10px] font-semibold text-[#6B4F4F] tracking-tight -mt-0.5">
              Hệ thống Điều phối Lịch trình & Di tích
            </p>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-[14.5px] font-semibold text-[#2A0A0A]">
          <a href="#features" className="hover:text-[#D9232E] transition-colors">
            Tính năng
          </a>
          <a href="#solutions" className="hover:text-[#D9232E] transition-colors">
            Giải pháp
          </a>
          <a href="#heritage" className="hover:text-[#D9232E] transition-colors flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
            <span>Di tích Lịch sử (10)</span>
          </a>
          <a href="#testimonials" className="hover:text-[#D9232E] transition-colors">
            Khách hàng
          </a>
          <a href="#pricing" className="hover:text-[#D9232E] transition-colors">
            Bảng giá
          </a>
        </nav>

        {/* Right CTA Cluster */}
        <div className="flex items-center gap-3">
          {/* Quick Map trigger */}
          <button
            type="button"
            onClick={onOpenMap}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-[#D97706] bg-[#FEF3C7] hover:bg-[#FDE68A] transition-all border border-[#FDE68A] active:scale-95"
          >
            <Compass className="w-4 h-4 text-[#D97706]" />
            <span>Bản đồ Đại Mỗ</span>
          </button>

          <a
            href="#login"
            className="text-xs sm:text-sm font-semibold text-[#2A0A0A] hover:text-[#D9232E] px-2 py-1 transition-colors"
          >
            Đăng nhập
          </a>

          <button
            type="button"
            onClick={onOpenMap}
            className="px-4 py-2 rounded-lg bg-[#D9232E] hover:bg-[#C81E1E] text-white text-xs sm:text-sm font-bold tracking-tight shadow-md shadow-[#D9232E]/20 transition-all active:scale-95 flex items-center gap-1.5"
          >
            <span>Bắt đầu ngay</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};

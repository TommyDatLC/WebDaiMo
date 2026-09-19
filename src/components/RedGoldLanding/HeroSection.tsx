import React from 'react';
import { BookingWidget } from './BookingWidget';
import { ArrowRight, Check, ShieldCheck, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onOpenMap: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenMap }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:py-24 bg-[#FAF7F2]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-6 space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF3C7] text-[#9A3412] border border-[#FDE68A] text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Tiết kiệm 16% thời gian điều phối và khảo sát</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[68px] xl:text-[76px] font-black tracking-tight text-[#2A0A0A] leading-[1.08]">
              Lên lịch dễ dàng. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D9232E] via-[#D97706] to-[#B45309]">
                Kết nối trọn vẹn.
              </span>
            </h1>

            {/* Body Copy */}
            <p className="text-base sm:text-lg text-[#6B4F4F] leading-relaxed max-w-xl font-normal">
              Nền tảng điều phối lịch trình và số hóa không gian di tích thông minh: loại bỏ hoàn toàn việc trao đổi email rườm rà, đặt hẹn gặp chuyên gia và đăng ký tour tham quan chỉ trong vài giây.
            </p>

            {/* Social Sign-In & Primary CTA Group */}
            <div className="pt-2 space-y-3.5 max-w-md">
              {/* Google Sign-in Variant */}
              <button
                type="button"
                onClick={onOpenMap}
                className="w-full py-3 px-4 rounded-lg bg-white hover:bg-[#FAF7F2] border border-[#EADCCE] text-[#2A0A0A] font-bold text-sm tracking-tight transition-all shadow-xs flex items-center justify-center gap-3 active:scale-[0.99]"
              >
                {/* Google "G" SVG */}
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.1-1.5.4-2.3L1.9 7.3C.7 9.7 0 12 0 14.5s.7 4.8 1.9 7.2l3.7-2.9c0-1.3 0-2.7 0-4z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16.5C3.7 20.2 7.5 23.5 12 23.5z"
                  />
                </svg>
                <span>Đăng ký nhanh bằng Google</span>
              </button>

              {/* Microsoft / Hệ thống SSO Variant */}
              <button
                type="button"
                onClick={onOpenMap}
                className="w-full py-3 px-4 rounded-lg bg-[#2A0A0A] hover:bg-[#3D1414] text-white font-bold text-sm tracking-tight transition-all shadow-md shadow-[#2A0A0A]/20 flex items-center justify-center gap-3 active:scale-[0.99]"
              >
                {/* Microsoft SVG */}
                <svg className="w-4 h-4" viewBox="0 0 23 23">
                  <path fill="#f35325" d="M1 1h10v10H1z" />
                  <path fill="#81bc06" d="M12 1h10v10H12z" />
                  <path fill="#05a6f0" d="M1 12h10v10H1z" />
                  <path fill="#ffba08" d="M12 12h10v10H12z" />
                </svg>
                <span>Đăng nhập với Microsoft / Cơ quan</span>
              </button>

              {/* Primary Signal Red CTA */}
              <div className="pt-1 flex items-center gap-3">
                <button
                  type="button"
                  onClick={onOpenMap}
                  className="flex-1 py-3.5 px-6 rounded-lg bg-[#D9232E] hover:bg-[#C81E1E] text-white font-bold text-base tracking-tight shadow-lg shadow-[#D9232E]/30 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                  <span>Bắt đầu miễn phí ngay</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Trust Subtext */}
              <div className="flex items-center gap-4 text-xs font-semibold text-[#6B4F4F] pt-2">
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-[#D97706]" />
                  Miễn phí mãi mãi
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D97706]" />
                  Không cần thẻ tín dụng
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Booking Widget with Dual Blobs */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <BookingWidget onOpenMap={onOpenMap} />
          </div>
        </div>
      </div>
    </section>
  );
};

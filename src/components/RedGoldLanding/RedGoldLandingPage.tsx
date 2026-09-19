import React from 'react';
import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { TrustLogoStrip } from './TrustLogoStrip';
import { FeatureAccordionSection } from './FeatureAccordionSection';
import { HeritageIntegrationSection } from './HeritageIntegrationSection';
import { Footer } from './Footer';
import { ArrowRight, Sparkles, Compass } from 'lucide-react';

interface RedGoldLandingPageProps {
  onOpenMap: () => void;
}

export const RedGoldLandingPage: React.FC<RedGoldLandingPageProps> = ({ onOpenMap }) => {
  return (
    <div className="min-h-screen w-full bg-[#FAF7F2] text-[#2A0A0A] font-sans antialiased overflow-x-hidden selection:bg-[#FEF2F2] selection:text-[#D9232E]">
      {/* 1. Sticky Navigation Bar */}
      <Navbar onOpenMap={onOpenMap} />

      <main>
        {/* 2. Hero Section with Dual Decorative Blobs & Booking Widget */}
        <HeroSection onOpenMap={onOpenMap} />

        {/* 3. Trust Logo Strip */}
        <TrustLogoStrip />

        {/* 4. Interactive Feature Section with Accordion */}
        <FeatureAccordionSection />

        {/* 5. Heritage Integration & GIS Map Section */}
        <HeritageIntegrationSection onOpenMap={onOpenMap} />

        {/* 6. Pre-Footer Call To Action Block */}
        <section className="py-20 bg-[#F5EFE6] border-t border-[#EADCCE]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#9A3412] text-xs font-bold border border-[#EADCCE] shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Bắt đầu miễn phí chỉ trong 60 giây</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#2A0A0A] tracking-tight">
              Sẵn sàng làm chủ lịch trình và kết nối di sản?
            </h2>

            <p className="text-base sm:text-lg text-[#6B4F4F] max-w-2xl mx-auto font-normal">
              Tham gia cùng hàng nghìn cá nhân, đoàn nghiên cứu và đơn vị tổ chức đang sử dụng hệ thống số hóa để kiến tạo những trải nghiệm gặp gỡ đẳng cấp.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              {/* Primary Signal Red CTA */}
              <button
                type="button"
                onClick={onOpenMap}
                className="w-full sm:w-auto py-3.5 px-7 rounded-lg bg-[#D9232E] hover:bg-[#C81E1E] text-white font-bold text-base tracking-tight shadow-md shadow-[#D9232E]/30 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Bắt đầu dùng thử miễn phí</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Dark Burgundy CTA */}
              <button
                type="button"
                onClick={onOpenMap}
                className="w-full sm:w-auto py-3.5 px-7 rounded-lg bg-[#2A0A0A] hover:bg-[#3D1414] text-white font-bold text-base tracking-tight shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Compass className="w-4 h-4 text-[#FBBF24]" />
                <span>Trải nghiệm Bản đồ Di tích</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* 7. Site-wide Footer */}
      <Footer />
    </div>
  );
};

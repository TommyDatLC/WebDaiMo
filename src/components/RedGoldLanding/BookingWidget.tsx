import React, { useState } from 'react';
import { Clock, MapPin, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

interface BookingWidgetProps {
  onOpenMap?: () => void;
}

export const BookingWidget: React.FC<BookingWidgetProps> = ({ onOpenMap }) => {
  const [selectedDay, setSelectedDay] = useState<number>(19);
  const [selectedSlot, setSelectedSlot] = useState<string | null>('10:00');
  const [isBooked, setIsBooked] = useState<boolean>(false);

  const days = [
    { day: 16, status: 'past', label: 'T2' },
    { day: 17, status: 'past', label: 'T3' },
    { day: 18, status: 'past', label: 'T4' },
    { day: 19, status: 'available', label: 'T5' },
    { day: 20, status: 'available', label: 'T6' },
    { day: 21, status: 'available', label: 'T7' },
    { day: 22, status: 'weekend', label: 'CN' },
    { day: 23, status: 'available', label: 'T2' },
    { day: 24, status: 'available', label: 'T3' },
    { day: 25, status: 'available', label: 'T4' },
    { day: 26, status: 'available', label: 'T5' },
    { day: 27, status: 'available', label: 'T6' },
    { day: 28, status: 'available', label: 'T7' },
    { day: 29, status: 'weekend', label: 'CN' },
  ];

  const timeSlots = ['09:00', '10:00', '11:30', '14:00', '15:30', '16:30'];

  const handleBooking = () => {
    if (selectedSlot) {
      setIsBooked(true);
      setTimeout(() => setIsBooked(false), 4000);
    }
  };

  return (
    <div className="relative w-full max-w-[540px] mx-auto select-none">
      {/* Decorative Warm Blobs bleeding from behind card */}
      <div 
        className="absolute -top-10 -left-10 w-72 h-72 rounded-full bg-[#FF4D4D] opacity-25 filter blur-3xl pointer-events-none transform -translate-x-4 -translate-y-4"
        style={{ mixBlendMode: 'multiply' }}
      />
      <div 
        className="absolute -bottom-8 -right-8 w-80 h-80 rounded-full bg-[#FBBF24] opacity-35 filter blur-3xl pointer-events-none transform translate-x-4 translate-y-4"
        style={{ mixBlendMode: 'multiply' }}
      />

      {/* Elevated Product Card */}
      <div 
        className="relative bg-white rounded-2xl border border-[#EADCCE] overflow-hidden transition-all duration-300"
        style={{
          boxShadow: 'rgba(107, 79, 79, 0.05) 0px 4px 5px 0px, rgba(107, 79, 79, 0.04) 0px 8px 15px 0px, rgba(107, 79, 79, 0.09) 0px 30px 50px 0px'
        }}
      >
        {/* Card Header with Organizer Info */}
        <div className="p-6 pb-5 border-b border-[#EADCCE]/80 bg-[#FAF7F2]/50 flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80" 
                alt="Hoàng Mai Anh" 
                className="w-12 h-12 rounded-full object-cover border-2 border-[#D97706]/40 shadow-xs"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#D9232E] border-2 border-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-[#2A0A0A]">Hoàng Mai Anh</h4>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FEF3C7] text-[#9A3412] border border-[#FDE68A]">
                  Điều phối viên
                </span>
              </div>
              <p className="text-xs text-[#6B4F4F] mt-0.5">Khảo sát & Nghiên cứu Di tích Đại Mỗ</p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs font-semibold text-[#D97706] bg-[#FFFBEB] px-2.5 py-1 rounded-lg border border-[#FDE68A]">
            <Clock className="w-3.5 h-3.5" />
            <span>45 phút</span>
          </div>
        </div>

        {/* Card Body: Calendar Grid & Time Slots */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Calendar Section */}
          <div className="md:col-span-7">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#6B4F4F]">
                Tháng 9, 2026
              </span>
              <span className="text-[11px] font-bold text-[#D9232E] bg-[#FEF2F2] px-2 py-0.5 rounded-md border border-[#FEE2E2]">
                Múi giờ Hà Nội (GMT+7)
              </span>
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1.5 text-center">
              {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((d, i) => (
                <span key={i} className="text-[11px] font-bold text-[#C9B6B6] pb-1">
                  {d}
                </span>
              ))}
              {days.map((item, idx) => {
                const isSelected = item.day === selectedDay;
                const isAvailable = item.status === 'available';
                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={!isAvailable}
                    onClick={() => setSelectedDay(item.day)}
                    className={`h-9 w-full rounded-lg text-xs font-bold transition-all flex flex-col items-center justify-center relative ${
                      isSelected
                        ? 'bg-[#D9232E] text-white shadow-md shadow-[#D9232E]/30 scale-105 z-10'
                        : isAvailable
                        ? 'text-[#2A0A0A] hover:bg-[#F5EFE6] hover:text-[#D9232E] cursor-pointer'
                        : 'text-[#C9B6B6] cursor-not-allowed opacity-50'
                    }`}
                  >
                    {item.day}
                    {isAvailable && !isSelected && (
                      <span className="w-1 h-1 rounded-full bg-[#D97706] mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Location & Quick Feature */}
            <div className="mt-5 pt-4 border-t border-[#EADCCE] flex items-center justify-between">
              <button
                type="button"
                onClick={onOpenMap}
                className="flex items-center gap-2 text-xs font-semibold text-[#6B4F4F] hover:text-[#D9232E] transition-colors cursor-pointer text-left"
              >
                <MapPin className="w-3.5 h-3.5 text-[#D9232E]" />
                <span>Trực tiếp tại Di tích hoặc Google Meet →</span>
              </button>
            </div>
          </div>

          {/* Time Slots Section */}
          <div className="md:col-span-5 md:border-l md:border-[#EADCCE] md:pl-5 flex flex-col justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wider text-[#6B4F4F] mb-3">
                Khung giờ trống
              </p>
              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {timeSlots.map((slot) => {
                  const isActive = selectedSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`w-full py-2.5 px-3 rounded-lg text-xs font-bold transition-all text-left flex items-center justify-between border ${
                        isActive
                          ? 'border-[#D9232E] bg-[#FEF2F2] text-[#D9232E] shadow-xs'
                          : 'border-[#EADCCE] text-[#2A0A0A] hover:border-[#D97706] hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <span>{slot}</span>
                      {isActive && (
                        <span className="text-[10px] font-extrabold bg-[#D9232E] text-white px-1.5 py-0.5 rounded">
                          Đã chọn
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Confirmation Button */}
            <div className="mt-4 pt-3">
              <button
                type="button"
                onClick={handleBooking}
                className="w-full py-2.5 px-4 rounded-lg bg-[#D9232E] hover:bg-[#C81E1E] active:scale-[0.98] text-white font-bold text-xs tracking-tight transition-all shadow-md shadow-[#D9232E]/25 flex items-center justify-center gap-1.5"
              >
                <span>Xác nhận hẹn: Ngày {selectedDay}/09 lúc {selectedSlot}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Live Booking Confirmation Toast */}
        {isBooked && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-[#FEF2F2] text-[#D9232E] flex items-center justify-center mb-3 shadow-xs">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-extrabold text-[#2A0A0A]">Lịch hẹn đã được xác nhận!</h4>
            <p className="text-xs text-[#6B4F4F] mt-1 max-w-[280px]">
              Đã gửi thông tin lịch trình vào email của bạn. Thư mời Google Calendar đã được đính kèm.
            </p>
            <div className="mt-4 px-3 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#EADCCE] text-xs font-bold text-[#D97706] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ngày {selectedDay} Tháng 9 · {selectedSlot} (GMT+7)</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

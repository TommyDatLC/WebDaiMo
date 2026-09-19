import { useState, useEffect, type FC } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Navigation2,
  Share2,
  MapPin,
  Users,
  Maximize2,
  Compass,
  CheckCircle2,
  BookOpen,
  Landmark,
  Calendar,
  Building2,
  Image as ImageIcon,
  ArrowLeft,
  Award,
  Sparkles,
  Search,
  X,
} from 'lucide-react';
import { Relic } from './types';

interface WardInfoPanelProps {
  relics: Relic[];
  selectedRelicId: string | null;
  onSelectRelic: (id: string | null) => void;
  onFlyToRelic: (relic: Relic) => void;
  onDirectionsClick?: () => void;
  onShareClick?: () => void;
  onSaveClick?: () => void;
}

export const WardInfoPanel: FC<WardInfoPanelProps> = ({
  relics,
  selectedRelicId,
  onSelectRelic,
  onFlyToRelic,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeOverviewTab, setActiveOverviewTab] = useState<'relics' | 'ward' | 'boundary'>('relics');
  const [activeRelicTab, setActiveRelicTab] = useState<'overview' | 'history' | 'architecture' | 'photos'>('overview');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const selectedRelic = relics.find((r) => r.id === selectedRelicId) || null;
  const selectedIndex = selectedRelic ? relics.findIndex((r) => r.id === selectedRelic.id) : -1;

  // Reset photo index when selected relic changes
  useEffect(() => {
    setCurrentPhotoIndex(0);
    setActiveRelicTab('overview');
    if (selectedRelic) {
      setIsCollapsed(false);
    }
  }, [selectedRelicId, selectedRelic]);

  // Filter relics for directory
  const filteredRelics = relics.filter((r) => {
    const matchesFilter =
      activeFilter === 'all'
        ? true
        : activeFilter === 'QG'
        ? r.rankingBadge === 'QG'
        : activeFilter === 'TP'
        ? r.rankingBadge === 'TP'
        : r.type === activeFilter;

    const matchesSearch =
      searchQuery.trim() === '' ||
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.alias.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.worshipped.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.address.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });


  return (
    <>
      <div
        className={`absolute top-4 left-4 z-30 transition-all duration-300 ease-in-out pointer-events-auto select-none ${
          isCollapsed ? '-translate-x-[calc(100%+16px)]' : 'translate-x-0'
        }`}
      >
        <div className="w-[390px] sm:w-[420px] max-w-[calc(100vw-32px)] max-h-[calc(100vh-50px)] bg-white rounded-3xl shadow-2xl border border-gray-200/90 overflow-hidden flex flex-col">
          {/* RENDER MODE A: SPECIFIC RELIC DETAILS */}
          {selectedRelic ? (
            <div className="flex flex-col h-full overflow-hidden">
              {/* Back Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 shrink-0">
                <button
                  type="button"
                  onClick={() => onSelectRelic(null)}
                  className="flex items-center gap-1.5 text-xs font-bold text-[#5B4DF5] hover:text-[#4536DF] transition-colors active:scale-95"
                >
                  <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                  <span>Sổ tay di tích Đại Mỗ</span>
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                    {selectedIndex + 1}/{relics.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectRelic(null)}
                    title="Đóng chi tiết"
                    className="w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Container */}
              <div className="overflow-y-auto flex-1 no-scrollbar">
                {/* Hero Photo Carousel or Stylized Banner */}
                <div className="relative h-48 w-full bg-slate-900 overflow-hidden shrink-0 group">
                  {selectedRelic.images && selectedRelic.images.length > 0 ? (
                    <>
                      <img
                        src={selectedRelic.images[currentPhotoIndex]}
                        alt={selectedRelic.name}
                        className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                      {/* Carousel controls if multiple photos */}
                      {selectedRelic.images.length > 1 && (
                        <>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentPhotoIndex((prev) =>
                                prev === 0 ? selectedRelic.images.length - 1 : prev - 1
                              );
                            }}
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-transform active:scale-90"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentPhotoIndex((prev) =>
                                prev === selectedRelic.images.length - 1 ? 0 : prev + 1
                              );
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-transform active:scale-90"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>

                          {/* Dots */}
                          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
                            {selectedRelic.images.map((_, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => setCurrentPhotoIndex(idx)}
                                className={`h-1.5 rounded-full transition-all ${
                                  idx === currentPhotoIndex
                                    ? 'w-5 bg-white'
                                    : 'w-1.5 bg-white/50 hover:bg-white/80'
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}

                      {/* Fullscreen zoom button */}
                      <button
                        type="button"
                        onClick={() => setLightboxImage(selectedRelic.images[currentPhotoIndex])}
                        title="Xem ảnh phóng to"
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-all"
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                      </button>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#4338ca] text-white p-6 text-center">
                      <Landmark className="w-12 h-12 text-[#a5b4fc] mb-2 stroke-[1.5]" />
                      <p className="text-xs text-indigo-200 font-medium">Di tích Lịch sử – Văn hóa</p>
                    </div>
                  )}

                  {/* Badges Over Hero */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10.5px] font-extrabold tracking-wide uppercase shadow-md flex items-center gap-1 ${
                        selectedRelic.rankingBadge === 'QG'
                          ? 'bg-[#5B4DF5] text-white shadow-purple-900/30'
                          : 'bg-zinc-900 text-white border border-white/20 shadow-black/30'
                      }`}
                    >
                      <Award className="w-3 h-3" />
                      <span>{selectedRelic.ranking}</span>
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/95 text-zinc-900 backdrop-blur-md shadow-sm border border-white/40">
                      {selectedRelic.category}
                    </span>
                  </div>

                  {/* Title banner */}
                  <div className="absolute bottom-2.5 left-4 right-4 text-white">
                    <h2 className="text-xl font-black tracking-tight leading-tight drop-shadow-sm">
                      {selectedRelic.name}
                    </h2>
                    {selectedRelic.alias && selectedRelic.alias !== selectedRelic.name && (
                      <p className="text-xs text-purple-200/90 font-medium italic mt-0.5 truncate">
                        {selectedRelic.alias}
                      </p>
                    )}
                  </div>
                </div>

                {/* Sub Navigation Tabs */}
                <div className="flex border-b border-gray-100 px-3 bg-white sticky top-0 z-20 shadow-xs">
                  <button
                    type="button"
                    onClick={() => setActiveRelicTab('overview')}
                    className={`py-2.5 px-2.5 text-xs font-bold border-b-2 transition-colors ${
                      activeRelicTab === 'overview'
                        ? 'border-[#5B4DF5] text-[#5B4DF5]'
                        : 'border-transparent text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    Tổng quan
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveRelicTab('history')}
                    className={`py-2.5 px-2.5 text-xs font-bold border-b-2 transition-colors ${
                      activeRelicTab === 'history'
                        ? 'border-[#5B4DF5] text-[#5B4DF5]'
                        : 'border-transparent text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    Lịch sử & Thần tích
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveRelicTab('architecture')}
                    className={`py-2.5 px-2.5 text-xs font-bold border-b-2 transition-colors ${
                      activeRelicTab === 'architecture'
                        ? 'border-[#5B4DF5] text-[#5B4DF5]'
                        : 'border-transparent text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    Kiến trúc
                  </button>
                  {selectedRelic.images && selectedRelic.images.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setActiveRelicTab('photos')}
                      className={`py-2.5 px-2.5 text-xs font-bold border-b-2 transition-colors flex items-center gap-1 ${
                        activeRelicTab === 'photos'
                          ? 'border-[#5B4DF5] text-[#5B4DF5]'
                          : 'border-transparent text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      <span>Ảnh tư liệu</span>
                      <span className="text-[10px] bg-purple-100 text-[#5B4DF5] px-1.5 py-0.2 rounded-full font-bold">
                        {selectedRelic.images.length}
                      </span>
                    </button>
                  )}
                </div>

                {/* Tab Content Body */}
                <div className="p-4 space-y-4 text-xs">
                  {/* Action Buttons */}
                  <div className="grid grid-cols-3 gap-2 pb-2 border-b border-gray-100">
                    <button
                      type="button"
                      onClick={() => onFlyToRelic(selectedRelic)}
                      className="flex items-center justify-center gap-1.5 py-2 px-2.5 bg-[#5B4DF5] hover:bg-[#4D3EE0] text-white rounded-xl font-bold shadow-xs transition-all active:scale-95"
                    >
                      <Compass className="w-3.5 h-3.5" />
                      <span>Định vị</span>
                    </button>

                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${selectedRelic.coordinates[0]},${selectedRelic.coordinates[1]}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2 px-2.5 bg-gray-50 hover:bg-gray-100 text-gray-800 border border-gray-200 rounded-xl font-bold transition-all active:scale-95"
                    >
                      <Navigation2 className="w-3.5 h-3.5 text-[#5B4DF5]" />
                      <span>Chỉ đường</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        if (navigator.clipboard) {
                          navigator.clipboard.writeText(
                            `${selectedRelic.name} (${selectedRelic.alias})
Địa chỉ: ${selectedRelic.address}
Tọa độ: ${selectedRelic.coordinates[0]}, ${selectedRelic.coordinates[1]}`
                          );
                          alert(`Đã sao chép thông tin ${selectedRelic.name}!`);
                        }
                      }}
                      className="flex items-center justify-center gap-1.5 py-2 px-2.5 bg-gray-50 hover:bg-gray-100 text-gray-800 border border-gray-200 rounded-xl font-bold transition-all active:scale-95"
                    >
                      <Share2 className="w-3.5 h-3.5 text-gray-600" />
                      <span>Chia sẻ</span>
                    </button>
                  </div>

                  {/* TAB 1: TỔNG QUAN */}
                  {activeRelicTab === 'overview' && (
                    <div className="space-y-3.5">
                      {/* Summary callout */}
                      <div className="p-3 bg-purple-50/70 rounded-2xl border border-purple-100/90 text-purple-950 leading-relaxed font-medium">
                        {selectedRelic.summary}
                      </div>

                      {/* Detail Items */}
                      <div className="space-y-3 pt-1">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-4 h-4 text-[#5B4DF5] shrink-0 mt-0.5" />
                          <div>
                            <p className="font-bold text-gray-900">Địa chỉ cụ thể</p>
                            <p className="text-gray-600 mt-0.5 leading-snug">{selectedRelic.address}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Compass className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-bold text-gray-900">Tọa độ định vị GPS</p>
                            <p className="text-gray-600 font-mono text-[11px] mt-0.5">
                              {selectedRelic.coordinates[0].toFixed(6)}° N,{' '}
                              {selectedRelic.coordinates[1].toFixed(6)}° E
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Award className="w-4 h-4 text-[#5B4DF5] shrink-0 mt-0.5" />
                          <div>
                            <p className="font-bold text-gray-900">Quyết định xếp hạng</p>
                            <p className="text-gray-600 mt-0.5 leading-snug">{selectedRelic.decision}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Sparkles className="w-4 h-4 text-[#5B4DF5] shrink-0 mt-0.5" />
                          <div>
                            <p className="font-bold text-gray-900">Đối tượng thờ phụng chính</p>
                            <p className="text-gray-700 mt-0.5 font-medium leading-snug">
                              {selectedRelic.worshipped}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Maximize2 className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-bold text-gray-900">Tổng diện tích khuôn viên</p>
                            <p className="text-gray-600 mt-0.5 font-semibold">{selectedRelic.area}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Calendar className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-bold text-gray-900">Lễ hội & Sinh hoạt tín ngưỡng</p>
                            <p className="text-gray-600 mt-0.5 leading-snug">{selectedRelic.festival}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: LỊCH SỬ & THẦN TÍCH */}
                  {activeRelicTab === 'history' && (
                    <div className="space-y-2.5 leading-relaxed text-gray-700">
                      {selectedRelic.paragraphs
                        .filter(
                          (p) =>
                            !p.startsWith('GIỚI THIỆU') &&
                            !p.startsWith('01.') &&
                            !p.startsWith('02.') &&
                            !p.startsWith('03.') &&
                            !p.startsWith('04.') &&
                            !p.startsWith('07.') &&
                            !p.startsWith('08.') &&
                            !p.startsWith('09.') &&
                            !p.startsWith('10.') &&
                            !p.startsWith('TÀI LIỆU') &&
                            !p.startsWith('Trang nguồn') &&
                            !p.startsWith('Vị trí trên map')
                        )
                        .map((para, idx) => {
                          const isHeading = /^(I|II|III|IV|V|VI|VII|VIII)\./.test(para);
                          const isSubHeading = /^\d+\./.test(para);

                          if (isHeading) {
                            return (
                              <h3
                                key={idx}
                                className="font-extrabold text-sm text-[#5B4DF5] pt-3 pb-1 border-b border-gray-100 flex items-center gap-1.5"
                              >
                                <span className="w-2 h-2 rounded-full bg-[#5B4DF5]" />
                                <span>{para}</span>
                              </h3>
                            );
                          }
                          if (isSubHeading) {
                            return (
                              <h4 key={idx} className="font-bold text-gray-900 pt-1">
                                {para}
                              </h4>
                            );
                          }
                          return (
                            <p key={idx} className="text-gray-600 text-[11.5px] leading-relaxed">
                              {para}
                            </p>
                          );
                        })}
                    </div>
                  )}

                  {/* TAB 3: KIẾN TRÚC & HIỆN VẬT */}
                  {activeRelicTab === 'architecture' && (
                    <div className="space-y-3 leading-relaxed text-gray-700">
                      <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200/80">
                        <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-[#5B4DF5]" />
                          <span>Đặc trưng kiến trúc di tích</span>
                        </h4>
                        <p className="text-[11.5px] text-gray-600 leading-relaxed">
                          Mang đậm phong cách kiến trúc truyền thống đồng bằng Bắc Bộ thời Hậu Lê và triều
                          Nguyễn với hệ thống kết cấu gỗ lim, vì kèo chạm khắc rồng, hoa văn tứ linh, mái đao
                          cong vút và không gian cảnh quan cây xanh, giếng cổ trang nghiêm.
                        </p>
                      </div>

                      <div className="space-y-2 text-[11.5px] text-gray-600">
                        {selectedRelic.paragraphs
                          .filter(
                            (p) =>
                              p.toLowerCase().includes('kiến trúc') ||
                              p.toLowerCase().includes('tượng thờ') ||
                              p.toLowerCase().includes('chuông') ||
                              p.toLowerCase().includes('phương đình') ||
                              p.toLowerCase().includes('đại bái') ||
                              p.toLowerCase().includes('hậu cung') ||
                              p.toLowerCase().includes('sắc phong')
                          )
                          .slice(0, 6)
                          .map((p, idx) => (
                            <div
                              key={idx}
                              className="p-2.5 bg-purple-50/40 rounded-xl border border-purple-100 text-gray-700"
                            >
                              {p}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 4: THƯ VIỆN ẢNH TƯ LIỆU */}
                  {activeRelicTab === 'photos' && selectedRelic.images && (
                    <div className="space-y-3">
                      <p className="text-[11px] text-gray-500 font-medium">
                        Ảnh tư liệu thực địa từ Sổ tay di tích ({selectedRelic.images.length} ảnh):
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedRelic.images.map((imgUrl, idx) => (
                          <div
                            key={idx}
                            onClick={() => setLightboxImage(imgUrl)}
                            className="group relative h-28 rounded-xl overflow-hidden cursor-pointer border border-gray-200 shadow-xs hover:border-[#5B4DF5] transition-all"
                          >
                            <img
                              src={imgUrl}
                              alt={`${selectedRelic.name} ảnh ${idx + 1}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                              <ImageIcon className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* RENDER MODE B: WARD OVERVIEW & RELICS DIRECTORY */
            <div className="flex flex-col h-full overflow-hidden">
              {/* Cover Photo Banner */}
              <div className="relative h-36 w-full bg-gradient-to-tr from-slate-950 via-purple-950 to-slate-900 overflow-hidden shrink-0">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-65 grayscale contrast-125"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Badge over photo */}
                <div className="absolute top-3 left-3 bg-[#5B4DF5] text-white px-2.5 py-1 rounded-full text-[10.5px] font-bold flex items-center gap-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span>Bản đồ hành chính & Di tích</span>
                </div>

                <div className="absolute bottom-2.5 left-4 right-4 text-white">
                  <h2 className="text-xl font-black tracking-tight">Phường Đại Mỗ</h2>
                  <p className="text-xs text-gray-300 font-medium">
                    Quận Nam Từ Liêm, Thành phố Hà Nội
                  </p>
                </div>
              </div>

              {/* Main Tab Navigation */}
              <div className="flex border-b border-gray-100 px-3 shrink-0 bg-white shadow-xs">
                <button
                  type="button"
                  onClick={() => setActiveOverviewTab('relics')}
                  className={`py-2.5 px-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
                    activeOverviewTab === 'relics'
                      ? 'border-[#5B4DF5] text-[#5B4DF5]'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Sổ tay di tích</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#5B4DF5] text-white font-black">
                    10
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveOverviewTab('ward')}
                  className={`py-2.5 px-3 text-xs font-bold border-b-2 transition-colors ${
                    activeOverviewTab === 'ward'
                      ? 'border-[#5B4DF5] text-[#5B4DF5]'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Thông tin phường
                </button>

                <button
                  type="button"
                  onClick={() => setActiveOverviewTab('boundary')}
                  className={`py-2.5 px-3 text-xs font-bold border-b-2 transition-colors ${
                    activeOverviewTab === 'boundary'
                      ? 'border-[#5B4DF5] text-[#5B4DF5]'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Ranh giới
                </button>
              </div>

              {/* Body Content */}
              <div className="overflow-y-auto flex-1 p-4 space-y-4 text-xs no-scrollbar">
                {/* TAB 1: SỔ TAY DI TÍCH (10 ĐỊA DANH) */}
                {activeOverviewTab === 'relics' && (
                  <div className="space-y-3">
                    {/* Header summary banner */}
                    <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200/80 flex items-center justify-between">
                      <div>
                        <p className="font-extrabold text-[#5B4DF5] text-xs">
                          10 Di tích Lịch sử – Văn hóa
                        </p>
                        <p className="text-[11px] text-gray-600 mt-0.5">
                          5 Di tích Quốc gia • 5 Di tích Cấp Thành phố
                        </p>
                      </div>
                      <Landmark className="w-6 h-6 text-[#5B4DF5] shrink-0 opacity-80" />
                    </div>

                    {/* Search & Filter pills */}
                    <div className="space-y-2">
                      {/* Search Bar */}
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Tìm chùa, đình, đền, nhân vật..."
                          className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#5B4DF5] focus:bg-white transition-all placeholder:text-gray-400"
                        />
                        {searchQuery && (
                          <button
                            type="button"
                            onClick={() => setSearchQuery('')}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </div>

                      {/* Filter Pills */}
                      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
                        {[
                          { id: 'all', label: 'Tất cả (10)' },
                          { id: 'QG', label: 'Quốc gia (5)' },
                          { id: 'TP', label: 'Thành phố (5)' },
                          { id: 'chua', label: 'Chùa (3)' },
                          { id: 'dinh', label: 'Đình (3)' },
                          { id: 'den', label: 'Đền (3)' },
                          { id: 'mieu', label: 'Miếu (1)' },
                        ].map((chip) => (
                          <button
                            key={chip.id}
                            type="button"
                            onClick={() => setActiveFilter(chip.id)}
                            className={`px-2.5 py-1 rounded-full text-[10.5px] font-bold whitespace-nowrap transition-all active:scale-95 ${
                              activeFilter === chip.id
                                ? 'bg-[#5B4DF5] text-white shadow-xs'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            {chip.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Relics Card List */}
                    <div className="space-y-2 pt-1">
                      {filteredRelics.length === 0 ? (
                        <div className="py-8 text-center text-gray-400">
                          <p>Không tìm thấy di tích phù hợp</p>
                        </div>
                      ) : (
                        filteredRelics.map((r) => (
                          <div
                            key={r.id}
                            onClick={() => {
                              onSelectRelic(r.id);
                              onFlyToRelic(r);
                            }}
                            className="group p-3 bg-white hover:bg-purple-50/40 rounded-2xl border border-gray-200/90 hover:border-[#5B4DF5]/60 shadow-xs hover:shadow-md cursor-pointer transition-all flex items-center gap-3 active:scale-[0.99]"
                          >
                            {/* Thumbnail or Category Icon */}
                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200/60 relative flex items-center justify-center">
                              {r.images && r.images.length > 0 ? (
                                <img
                                  src={r.images[0]}
                                  alt={r.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                />
                              ) : (
                                <Landmark className="w-5 h-5 text-[#5B4DF5]" />
                              )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-zinc-100 text-zinc-800 border border-zinc-200/90 tracking-tight">
                                  {r.category}
                                </span>
                                <span
                                  className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                                    r.rankingBadge === 'QG'
                                      ? 'bg-purple-50 text-[#5B4DF5] border-purple-200/90'
                                      : 'bg-zinc-100 text-zinc-700 border-zinc-200/90'
                                  }`}
                                >
                                  <span
                                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                      r.rankingBadge === 'QG' ? 'bg-[#5B4DF5]' : 'bg-zinc-500'
                                    }`}
                                  />
                                  {r.rankingBadge === 'QG' ? 'Di tích Quốc gia' : 'Di tích Thành phố'}
                                </span>
                              </div>

                              <h4 className="font-bold text-gray-900 group-hover:text-[#5B4DF5] transition-colors truncate">
                                {r.name}
                              </h4>
                              <p className="text-[10.5px] text-gray-500 truncate mt-0.5">
                                {r.worshipped}
                              </p>
                            </div>

                            {/* Arrow */}
                            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#5B4DF5] group-hover:translate-x-0.5 transition-all shrink-0" />
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* TAB 2: THÔNG TIN PHƯỜNG ĐẠI MỖ */}
                {activeOverviewTab === 'ward' && (
                  <div className="space-y-4">
                    {/* Stat Chips */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="p-3 bg-purple-50/70 rounded-2xl border border-purple-100 flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-[#5B4DF5] text-white flex items-center justify-center shrink-0 shadow-xs">
                          <Maximize2 className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[10.5px] text-gray-500 font-medium">Diện tích</p>
                          <p className="text-xs font-bold text-gray-900">~ 8,1 km²</p>
                        </div>
                      </div>

                      <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-gray-900 text-white flex items-center justify-center shrink-0">
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[10.5px] text-gray-500 font-medium">Dân số</p>
                          <p className="text-xs font-bold text-gray-900">80.462 người</p>
                        </div>
                      </div>
                    </div>

                    {/* Information Rows */}
                    <div className="space-y-3 pt-1">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-[#5B4DF5] shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-gray-900">Vị trí hành chính</p>
                          <p className="text-gray-600 mt-0.5">
                            Phường Đại Mỗ, Quận Nam Từ Liêm, Thành phố Hà Nội, Việt Nam
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Compass className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-gray-900">Tọa độ trung tâm</p>
                          <p className="text-gray-500 mt-0.5 font-mono">
                            20.9930° N, 105.7720° E
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#5B4DF5] shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-gray-900">Mã bưu chính & Hành chính</p>
                          <p className="text-gray-600 mt-0.5">
                            Mã hành chính: <strong>00637</strong> • Mã bưu chính: <strong>12010</strong>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: RANH GIỚI & ĐỊA LÝ */}
                {activeOverviewTab === 'boundary' && (
                  <div className="space-y-4">
                    <div className="p-3.5 bg-purple-50 rounded-2xl border border-purple-200 text-purple-950">
                      <p className="font-bold flex items-center gap-2 text-[#5B4DF5] mb-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#5B4DF5] inline-block" />
                        Đường viền ranh giới màu tím (Monotone Style)
                      </p>
                      <p className="text-[11.5px] leading-relaxed text-purple-900/90">
                        Đường viền nét đứt màu tím trên bản đồ thể hiện chính xác chu vi địa giới hành chính
                        của Phường Đại Mỗ theo cơ sở dữ liệu GIS chuẩn OpenStreetMap/Chính phủ.
                      </p>
                    </div>

                    <div className="space-y-2.5">
                      <h4 className="font-bold text-gray-900">Tiếp giáp địa lý:</h4>
                      <ul className="space-y-1.5 text-gray-600 pl-1">
                        <li className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#5B4DF5]" />
                          <span><strong>Phía Bắc:</strong> Giáp Láng - Hòa Lạc / Mễ Trì</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-800" />
                          <span><strong>Phía Đông:</strong> Giáp Thanh Xuân và Yên Hòa (Khuất Duy Tiến, Lương Thế Vinh)</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                          <span><strong>Phía Nam:</strong> Giáp Quận Hà Đông và Thanh Liệt (Tố Hữu)</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                          <span><strong>Phía Tây:</strong> Giáp Phường Tây Mỗ và Dương Nội (Sa Đôi)</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-2 pt-1 border-t border-gray-100">
                      <h4 className="font-bold text-gray-900">Trục giao thông chính:</h4>
                      <p className="text-gray-500 leading-relaxed">
                        Đường Tố Hữu (Lê Văn Lương kéo dài), Đường 70, Phố Sa Đôi, Phố Quang Tiến, Cầu Đôi Đại Mỗ, Sông Nhuệ chảy qua địa bàn.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Slide / Collapse Tab Handle on right */}
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Mở rộng bảng thông tin' : 'Thu gọn bảng thông tin'}
          className="absolute -right-9 top-6 w-9 h-9 bg-white rounded-r-xl shadow-lg border border-l-0 border-gray-200 flex items-center justify-center text-gray-700 hover:text-[#5B4DF5] hover:bg-gray-50 transition-all focus:outline-none"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          ) : (
            <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
          )}
        </button>
      </div>

      {/* Lightbox for Fullscreen Image Preview */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={lightboxImage}
              alt="Ảnh phóng to"
              className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl"
            />
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 text-sm font-bold flex items-center gap-1"
            >
              <X className="w-5 h-5" />
              <span>Đóng</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

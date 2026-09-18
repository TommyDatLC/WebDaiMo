import { useState, type FC } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Navigation2,
  Bookmark,
  Share2,
  Send,
  MapPin,
  Users,
  Maximize2,
  Compass,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

interface WardInfoPanelProps {
  onDirectionsClick?: () => void;
  onShareClick?: () => void;
  onSaveClick?: () => void;
}

export const WardInfoPanel: FC<WardInfoPanelProps> = ({
  onDirectionsClick,
  onShareClick,
  onSaveClick,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'boundary' | 'about'>('overview');

  return (
    <div
      className={`absolute top-4 left-4 z-30 transition-all duration-300 ease-in-out pointer-events-auto select-none ${
        isCollapsed ? '-translate-x-[calc(100%+16px)]' : 'translate-x-0'
      }`}
    >
      {/* Main Google Maps Information Card */}
      <div className="w-[380px] sm:w-[410px] max-w-[calc(100vw-32px)] max-h-[calc(100vh-60px)] bg-white rounded-3xl shadow-xl border border-gray-200/80 overflow-hidden flex flex-col">
        {/* Cover Photo Banner */}
        <div className="relative h-44 w-full bg-gradient-to-tr from-slate-900 via-purple-950 to-slate-800 overflow-hidden shrink-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-75 grayscale contrast-125"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

          {/* Badge over photo */}
          <div className="absolute top-3 left-3 bg-[#5B4DF5] text-white px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 shadow-md">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>Ranh giới hành chính</span>
          </div>

          <div className="absolute bottom-3 left-4 right-4 text-white">
            <h2 className="text-xl font-extrabold tracking-tight">Phường Đại Mỗ</h2>
            <p className="text-xs text-gray-300 font-medium">
              Quận Nam Từ Liêm, Thành phố Hà Nội
            </p>
          </div>
        </div>

        {/* Tab Header Bar */}
        <div className="flex border-b border-gray-100 px-4 shrink-0 bg-white">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-[#5B4DF5] text-[#5B4DF5]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Tổng quan
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('boundary')}
            className={`py-3 px-3 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'boundary'
                ? 'border-[#5B4DF5] text-[#5B4DF5]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Ranh giới & Quy hoạch
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('about')}
            className={`py-3 px-3 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'about'
                ? 'border-[#5B4DF5] text-[#5B4DF5]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Lịch sử & Địa danh
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-5 space-y-5">
          {/* Action Buttons (Purple Accent) */}
          <div className="flex items-center justify-around pb-2 border-b border-gray-100">
            <button
              type="button"
              onClick={onDirectionsClick}
              className="flex flex-col items-center group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-full bg-[#5B4DF5] text-white flex items-center justify-center shadow-md group-hover:bg-[#4D3EE0] transition-colors">
                <Navigation2 className="w-4 h-4 fill-white" />
              </div>
              <span className="mt-1.5 text-[11px] font-semibold text-[#5B4DF5]">
                Đường đi
              </span>
            </button>

            <button
              type="button"
              onClick={onSaveClick}
              className="flex flex-col items-center group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-full border border-gray-200 text-gray-700 flex items-center justify-center hover:bg-purple-50 hover:text-[#5B4DF5] hover:border-purple-200 transition-colors">
                <Bookmark className="w-4 h-4" />
              </div>
              <span className="mt-1.5 text-[11px] font-semibold text-gray-700">Lưu</span>
            </button>

            <button
              type="button"
              onClick={onShareClick}
              className="flex flex-col items-center group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-full border border-gray-200 text-gray-700 flex items-center justify-center hover:bg-purple-50 hover:text-[#5B4DF5] hover:border-purple-200 transition-colors">
                <Share2 className="w-4 h-4" />
              </div>
              <span className="mt-1.5 text-[11px] font-semibold text-gray-700">
                Chia sẻ
              </span>
            </button>

            <button
              type="button"
              onClick={onDirectionsClick}
              className="flex flex-col items-center group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-full border border-gray-200 text-gray-700 flex items-center justify-center hover:bg-purple-50 hover:text-[#5B4DF5] hover:border-purple-200 transition-colors">
                <Send className="w-4 h-4" />
              </div>
              <span className="mt-1.5 text-[11px] font-semibold text-gray-700">Gửi ĐT</span>
            </button>
          </div>

          {activeTab === 'overview' && (
            <div className="space-y-4 text-xs">
              {/* Stat Chips */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 bg-purple-50/60 rounded-2xl border border-purple-100 flex items-center gap-2.5">
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

          {activeTab === 'boundary' && (
            <div className="space-y-4 text-xs">
              <div className="p-3.5 bg-purple-50 rounded-2xl border border-purple-200 text-purple-950">
                <p className="font-bold flex items-center gap-2 text-[#5B4DF5] mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#5B4DF5] inline-block" />
                  Đường viền ranh giới màu tím (Monotone Style)
                </p>
                <p className="text-[11.5px] leading-relaxed text-purple-900/90">
                  Đường viền nét đứt màu tím trên bản đồ thể hiện chính xác chu vi địa giới hành chính của Phường Đại Mỗ theo cơ sở dữ liệu GIS chuẩn OpenStreetMap/Chính phủ.
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

          {activeTab === 'about' && (
            <div className="space-y-3.5 text-xs text-gray-600 leading-relaxed">
              <p>
                <strong>Đại Mỗ</strong> là một vùng đất cổ giàu truyền thống văn hóa lịch sử của Thăng Long - Hà Nội. Nơi đây xưa kia là một trong những cái nôi khoa bảng của kinh thành (nổi tiếng với câu ca <em>"Nhất Mỗ, nhì La, thứ ba Canh Cót"</em>).
              </p>
              <p>
                Ngày nay, Đại Mỗ đang chuyển mình mạnh mẽ với sự xuất hiện của các khu đô thị hiện đại, các tuyến đường vành đai và đại lộ liên kết trực tiếp với trung tâm Thủ đô.
              </p>
              <div className="pt-2">
                <a
                  href="https://vi.wikipedia.org/wiki/%C4%90%E1%BA%A1i_M%E1%BB%A1"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[#5B4DF5] font-bold hover:underline"
                >
                  <span>Tìm hiểu thêm trên Wikipedia</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Slide / Collapse Tab Handle on right */}
      <button
        type="button"
        onClick={() => setIsCollapsed(!isCollapsed)}
        title={isCollapsed ? 'Mở rộng thông tin Đại Mỗ' : 'Thu gọn thông tin'}
        className="absolute -right-9 top-6 w-9 h-9 bg-white rounded-r-xl shadow-lg border border-l-0 border-gray-200 flex items-center justify-center text-gray-700 hover:text-[#5B4DF5] hover:bg-gray-50 transition-all focus:outline-none"
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
        ) : (
          <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
        )}
      </button>
    </div>
  );
};

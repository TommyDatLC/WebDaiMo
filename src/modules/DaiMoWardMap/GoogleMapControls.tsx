import { useState, type FC } from 'react';
import { Layers, Plus, Minus, Crosshair, TrafficCone, Maximize2, Minimize2, Map, Satellite, Mountain } from 'lucide-react';
import { MapType } from './types';

interface GoogleMapControlsProps {
  mapType: MapType;
  onMapTypeChange: (type: MapType) => void;
  showTraffic: boolean;
  onToggleTraffic: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onRecenter: () => void;
  onToggleFullscreen?: () => void;
  isFullscreen?: boolean;
}

export const GoogleMapControls: FC<GoogleMapControlsProps> = ({
  mapType,
  onMapTypeChange,
  showTraffic,
  onToggleTraffic,
  onZoomIn,
  onZoomOut,
  onRecenter,
  onToggleFullscreen,
  isFullscreen = false,
}) => {
  const [layersMenuOpen, setLayersMenuOpen] = useState(false);

  return (
    <>
      {/* Bottom-Left: Google Maps Layer Switcher ("Lớp bản đồ") */}
      <div className="absolute bottom-6 left-4 z-30 pointer-events-auto select-none">
        <div className="relative">
          {/* Main Layer Thumbnail Button */}
          <button
            type="button"
            onClick={() => setLayersMenuOpen(!layersMenuOpen)}
            title="Lớp bản đồ Google Maps"
            className="group relative flex flex-col items-center justify-end w-16 h-16 rounded-2xl overflow-hidden shadow-lg border-2 border-white hover:scale-105 transition-all focus:outline-none"
          >
            {/* Thumbnail Preview Texture */}
            <div
              className={`absolute inset-0 bg-cover bg-center transition-all duration-300 ${
                mapType === 'satellite' ? 'bg-[#3b82f6]' : 'bg-[#155724]'
              }`}
              style={{
                backgroundImage:
                  mapType === 'satellite'
                    ? `linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%)`
                    : `radial-gradient(circle, #234d20 0%, #0d270f 100%)`,
              }}
            >
              <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:6px_6px]" />
            </div>

            <div className="relative z-10 w-full bg-black/60 backdrop-blur-[2px] py-1 text-center">
              <span className="text-[10.5px] font-bold text-white tracking-tight flex items-center justify-center gap-1">
                <Layers className="w-3 h-3" />
                <span>{mapType === 'satellite' ? 'Bản đồ' : 'Vệ tinh'}</span>
              </span>
            </div>
          </button>

          {/* Layer Options Popover */}
          {layersMenuOpen && (
            <div className="absolute left-0 bottom-full mb-2 w-52 bg-white rounded-2xl shadow-card border border-[#EADBCA] p-2 z-40 animate-in fade-in zoom-in-95 duration-150 font-sans">
              <div className="text-[11px] font-bold text-[#6B4F4F] uppercase px-2 py-1 tracking-wider">
                Loại bản đồ
              </div>
              <div className="grid grid-cols-3 gap-1.5 p-1">
                <button
                  type="button"
                  onClick={() => {
                    onMapTypeChange('roadmap');
                    setLayersMenuOpen(false);
                  }}
                  className={`flex flex-col items-center p-1.5 rounded-xl text-[11px] font-semibold transition-all ${
                    mapType === 'roadmap'
                      ? 'bg-red-50 text-[#C62828] border border-red-200 font-bold'
                      : 'hover:bg-[#F5EFE6] text-[#3B0D11]'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-[#F5EFE6] mb-1 flex items-center justify-center border border-[#EADBCA] shadow-xs">
                    <Map className="w-4 h-4 text-[#3B0D11]" />
                  </div>
                  <span>Mặc định</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onMapTypeChange('satellite');
                    setLayersMenuOpen(false);
                  }}
                  className={`flex flex-col items-center p-1.5 rounded-xl text-[11px] font-semibold transition-all ${
                    mapType === 'satellite'
                      ? 'bg-red-50 text-[#C62828] border border-red-200 font-bold'
                      : 'hover:bg-[#F5EFE6] text-[#3B0D11]'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-[#3B0D11] text-white mb-1 flex items-center justify-center border border-[#2E0509] shadow-xs">
                    <Satellite className="w-4 h-4 text-[#F59E0B]" />
                  </div>
                  <span>Vệ tinh</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onMapTypeChange('terrain');
                    setLayersMenuOpen(false);
                  }}
                  className={`flex flex-col items-center p-1.5 rounded-xl text-[11px] font-semibold transition-all ${
                    mapType === 'terrain'
                      ? 'bg-red-50 text-[#C62828] border border-red-200 font-bold'
                      : 'hover:bg-[#F5EFE6] text-[#3B0D11]'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-[#F5EFE6] text-[#3B0D11] mb-1 flex items-center justify-center border border-[#EADBCA] shadow-xs">
                    <Mountain className="w-4 h-4 text-[#6B4F4F]" />
                  </div>
                  <span>Địa hình</span>
                </button>
              </div>

              {/* Additional toggles */}
              <div className="border-t border-[#EADBCA]/60 mt-2 pt-2 px-1">
                <button
                  type="button"
                  onClick={onToggleTraffic}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                    showTraffic ? 'bg-red-50 text-[#C62828] font-bold' : 'hover:bg-[#F5EFE6] text-[#3B0D11]'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <TrafficCone className={`w-3.5 h-3.5 ${showTraffic ? 'text-[#C62828]' : 'text-[#6B4F4F]'}`} />
                    <span>Lớp giao thông</span>
                  </span>
                  <span
                    className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                      showTraffic ? 'bg-[#C62828] border-[#C62828]' : 'border-[#EADBCA]'
                    }`}
                  >
                    {showTraffic && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom-Right: Google Maps Action & Zoom Pill */}
      <div className="absolute bottom-6 right-4 z-30 flex flex-col items-center space-y-2 pointer-events-auto select-none">
        {/* Fullscreen toggle */}
        {onToggleFullscreen && (
          <button
            type="button"
            onClick={onToggleFullscreen}
            title={isFullscreen ? 'Thoát toàn màn hình' : 'Toàn màn hình'}
            className="w-10 h-10 bg-white rounded-xl shadow-md border border-[#EADBCA] flex items-center justify-center text-[#3B0D11] hover:text-[#C62828] hover:bg-[#F5EFE6] transition-all active:scale-95"
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4 stroke-[2.2]" />
            ) : (
              <Maximize2 className="w-4 h-4 stroke-[2.2]" />
            )}
          </button>
        )}

        {/* Locate / Center on Dai Mo Ward */}
        <button
          type="button"
          onClick={onRecenter}
          title="Định vị vào Phường Đại Mỗ"
          className="w-10 h-10 bg-white rounded-xl shadow-md border border-[#EADBCA] flex items-center justify-center text-[#3B0D11] hover:text-[#C62828] hover:bg-[#F5EFE6] transition-all active:scale-95"
        >
          <Crosshair className="w-4 h-4 stroke-[2.2]" />
        </button>

        {/* Google Pegman (Street View figure) */}
        <div
          title="Chế độ xem phố (Street View)"
          className="w-10 h-10 bg-white rounded-xl shadow-md border border-[#EADBCA] flex items-center justify-center cursor-grab hover:bg-[#F5EFE6] transition-all active:scale-95"
        >
          {/* Authentic Google Yellow Pegman Icon */}
          <svg className="w-5 h-5 text-amber-500 fill-current" viewBox="0 0 24 24">
            <circle cx="12" cy="5" r="3" />
            <path d="M12 9c-2.7 0-4 1.5-4 3v4h2v6h4v-6h2v-4c0-1.5-1.3-3-4-3z" />
          </svg>
        </div>

        {/* Google Maps Segmented Zoom (+ / -) Control */}
        <div className="bg-white rounded-xl shadow-md border border-[#EADBCA] flex flex-col divide-y divide-[#EADBCA]/60 overflow-hidden">
          <button
            type="button"
            onClick={onZoomIn}
            title="Phóng to"
            aria-label="Phóng to"
            className="w-10 h-9 flex items-center justify-center text-[#3B0D11] hover:text-[#C62828] hover:bg-[#F5EFE6] transition-colors active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </button>
          <button
            type="button"
            onClick={onZoomOut}
            title="Thu nhỏ"
            aria-label="Thu nhỏ"
            className="w-10 h-9 flex items-center justify-center text-[#3B0D11] hover:text-[#C62828] hover:bg-[#F5EFE6] transition-colors active:scale-95"
          >
            <Minus className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Bottom Google Branding & Attribution */}
      <div className="absolute bottom-1 left-24 z-20 pointer-events-none select-none hidden sm:flex items-center gap-2 text-[10px] text-gray-500 font-medium">
        <span className="font-extrabold tracking-tight text-gray-600">
          <span className="text-[#4285F4]">G</span>
          <span className="text-[#EA4335]">o</span>
          <span className="text-[#FBBC05]">o</span>
          <span className="text-[#4285F4]">g</span>
          <span className="text-[#34A853]">l</span>
          <span className="text-[#EA4335]">e</span>
        </span>
        <span className="bg-white/70 px-1.5 py-0.5 rounded text-[9.5px]">
          Dữ liệu bản đồ ©2026 • Tỉ lệ 500 m
        </span>
      </div>
    </>
  );
};

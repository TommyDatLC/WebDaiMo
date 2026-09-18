import { type FC } from 'react';
import { Crosshair, Plus, Minus } from 'lucide-react';

export interface ZoomControlsProps {
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  className?: string;
}

export const ZoomControls: FC<ZoomControlsProps> = ({
  onZoomIn,
  onZoomOut,
  className = '',
}) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-card border border-black/5 flex flex-col divide-y divide-gray-100 overflow-hidden ${className}`}
    >
      <button
        type="button"
        onClick={onZoomIn}
        title="Zoom in"
        aria-label="Zoom in"
        className="w-10 h-9 flex items-center justify-center text-gray-700 hover:text-[#5B4DF5] hover:bg-gray-50 transition-colors focus:outline-none active:scale-95"
      >
        <Plus className="w-4 h-4 stroke-[2.5]" />
      </button>
      <button
        type="button"
        onClick={onZoomOut}
        title="Zoom out"
        aria-label="Zoom out"
        className="w-10 h-9 flex items-center justify-center text-gray-700 hover:text-[#5B4DF5] hover:bg-gray-50 transition-colors focus:outline-none active:scale-95"
      >
        <Minus className="w-4 h-4 stroke-[2.5]" />
      </button>
    </div>
  );
};

export interface LocateButtonProps {
  onClick?: () => void;
  className?: string;
}

export const LocateButton: FC<LocateButtonProps> = ({
  onClick,
  className = '',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      title="Center map on your location"
      aria-label="Locate me"
      className={`w-10 h-10 bg-white rounded-xl shadow-card border border-black/5 flex items-center justify-center text-gray-700 hover:text-[#5B4DF5] hover:bg-gray-50 transition-all focus:outline-none active:scale-95 ${className}`}
    >
      <Crosshair className="w-4 h-4 stroke-[2.5]" />
    </button>
  );
};

export interface SatelliteToggleProps {
  isSatellite: boolean;
  onToggle: () => void;
  className?: string;
}

export const SatelliteToggle: FC<SatelliteToggleProps> = ({
  isSatellite,
  onToggle,
  className = '',
}) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      title="Toggle Satellite view"
      className={`group relative flex flex-col items-center justify-end w-14 h-14 rounded-2xl overflow-hidden shadow-card border-2 border-white hover:scale-105 transition-all focus:outline-none ${className}`}
    >
      <div
        className={`absolute inset-0 bg-cover bg-center transition-all duration-300 ${
          isSatellite ? 'bg-[#3b82f6]' : 'bg-[#264428]'
        }`}
        style={{
          backgroundImage: isSatellite
            ? `linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)`
            : `radial-gradient(circle, #2d5a32 0%, #152d18 100%)`,
        }}
      >
        <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:6px_6px]" />
      </div>

      <div className="relative z-10 w-full bg-black/60 backdrop-blur-[2px] py-0.5 text-center">
        <span className="text-[10px] font-bold text-white tracking-tight">
          {isSatellite ? 'Map' : 'Satellite'}
        </span>
      </div>
    </button>
  );
};

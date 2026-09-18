import type { FC } from 'react';
import { Menu, X } from 'lucide-react';

interface CardHeaderProps {
  onMenuClick?: () => void;
  onClose?: () => void;
}

export const CardHeader: FC<CardHeaderProps> = ({ onMenuClick, onClose }) => {
  return (
    <div className="flex items-center justify-between px-1 py-1 mb-5">
      <button
        onClick={onMenuClick}
        aria-label="Menu"
        className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-800 hover:bg-gray-100 transition-colors focus:outline-none"
      >
        <Menu className="w-6 h-6 stroke-[2.5]" />
      </button>

      <h1 className="text-[19px] font-bold tracking-tight text-gray-900 select-none">
        Directions
      </h1>

      <button
        onClick={onClose}
        aria-label="Close directions"
        className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-800 hover:bg-gray-100 transition-colors focus:outline-none"
      >
        <X className="w-6 h-6 stroke-[2.5]" />
      </button>
    </div>
  );
};

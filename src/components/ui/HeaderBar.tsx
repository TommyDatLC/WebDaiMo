import { type FC } from 'react';
import { Menu, X } from 'lucide-react';

export interface HeaderBarProps {
  title?: string;
  onMenuClick?: () => void;
  onClose?: () => void;
  className?: string;
}

export const HeaderBar: FC<HeaderBarProps> = ({
  title = 'Directions',
  onMenuClick,
  onClose,
  className = '',
}) => {
  return (
    <div className={`flex items-center justify-between px-1 py-1 ${className}`}>
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Menu"
        className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-800 hover:bg-gray-100 transition-colors focus:outline-none active:scale-95"
      >
        <Menu className="w-6 h-6 stroke-[2.5]" />
      </button>

      <h1 className="text-[19px] font-bold tracking-tight text-gray-900 select-none">
        {title}
      </h1>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-800 hover:bg-gray-100 transition-colors focus:outline-none active:scale-95"
      >
        <X className="w-6 h-6 stroke-[2.5]" />
      </button>
    </div>
  );
};

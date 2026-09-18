import { type FC, type ReactNode } from 'react';

export interface CircleButtonProps {
  id?: string;
  icon: ReactNode;
  label?: string;
  isActive?: boolean;
  onClick?: () => void;
  badge?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const CircleButton: FC<CircleButtonProps> = ({
  icon,
  label,
  isActive = false,
  onClick,
  badge,
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-9 h-9 text-xs',
    md: 'w-11 h-11 text-sm',
    lg: 'w-14 h-14 text-base',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center group min-w-[56px] focus:outline-none transition-transform duration-400 ease-expo active:scale-90 select-none ${className}`}
    >
      {/* Circle Icon Badge */}
      <div className="relative">
        <div
          className={`${sizeClasses[size]} rounded-full flex items-center justify-center transition-all duration-400 ease-expo shadow-sm ${
            isActive
              ? 'bg-purple-900 text-white ring-4 ring-purple-200/80 scale-105 shadow-md'
              : 'bg-[#5B4DF5] text-white hover:bg-[#4D3EE0] hover:shadow-md hover:scale-105'
          }`}
        >
          {icon}
        </div>

        {badge && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full ring-2 ring-white transition-transform duration-300 ease-expo">
            {badge}
          </span>
        )}
      </div>

      {/* Label */}
      {label && (
        <span className="mt-2 text-[11px] font-semibold text-gray-900 text-center leading-tight whitespace-pre-line tracking-tight group-hover:text-[#5B4DF5] transition-colors duration-400 ease-expo">
          {label}
        </span>
      )}
    </button>
  );
};

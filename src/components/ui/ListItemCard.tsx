import { type FC, type ReactNode } from 'react';

export interface ListItemCardProps {
  id: string;
  icon: ReactNode;
  title: string;
  subtitle?: string;
  primaryStat?: string;
  secondaryStat?: string;
  actionText?: string;
  onActionClick?: () => void;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export const ListItemCard: FC<ListItemCardProps> = ({
  icon,
  title,
  subtitle,
  primaryStat,
  secondaryStat,
  actionText,
  onActionClick,
  isActive = false,
  onClick,
  className = '',
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative px-6 py-2.5 cursor-pointer transition-all duration-150 select-none ${
        isActive ? 'bg-purple-50/30' : 'hover:bg-gray-50/80'
      } ${className}`}
    >
      {/* Vertical Active Indicator Pill Bar on the left */}
      {isActive && (
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-14 bg-[#5B4DF5] rounded-r-full shadow-sm"
          aria-hidden="true"
        />
      )}

      <div className="flex items-start justify-between">
        {/* Left Icon + Description */}
        <div className="flex items-start space-x-3.5 pr-2">
          <div className="mt-1 text-gray-900 shrink-0">{icon}</div>

          <div className="space-y-0.5">
            <h3 className="text-[13.5px] font-bold text-gray-900 leading-snug">
              {title}
            </h3>
            {subtitle && (
              <p className="text-[11.5px] font-medium text-gray-400 leading-tight">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right Stats */}
        {(primaryStat || secondaryStat) && (
          <div className="text-right shrink-0">
            {primaryStat && (
              <div className="text-[13.5px] font-bold text-[#5B4DF5] tracking-tight">
                {primaryStat}
              </div>
            )}
            {secondaryStat && (
              <div className="text-[11.5px] font-medium text-gray-400">
                {secondaryStat}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action link */}
      {actionText && (
        <div className="pl-8.5 mt-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onActionClick?.();
            }}
            className="text-[12.5px] font-bold text-[#5B4DF5] hover:underline focus:outline-none"
          >
            {actionText}
          </button>
        </div>
      )}
    </div>
  );
};

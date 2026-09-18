import { type FC, type ReactNode } from 'react';

export interface TabItem {
  id: string;
  icon: ReactNode;
  label?: string;
  subLabel?: string;
}

export interface TabBarProps {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export const TabBar: FC<TabBarProps> = ({
  items,
  activeId,
  onChange,
  className = '',
}) => {
  return (
    <div className={`flex items-start justify-between ${className}`}>
      {items.map((item) => {
        const isActive = activeId === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className="flex flex-col items-center group transition-transform active:scale-95 focus:outline-none"
            title={item.label || item.id}
          >
            {/* Square/Rounded Icon Badge */}
            <div
              className={`w-12 h-11 flex items-center justify-center rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-[#5B4DF5] text-white shadow-md shadow-indigo-200/60'
                  : 'text-[#5B4DF5] hover:bg-purple-50'
              }`}
            >
              {item.icon}
            </div>

            {/* Sub-label / Duration */}
            {item.subLabel ? (
              <span
                className={`mt-1.5 text-[11px] tracking-tight transition-colors ${
                  isActive
                    ? 'text-[#5B4DF5] font-bold'
                    : 'text-gray-900 font-semibold'
                }`}
              >
                {item.subLabel}
              </span>
            ) : (
              <span className="mt-1.5 h-[17px]" />
            )}
          </button>
        );
      })}
    </div>
  );
};

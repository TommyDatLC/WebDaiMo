import type { FC, ReactNode } from 'react';
import { Car, Train, Bike, CarFront } from 'lucide-react';
import { TravelModeId } from '../../types/directions';

interface TravelModeTabsProps {
  selectedMode: TravelModeId;
  onSelectMode: (mode: TravelModeId) => void;
}

interface ModeConfig {
  id: TravelModeId;
  duration?: string;
  icon: ReactNode;
  label: string;
}

export const TravelModeTabs: FC<TravelModeTabsProps> = ({
  selectedMode,
  onSelectMode,
}) => {
  const modes: ModeConfig[] = [
    {
      id: 'car',
      duration: '2h 32m',
      icon: <Car className="w-5 h-5 fill-current" />,
      label: 'Driving',
    },
    {
      id: 'transit',
      duration: '3h 29m',
      icon: <Train className="w-5 h-5" />,
      label: 'Transit',
    },
    {
      id: 'bike',
      duration: '1d',
      icon: <Bike className="w-5 h-5" />,
      label: 'Cycling',
    },
    {
      id: 'rideshare',
      icon: <CarFront className="w-5 h-5" />,
      label: 'Rideshare',
    },
  ];

  return (
    <div className="flex items-start justify-between px-3 mb-6">
      {modes.map((mode) => {
        const isSelected = selectedMode === mode.id;

        return (
          <button
            key={mode.id}
            onClick={() => onSelectMode(mode.id)}
            className="flex flex-col items-center group transition-transform active:scale-95 focus:outline-none"
            title={mode.label}
          >
            {/* Icon container */}
            <div
              className={`w-12 h-11 flex items-center justify-center rounded-xl transition-all duration-200 ${
                isSelected
                  ? 'bg-[#5B4DF5] text-white shadow-md shadow-indigo-200'
                  : 'text-[#5B4DF5] hover:bg-purple-50'
              }`}
            >
              {mode.icon}
            </div>

            {/* Duration text */}
            {mode.duration ? (
              <span
                className={`mt-1.5 text-[11px] tracking-tight ${
                  isSelected
                    ? 'text-[#5B4DF5] font-bold'
                    : 'text-gray-900 font-semibold'
                }`}
              >
                {mode.duration}
              </span>
            ) : (
              <span className="mt-1.5 h-[17px]"></span>
            )}
          </button>
        );
      })}
    </div>
  );
};

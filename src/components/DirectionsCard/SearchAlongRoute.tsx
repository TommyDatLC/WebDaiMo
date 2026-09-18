import { useState, type FC, type ReactNode, type ChangeEvent } from 'react';
import { Fuel, Utensils, MoreHorizontal, Users, Coffee, Bed, SlidersHorizontal } from 'lucide-react';
import { PoiCategoryId } from '../../types/directions';

interface SearchAlongRouteProps {
  activeCategory?: PoiCategoryId | null;
  onSelectCategory?: (category: PoiCategoryId) => void;
  onRadiusChange?: (radiusKm: number) => void;
}

interface CategoryItem {
  id: PoiCategoryId;
  label: string;
  icon: ReactNode;
}

export const SearchAlongRoute: FC<SearchAlongRouteProps> = ({
  activeCategory,
  onSelectCategory,
  onRadiusChange,
}) => {
  const [selected, setSelected] = useState<PoiCategoryId | null>(activeCategory || null);
  const [showRadiusSlider, setShowRadiusSlider] = useState(false);
  const [searchRadius, setSearchRadius] = useState(5); // 5km

  const categories: CategoryItem[] = [
    {
      id: 'toilets',
      label: 'Toilets',
      icon: <Users className="w-5 h-5 stroke-[2.2]" />,
    },
    {
      id: 'gas',
      label: 'Gas\nstations',
      icon: <Fuel className="w-5 h-5 stroke-[2.2]" />,
    },
    {
      id: 'restaurants',
      label: 'Restaurants',
      icon: <Utensils className="w-5 h-5 stroke-[2.2]" />,
    },
    {
      id: 'more',
      label: 'More',
      icon: <MoreHorizontal className="w-5 h-5 stroke-[2.5]" />,
    },
    {
      id: 'coffee',
      label: 'Cafes',
      icon: <Coffee className="w-5 h-5 stroke-[2.2]" />,
    },
    {
      id: 'hotel',
      label: 'Hotels',
      icon: <Bed className="w-5 h-5 stroke-[2.2]" />,
    },
  ];

  const handleClick = (id: PoiCategoryId) => {
    const next = selected === id ? null : id;
    setSelected(next);
    if (onSelectCategory && next) {
      onSelectCategory(next);
    }
  };

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setSearchRadius(val);
    if (onRadiusChange) {
      onRadiusChange(val);
    }
  };

  return (
    <div className="pt-1">
      {/* Title with slider toggle */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[13.5px] font-bold text-gray-900 tracking-tight select-none">
          Search along route
        </h2>
        <button
          onClick={() => setShowRadiusSlider(!showRadiusSlider)}
          title="Adjust search radius slider"
          className="text-gray-400 hover:text-[#5B4DF5] text-xs font-semibold flex items-center gap-1 transition-colors focus:outline-none"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>{searchRadius} km</span>
        </button>
      </div>

      {/* Interactive Search Radius Slider */}
      {showRadiusSlider && (
        <div className="mb-4 p-3 bg-purple-50/50 rounded-2xl border border-purple-100 space-y-1.5 animate-in fade-in duration-150">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-gray-700">Search radius:</span>
            <span className="font-bold text-[#5B4DF5]">{searchRadius} km from route</span>
          </div>
          <input
            type="range"
            min={1}
            max={25}
            step={1}
            value={searchRadius}
            onChange={handleSliderChange}
            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-gray-400 font-medium">
            <span>1 km (nearby)</span>
            <span>25 km (wide corridor)</span>
          </div>
        </div>
      )}

      {/* Category circular icon buttons slider / grid */}
      <div className="flex items-start justify-between gap-1 overflow-x-auto no-scrollbar pb-1">
        {categories.slice(0, 4).map((cat) => {
          const isSelected = selected === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => handleClick(cat.id)}
              className="flex flex-col items-center group min-w-[58px] focus:outline-none transition-transform active:scale-95"
            >
              {/* Circular purple icon button */}
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm ${
                  isSelected
                    ? 'bg-purple-900 text-white ring-4 ring-purple-200 scale-105'
                    : 'bg-[#5B4DF5] text-white hover:bg-[#4D3EE0] hover:shadow-md'
                }`}
              >
                {cat.icon}
              </div>

              {/* Category label (supports line break for 'Gas stations') */}
              <span className="mt-2 text-[11px] font-semibold text-gray-900 text-center leading-tight whitespace-pre-line tracking-tight">
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

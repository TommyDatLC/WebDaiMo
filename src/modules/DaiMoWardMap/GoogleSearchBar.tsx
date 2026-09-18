import { useState, type FC } from 'react';
import { Menu, Search, X, Navigation2, Utensils, Hotel, Fuel, Landmark as LandmarkIcon, CreditCard, Crosshair } from 'lucide-react';

interface GoogleSearchBarProps {
  onSearch?: (query: string) => void;
  onDirectionsClick?: () => void;
  onRecenter?: () => void;
  onFilterClick?: (category: string) => void;
}

export const GoogleSearchBar: FC<GoogleSearchBarProps> = ({
  onSearch,
  onDirectionsClick,
  onRecenter,
  onFilterClick,
}) => {
  const [query, setQuery] = useState('Phường Đại Mỗ, Nam Từ Liêm, Hà Nội');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filters = [
    { id: 'restaurant', label: 'Nhà hàng', icon: <Utensils className="w-3.5 h-3.5 text-red-500" /> },
    { id: 'hotel', label: 'Khách sạn', icon: <Hotel className="w-3.5 h-3.5 text-blue-500" /> },
    { id: 'attractions', label: 'Điểm tham quan', icon: <LandmarkIcon className="w-3.5 h-3.5 text-emerald-500" /> },
    { id: 'gas', label: 'Cây xăng', icon: <Fuel className="w-3.5 h-3.5 text-amber-500" /> },
    { id: 'atm', label: 'ATM', icon: <CreditCard className="w-3.5 h-3.5 text-purple-500" /> },
  ];

  const handleClear = () => {
    setQuery('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <div className="absolute top-4 left-4 z-40 w-[380px] sm:w-[420px] max-w-[calc(100vw-32px)] space-y-2 pointer-events-auto select-none">
      {/* Google Maps Main Search Card */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center h-12 bg-white rounded-full shadow-lg border border-black/10 px-3 transition-shadow hover:shadow-xl focus-within:shadow-xl"
      >
        {/* Hamburger Menu */}
        <button
          type="button"
          aria-label="Google Maps Menu"
          className="w-9 h-9 flex items-center justify-center text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
        >
          <Menu className="w-5 h-5 stroke-[2]" />
        </button>

        {/* Input field */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm kiếm trên Google Maps"
          className="flex-1 px-2.5 text-sm font-medium text-gray-800 bg-transparent outline-none placeholder:text-gray-400"
        />

        {/* Clear input button */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4 stroke-[2]" />
          </button>
        )}

        {/* Vertical divider */}
        <div className="h-6 w-px bg-gray-200 mx-1" />

        {/* Search button */}
        <button
          type="submit"
          aria-label="Search"
          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
        >
          <Search className="w-4 h-4 stroke-[2.2]" />
        </button>

        {/* Directions button (Google blue circular action button) */}
        <button
          type="button"
          onClick={onDirectionsClick}
          aria-label="Chỉ đường"
          title="Chỉ đường đến Đại Mỗ"
          className="w-9 h-9 ml-1 flex items-center justify-center bg-[#1a73e8] hover:bg-[#1557b0] text-white rounded-full shadow-sm hover:shadow transition-all active:scale-95"
        >
          <Navigation2 className="w-4 h-4 fill-white" />
        </button>
      </form>

      {/* Google Maps Quick Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {/* Re-center button */}
        <button
          type="button"
          onClick={onRecenter}
          className="flex items-center gap-1 px-3 py-1.5 bg-white/95 backdrop-blur-md hover:bg-white text-xs font-semibold text-gray-700 rounded-full shadow-md border border-gray-200 shrink-0 transition-all hover:border-gray-300 active:scale-95"
        >
          <Crosshair className="w-3.5 h-3.5 text-[#1a73e8]" />
          <span>Về Đại Mỗ</span>
        </button>

        {filters.map((f) => {
          const isSelected = activeFilter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => {
                const next = isSelected ? null : f.id;
                setActiveFilter(next);
                onFilterClick?.(f.id);
              }}
              className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-full shadow-md border shrink-0 transition-all active:scale-95 ${
                isSelected
                  ? 'bg-[#1a73e8] text-white border-[#1a73e8]'
                  : 'bg-white/95 backdrop-blur-md hover:bg-white text-gray-700 border-gray-200 hover:border-gray-300'
              }`}
            >
              {f.icon}
              <span>{f.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

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
    { id: 'restaurant', label: 'Nhà hàng', icon: <Utensils className="w-3.5 h-3.5 text-[#C62828]" /> },
    { id: 'hotel', label: 'Khách sạn', icon: <Hotel className="w-3.5 h-3.5 text-[#D97706]" /> },
    { id: 'attractions', label: 'Điểm tham quan', icon: <LandmarkIcon className="w-3.5 h-3.5 text-[#C62828]" /> },
    { id: 'gas', label: 'Cây xăng', icon: <Fuel className="w-3.5 h-3.5 text-[#F59E0B]" /> },
    { id: 'atm', label: 'ATM', icon: <CreditCard className="w-3.5 h-3.5 text-[#6B4F4F]" /> },
  ];

  const handleClear = () => {
    setQuery('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <div className="absolute top-4 left-4 z-40 w-[380px] sm:w-[420px] max-w-[calc(100vw-32px)] space-y-2 pointer-events-auto select-none font-sans">
      {/* Google Maps Main Search Card */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center h-12 bg-white rounded-full shadow-card border border-[#EADBCA] px-3 transition-shadow hover:shadow-warm-md focus-within:shadow-warm-md"
      >
        {/* Hamburger Menu */}
        <button
          type="button"
          aria-label="Google Maps Menu"
          className="w-9 h-9 flex items-center justify-center text-[#6B4F4F] hover:text-[#3B0D11] rounded-full hover:bg-[#F5EFE6] transition-colors"
        >
          <Menu className="w-5 h-5 stroke-[2]" />
        </button>

        {/* Input field */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm kiếm trên Google Maps"
          className="flex-1 px-2.5 text-sm font-medium text-[#3B0D11] bg-transparent outline-none placeholder:text-[#CDBBA7]"
        />

        {/* Clear input button */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="w-7 h-7 flex items-center justify-center text-[#CDBBA7] hover:text-[#3B0D11] rounded-full hover:bg-[#F5EFE6] transition-colors"
          >
            <X className="w-4 h-4 stroke-[2]" />
          </button>
        )}

        {/* Vertical divider */}
        <div className="h-6 w-px bg-[#EADBCA] mx-1" />

        {/* Search button */}
        <button
          type="submit"
          aria-label="Search"
          className="w-8 h-8 flex items-center justify-center text-[#6B4F4F] hover:text-[#3B0D11] rounded-full hover:bg-[#F5EFE6] transition-colors"
        >
          <Search className="w-4 h-4 stroke-[2.2]" />
        </button>

        {/* Directions button (Signal Red circular action button) */}
        <button
          type="button"
          onClick={onDirectionsClick}
          aria-label="Chỉ đường"
          title="Chỉ đường đến Đại Mỗ"
          className="w-9 h-9 ml-1 flex items-center justify-center bg-[#C62828] hover:bg-[#991B1B] text-white rounded-full shadow-sm hover:shadow transition-all active:scale-95"
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
          className="flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-[#F5EFE6] text-xs font-semibold text-[#3B0D11] rounded-full shadow-xs border border-[#EADBCA] shrink-0 transition-all hover:border-[#C62828] active:scale-95"
        >
          <Crosshair className="w-3.5 h-3.5 text-[#C62828]" />
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
              className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-full shadow-xs border shrink-0 transition-all active:scale-95 ${
                isSelected
                  ? 'bg-[#C62828] text-white border-[#C62828]'
                  : 'bg-white hover:bg-[#F5EFE6] text-[#6B4F4F] border-[#EADBCA] hover:border-[#CDBBA7]'
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

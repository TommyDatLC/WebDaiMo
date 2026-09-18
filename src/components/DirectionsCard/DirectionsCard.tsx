import { useState, type FC } from 'react';
import { ChevronLeft, ChevronRight, Navigation } from 'lucide-react';
import { CardHeader } from './CardHeader';
import { TravelModeTabs } from './TravelModeTabs';
import { RouteInputs } from './RouteInputs';
import { TripPlanningBar } from './TripPlanningBar';
import { RouteList } from './RouteList';
import { SearchAlongRoute } from './SearchAlongRoute';
import { TravelModeId, RouteOption, PoiCategoryId } from '../../types/directions';

export interface DirectionsCardProps {
  initialFrom?: string;
  initialTo?: string;
  initialMode?: TravelModeId;
  routes?: RouteOption[];
  selectedRouteId?: string;
  onSelectRoute?: (routeId: string) => void;
  onSearchCategory?: (cat: PoiCategoryId) => void;
  onRadiusChange?: (radius: number) => void;
  onClose?: () => void;
  className?: string;
}

const DEFAULT_ROUTES: RouteOption[] = [
  {
    id: 'route-1',
    name: 'via Trasa Bohaterów Bitwy Warszawskiej 1920',
    duration: '2h 32m',
    distance: '249km',
    trafficNote: 'Fastest route, due to traffic.',
    isFastest: true,
  },
  {
    id: 'route-2',
    name: 'via S8',
    duration: '2h 55m',
    distance: '230km',
    trafficNote: 'Straight route, big traffic.',
  },
];

export const DirectionsCard: FC<DirectionsCardProps> = ({
  initialFrom = 'Your location',
  initialTo = 'Bialystok',
  initialMode = 'car',
  routes = DEFAULT_ROUTES,
  selectedRouteId: controlledSelectedRouteId,
  onSelectRoute,
  onSearchCategory,
  onRadiusChange,
  onClose,
  className = '',
}) => {
  const [fromLocation, setFromLocation] = useState(initialFrom);
  const [toLocation, setToLocation] = useState(initialTo);
  const [selectedMode, setSelectedMode] = useState<TravelModeId>(initialMode);
  const [activeRouteId, setActiveRouteId] = useState(
    controlledSelectedRouteId || routes[0]?.id || 'route-1'
  );
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSwap = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  const handleSelectRoute = (id: string) => {
    setActiveRouteId(id);
    if (onSelectRoute) {
      onSelectRoute(id);
    }
  };

  return (
    <aside
      aria-label="Directions navigation panel"
      className={`relative z-20 transition-all duration-300 ease-in-out ${
        isCollapsed ? 'translate-x-[-92%]' : 'translate-x-0'
      } ${className}`}
    >
      <div className="relative w-[390px] sm:w-[410px] bg-white rounded-3xl shadow-floating border border-black/5 p-6 overflow-hidden">
        {/* Card Header */}
        <CardHeader
          onMenuClick={() => alert('Menu clicked')}
          onClose={onClose || (() => setIsCollapsed(true))}
        />

        {/* Travel Mode selector */}
        <TravelModeTabs
          selectedMode={selectedMode}
          onSelectMode={setSelectedMode}
        />

        {/* Inputs: From, To, Swap, Add Stop */}
        <RouteInputs
          fromLocation={fromLocation}
          toLocation={toLocation}
          onFromChange={setFromLocation}
          onToChange={setToLocation}
          onSwap={handleSwap}
        />

        {/* Trip options & Departure Time Slider */}
        <TripPlanningBar />

        {/* Route options list */}
        <RouteList
          routes={routes}
          selectedRouteId={activeRouteId}
          onSelectRoute={handleSelectRoute}
          onShowDirections={(route) =>
            alert(`Starting navigation for: ${route.name}`)
          }
        />

        {/* Search along route with POI buttons & Radius Slider */}
        <SearchAlongRoute
          onSelectCategory={onSearchCategory}
          onRadiusChange={onRadiusChange}
        />
      </div>

      {/* Collapsible / Slide toggle handle button on right edge */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label={isCollapsed ? 'Expand directions panel' : 'Collapse directions panel'}
        title={isCollapsed ? 'Expand panel' : 'Collapse panel'}
        className="absolute -right-5 top-8 w-10 h-10 bg-white rounded-full shadow-lg border border-black/10 flex items-center justify-center text-gray-700 hover:text-[#5B4DF5] hover:shadow-xl transition-all focus:outline-none group z-30"
      >
        {isCollapsed ? (
          <div className="flex items-center">
            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        ) : (
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
        )}
      </button>

      {/* Minimized Pill when collapsed */}
      {isCollapsed && (
        <div
          onClick={() => setIsCollapsed(false)}
          className="absolute left-full ml-8 top-8 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-black/5 flex items-center gap-3 cursor-pointer hover:bg-white transition-all text-xs font-bold text-gray-800"
        >
          <Navigation className="w-4 h-4 text-[#5B4DF5] fill-[#5B4DF5]" />
          <span>2h 32m to {toLocation}</span>
        </div>
      )}
    </aside>
  );
};

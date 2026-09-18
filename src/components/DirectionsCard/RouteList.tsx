import type { FC } from 'react';
import { Car } from 'lucide-react';
import { RouteOption } from '../../types/directions';

interface RouteListProps {
  routes: RouteOption[];
  selectedRouteId: string;
  onSelectRoute: (id: string) => void;
  onShowDirections?: (route: RouteOption) => void;
}

export const RouteList: FC<RouteListProps> = ({
  routes,
  selectedRouteId,
  onSelectRoute,
  onShowDirections,
}) => {
  return (
    <div className="space-y-4 mb-6">
      {routes.map((route) => {
        const isSelected = selectedRouteId === route.id;

        return (
          <div
            key={route.id}
            onClick={() => onSelectRoute(route.id)}
            className={`relative -mx-6 px-6 py-2.5 cursor-pointer transition-all duration-150 ${
              isSelected
                ? 'bg-purple-50/20'
                : 'hover:bg-gray-50/70'
            }`}
          >
            {/* Left vertical active indicator pill */}
            {isSelected && (
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-14 bg-[#5B4DF5] rounded-r-full shadow-sm"
                aria-hidden="true"
              />
            )}

            <div className="flex items-start justify-between">
              {/* Left icon + route description */}
              <div className="flex items-start space-x-3.5 pr-2">
                <div className="mt-1 text-gray-900 shrink-0">
                  <Car className="w-5 h-5 fill-current" />
                </div>

                <div className="space-y-0.5">
                  <h3 className="text-[13.5px] font-bold text-gray-900 leading-snug">
                    {route.name}
                  </h3>
                  <p className="text-[11.5px] font-medium text-gray-400 leading-tight">
                    {route.trafficNote}
                  </p>
                </div>
              </div>

              {/* Right side: Duration & Distance */}
              <div className="text-right shrink-0">
                <div className="text-[13.5px] font-bold text-[#5B4DF5] tracking-tight">
                  {route.duration}
                </div>
                <div className="text-[11.5px] font-medium text-gray-400">
                  {route.distance}
                </div>
              </div>
            </div>

            {/* "Directions" link button */}
            <div className="pl-8.5 mt-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectRoute(route.id);
                  if (onShowDirections) {
                    onShowDirections(route);
                  }
                }}
                className="text-[12.5px] font-bold text-[#5B4DF5] hover:underline focus:outline-none"
              >
                Directions
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

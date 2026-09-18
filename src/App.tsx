import { useState } from 'react';
import { DirectionsCard } from './components/DirectionsCard/DirectionsCard';
import { MapBackground } from './components/Map/MapBackground';
import { PoiCategoryId } from './types/directions';

export function App() {
  const [activeRouteId, setActiveRouteId] = useState<string>('route-1');
  const [notification, setNotification] = useState<string | null>(null);

  const triggerNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 3000);
  };

  const handleRouteSelect = (routeId: string) => {
    setActiveRouteId(routeId);
    triggerNotice(
      routeId === 'route-1'
        ? 'Selected fastest route via Trasa Bohaterów'
        : 'Selected alternative route via S8'
    );
  };

  const handleSearchCategory = (category: PoiCategoryId) => {
    const labels: Record<PoiCategoryId, string> = {
      toilets: 'Restrooms',
      gas: 'Gas Stations',
      restaurants: 'Restaurants',
      more: 'More categories',
      coffee: 'Cafes',
      hotel: 'Hotels',
    };
    triggerNotice(`Searching for ${labels[category]} along route...`);
  };

  const handleRadiusChange = (radiusKm: number) => {
    triggerNotice(`Updated POI search corridor to ${radiusKm} km`);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-100 font-sans">
      {/* Background Interactive Map */}
      <MapBackground activeRouteId={activeRouteId} />

      {/* Floating Directions Card Container */}
      <main className="absolute top-0 left-0 p-4 sm:p-6 lg:p-8 z-20 pointer-events-none">
        <div className="pointer-events-auto">
          <DirectionsCard
            initialFrom="Your location"
            initialTo="Bialystok"
            selectedRouteId={activeRouteId}
            onSelectRoute={handleRouteSelect}
            onSearchCategory={handleSearchCategory}
            onRadiusChange={handleRadiusChange}
          />
        </div>
      </main>

      {/* Interactive Action Toast Notification */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="bg-gray-900/90 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xl backdrop-blur-md flex items-center gap-2 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-[#5B4DF5] animate-pulse" />
            <span>{notification}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

import { useState } from 'react';
import { RedGoldLandingPage } from './components/RedGoldLanding';
import { DaiMoWardMap } from './modules/DaiMoWardMap';
import { ArrowLeft } from 'lucide-react';

export function App() {
  const [showMap, setShowMap] = useState<boolean>(false);

  return (
    <div className="min-h-screen w-full m-0 p-0 relative">
      {/* View 1: Red & Gold Full Landing Page */}
      {!showMap && (
        <RedGoldLandingPage onOpenMap={() => setShowMap(true)} />
      )}

      {/* View 2: Full-screen Interactive Dai Mo Ward GIS Map */}
      {showMap && (
        <div className="fixed inset-0 z-50 w-full h-full bg-[#111827] overflow-hidden">
          {/* Floating Back to Portal Button */}
          <div className="absolute top-4 right-4 z-40">
            <button
              type="button"
              onClick={() => setShowMap(false)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/95 hover:bg-white text-[#2A0A0A] font-bold text-xs shadow-xl border border-[#EADCCE] backdrop-blur-md transition-all active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 text-[#D9232E]" />
              <span>Quay lại Trang chủ Portal</span>
            </button>
          </div>

          <DaiMoWardMap />
        </div>
      )}
    </div>
  );
}

export default App;

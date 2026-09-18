import { useState, type FC } from 'react';
import { Crosshair, Plus, Minus } from 'lucide-react';

interface MapBackgroundProps {
  activeRouteId?: string;
}

export const MapBackground: FC<MapBackgroundProps> = ({
  activeRouteId = 'route-1',
}) => {
  const [isSatellite, setIsSatellite] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 0.15, 1.6));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(z - 0.15, 0.8));
  const handleReset = () => setZoomLevel(1);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#e5e7eb] select-none">
      {/* Map Surface (Vector Cartography / Satellite Mode) */}
      <div
        className="w-full h-full transition-transform duration-300 ease-out origin-center"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        {isSatellite ? (
          /* Satellite Imagery Simulation */
          <div className="w-full h-full relative bg-[#1c2e1e] overflow-hidden">
            <div
              className="absolute inset-0 opacity-70 bg-cover bg-center"
              style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, #2f4f34 0%, #17281a 100%)`,
              }}
            />
            {/* Grid texture for satellite feel */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
                backgroundSize: '120px 120px',
              }}
            />
          </div>
        ) : (
          /* High-Fidelity Vector Road Map */
          <svg
            className="w-full h-full text-gray-500"
            viewBox="0 0 1600 1000"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Base land mass */}
            <rect width="100%" height="100%" fill="#f3f4f6" />

            {/* Subtle administrative region boundary lines */}
            <g stroke="#d1d5db" strokeWidth="1.2" strokeDasharray="6,4" fill="none" opacity="0.8">
              <path d="M 300,50 Q 450,200 500,400 T 400,800" />
              <path d="M 600,0 Q 750,300 800,600 T 900,1000" />
              <path d="M 1000,50 Q 1150,250 1200,550 T 1300,950" />
              <path d="M 0,350 Q 500,320 900,420 T 1600,300" />
              <path d="M 0,650 Q 500,720 1000,620 T 1600,700" />
            </g>

            {/* Minor roads */}
            <g stroke="#e5e7eb" strokeWidth="2.5" fill="none">
              <path d="M 150,150 L 550,320 L 750,420 L 1150,280" />
              <path d="M 350,850 L 580,600 L 720,490 L 1250,550" />
              <path d="M 850,120 L 820,380 L 1050,490 L 1400,520" />
            </g>

            {/* Secondary highway routes (e.g. S8 / Alternative) */}
            <path
              d="M 680,510 Q 820,440 920,360 T 1120,270"
              fill="none"
              stroke={activeRouteId === 'route-2' ? '#5B4DF5' : '#cbd5e1'}
              strokeWidth={activeRouteId === 'route-2' ? '5.5' : '3.5'}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-300"
            />

            {/* Primary active route line (Warsaw / Skierniewice to Bialystok) */}
            <path
              d="M 680,510 C 720,495 755,470 780,450 C 810,425 845,370 885,335 C 925,300 970,278 1020,270 L 1120,268"
              fill="none"
              stroke={activeRouteId === 'route-1' ? '#5B4DF5' : '#94a3b8'}
              strokeWidth={activeRouteId === 'route-1' ? '6' : '3.5'}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-300 drop-shadow-sm"
            />

            {/* Start point marker (near Warsaw / Skierniewice) */}
            <g transform="translate(680, 510)">
              <circle r="9" fill="#5B4DF5" fillOpacity="0.25" />
              <circle r="5" fill="#5B4DF5" stroke="#ffffff" strokeWidth="2" />
              <text x="-45" y="18" fill="#4b5563" fontSize="11" fontWeight="600">
                Skierniewice
              </text>
            </g>

            {/* Mid waypoint label (Warszawa) */}
            <g transform="translate(780, 450)">
              <circle r="3.5" fill="#9ca3af" />
              <text x="8" y="4" fill="#374151" fontSize="12" fontWeight="700">
                Warszawa
              </text>
            </g>

            {/* Destination Pin (Bialystok) */}
            <g transform="translate(1120, 268)">
              {/* Pulsing halo */}
              <circle r="14" fill="#5B4DF5" fillOpacity="0.2" className="animate-ping" />
              {/* Pin circle */}
              <circle r="7" fill="#5B4DF5" stroke="#ffffff" strokeWidth="2.5" />
              <circle r="2.5" fill="#ffffff" />
              <text x="12" y="4" fill="#111827" fontSize="13" fontWeight="800" letterSpacing="-0.2px">
                Bialystok
              </text>
            </g>

            {/* Geographical City Place Labels matching reference */}
            <g fill="#4b5563" fontSize="10.5" fontWeight="500" letterSpacing="0.2px">
              <text x="960" y="255">Lomza</text>
              <text x="980" y="305">Zambrow</text>
              <text x="880" y="275">Ostroleka</text>
              <text x="1100" y="360">Bielsk Podlaski</text>
              <text x="1000" y="420">Siemiatycze</text>
              <text x="1200" y="500">Brest</text>
              <text x="1140" y="145">Grodno</text>
              <text x="1350" y="260">Vawkavysk</text>
              <text x="1420" y="460">Kobryn</text>
              <text x="900" y="470">Siedlce</text>
              <text x="760" y="635">Radom</text>
              <text x="980" y="665">Lublin</text>
              <text x="1010" y="625">Lubartow</text>
              <text x="560" y="560">Lodz</text>
              <text x="700" y="380">Legionowo</text>
              <text x="640" y="270">Mlawa</text>
              <text x="550" y="360">Plock</text>
              <text x="600" y="180">Olsztyn</text>
              <text x="820" y="100">Elblag</text>
              <text x="1050" y="50">Suwalki</text>
            </g>
          </svg>
        )}
      </div>

      {/* Map Control: Satellite Toggle (Bottom Center-Left) */}
      <div className="absolute bottom-6 left-[430px] sm:left-[450px] z-20">
        <button
          onClick={() => setIsSatellite(!isSatellite)}
          title="Toggle Satellite view"
          className="group relative flex flex-col items-center justify-end w-14 h-14 rounded-2xl overflow-hidden shadow-card border-2 border-white hover:scale-105 transition-all focus:outline-none"
        >
          {/* Satellite thumbnail background */}
          <div
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-300 ${
              isSatellite ? 'bg-[#3b82f6]' : 'bg-[#264428]'
            }`}
            style={{
              backgroundImage: isSatellite
                ? `linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)`
                : `radial-gradient(circle, #2d5a32 0%, #152d18 100%)`,
            }}
          >
            {/* Visual satellite forest texture */}
            <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:6px_6px]" />
          </div>

          <div className="relative z-10 w-full bg-black/60 backdrop-blur-[2px] py-0.5 text-center">
            <span className="text-[10px] font-bold text-white tracking-tight">
              {isSatellite ? 'Map' : 'Satellite'}
            </span>
          </div>
        </button>
      </div>

      {/* Map Controls: Locate & Zoom (+/-) (Bottom Right) */}
      <div className="absolute bottom-6 right-6 z-20 flex flex-col items-center space-y-2">
        {/* Locate Me / Compass button */}
        <button
          onClick={handleReset}
          title="Center on user location"
          className="w-10 h-10 bg-white rounded-xl shadow-card border border-black/5 flex items-center justify-center text-gray-700 hover:text-[#5B4DF5] hover:bg-gray-50 transition-all focus:outline-none"
        >
          <Crosshair className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* Zoom In/Out control pill */}
        <div className="bg-white rounded-xl shadow-card border border-black/5 flex flex-col divide-y divide-gray-100 overflow-hidden">
          <button
            onClick={handleZoomIn}
            title="Zoom in"
            className="w-10 h-9 flex items-center justify-center text-gray-700 hover:text-[#5B4DF5] hover:bg-gray-50 transition-colors focus:outline-none"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </button>
          <button
            onClick={handleZoomOut}
            title="Zoom out"
            className="w-10 h-9 flex items-center justify-center text-gray-700 hover:text-[#5B4DF5] hover:bg-gray-50 transition-colors focus:outline-none"
          >
            <Minus className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};

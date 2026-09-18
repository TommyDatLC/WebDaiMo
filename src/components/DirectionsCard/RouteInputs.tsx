import { useState, type FC } from 'react';
import { ArrowUpDown, PlusCircle, Trash2 } from 'lucide-react';

interface RouteInputsProps {
  fromLocation: string;
  toLocation: string;
  onFromChange: (val: string) => void;
  onToChange: (val: string) => void;
  onSwap: () => void;
}

export const RouteInputs: FC<RouteInputsProps> = ({
  fromLocation,
  toLocation,
  onFromChange,
  onToChange,
  onSwap,
}) => {
  const [stops, setStops] = useState<string[]>([]);

  const handleAddStop = () => {
    if (stops.length < 3) {
      setStops([...stops, '']);
    }
  };

  const handleRemoveStop = (index: number) => {
    setStops(stops.filter((_, i) => i !== index));
  };

  const handleStopChange = (index: number, val: string) => {
    const updated = [...stops];
    updated[index] = val;
    setStops(updated);
  };

  return (
    <div className="space-y-2.5 mb-4">
      <div className="relative">
        {/* From Input */}
        <div className="flex items-center space-x-2.5 mb-2.5">
          <span className="w-11 text-[13px] font-semibold text-gray-900 shrink-0">
            From:
          </span>
          <div className="flex-1 relative">
            <input
              type="text"
              value={fromLocation}
              onChange={(e) => onFromChange(e.target.value)}
              placeholder="Your location"
              className="w-full h-10 px-3.5 text-xs font-semibold text-gray-800 bg-white border border-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5B4DF5]/40 transition-all placeholder:text-gray-500"
            />
          </div>
          {/* Spacer for swap alignment */}
          <div className="w-7 shrink-0" />
        </div>

        {/* Dynamic Stops */}
        {stops.map((stop, idx) => (
          <div key={idx} className="flex items-center space-x-2.5 mb-2.5">
            <span className="w-11 text-[13px] font-semibold text-gray-900 shrink-0">
              Stop {idx + 1}:
            </span>
            <div className="flex-1 relative">
              <input
                type="text"
                value={stop}
                onChange={(e) => handleStopChange(idx, e.target.value)}
                placeholder="Enter waypoint stop"
                className="w-full h-10 px-3.5 text-xs font-semibold text-gray-800 bg-white border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5B4DF5]/40 transition-all"
              />
            </div>
            <button
              onClick={() => handleRemoveStop(idx)}
              className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
              title="Remove stop"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}

        {/* To Input */}
        <div className="flex items-center space-x-2.5">
          <span className="w-11 text-[13px] font-semibold text-gray-900 shrink-0">
            To:
          </span>
          <div className="flex-1 relative">
            <input
              type="text"
              value={toLocation}
              onChange={(e) => onToChange(e.target.value)}
              placeholder="Bialystok"
              className="w-full h-10 px-3.5 text-xs font-semibold text-gray-800 bg-white border border-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5B4DF5]/40 transition-all placeholder:text-gray-500"
            />
          </div>
          {/* Spacer for swap alignment */}
          <div className="w-7 shrink-0" />
        </div>

        {/* Swap button placed between From and To */}
        <button
          onClick={onSwap}
          aria-label="Swap origin and destination"
          title="Swap starting point and destination"
          className="absolute right-0 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center text-gray-800 hover:text-[#5B4DF5] hover:bg-gray-100 rounded-lg transition-all"
        >
          <ArrowUpDown className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      {/* Add stop button */}
      <div className="pt-0.5">
        <button
          onClick={handleAddStop}
          className="inline-flex items-center text-[12px] font-semibold text-gray-900 hover:text-[#5B4DF5] transition-colors focus:outline-none group"
        >
          <PlusCircle className="w-4 h-4 mr-1.5 stroke-[2] group-hover:scale-105 transition-transform" />
          Add stop
        </button>
      </div>
    </div>
  );
};

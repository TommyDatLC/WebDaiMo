import { useState, type FC } from 'react';
import { ChevronDown, Clock, Sliders } from 'lucide-react';
import { Slider } from '../ui/Slider';

interface TripPlanningBarProps {
  onDepartureChange?: (timeStr: string) => void;
}

export const TripPlanningBar: FC<TripPlanningBarProps> = ({
  onDepartureChange,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [timingType, setTimingType] = useState<'leave_now' | 'depart_at' | 'arrive_by'>('leave_now');
  const [showSlider, setShowSlider] = useState(false);
  const [timeMinutes, setTimeMinutes] = useState(510); // 08:30 AM default (510 min)

  const formatMinutes = (totalMin: number) => {
    const hours = Math.floor(totalMin / 60);
    const mins = totalMin % 60;
    const padH = hours.toString().padStart(2, '0');
    const padM = mins.toString().padStart(2, '0');
    return `${padH}:${padM}`;
  };

  const getTrafficStatus = (mins: number) => {
    // Simulated traffic patterns (morning rush 7:30-9:30, evening 16:30-18:30)
    if ((mins >= 450 && mins <= 570) || (mins >= 990 && mins <= 1110)) {
      return { status: 'Heavy Traffic', color: 'text-amber-600', badge: 'bg-amber-100 text-amber-800' };
    }
    if ((mins >= 420 && mins < 450) || (mins > 570 && mins <= 630)) {
      return { status: 'Moderate Traffic', color: 'text-blue-600', badge: 'bg-blue-100 text-blue-800' };
    }
    return { status: 'Light Traffic', color: 'text-emerald-600', badge: 'bg-emerald-100 text-emerald-800' };
  };

  const trafficInfo = getTrafficStatus(timeMinutes);

  return (
    <div className="mb-4">
      {/* Top action row */}
      <div className="flex items-center justify-between py-1">
        {/* Dropdown toggle */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center text-[12.5px] font-bold text-gray-900 hover:text-[#5B4DF5] transition-colors focus:outline-none"
          >
            {timingType === 'leave_now' && 'Leave now'}
            {timingType === 'depart_at' && `Depart at ${formatMinutes(timeMinutes)}`}
            {timingType === 'arrive_by' && `Arrive by ${formatMinutes(timeMinutes)}`}
            <ChevronDown className="w-3.5 h-3.5 ml-1 stroke-[3]" />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute left-0 top-full mt-1.5 w-44 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-30 animate-in fade-in zoom-in-95 duration-100">
              <button
                onClick={() => {
                  setTimingType('leave_now');
                  setShowSlider(false);
                  setDropdownOpen(false);
                }}
                className="w-full text-left px-3.5 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-50 flex items-center justify-between"
              >
                <span>Leave now</span>
                {timingType === 'leave_now' && <span className="w-1.5 h-1.5 rounded-full bg-[#5B4DF5]" />}
              </button>
              <button
                onClick={() => {
                  setTimingType('depart_at');
                  setShowSlider(true);
                  setDropdownOpen(false);
                }}
                className="w-full text-left px-3.5 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-50 flex items-center justify-between"
              >
                <span>Depart at...</span>
                {timingType === 'depart_at' && <span className="w-1.5 h-1.5 rounded-full bg-[#5B4DF5]" />}
              </button>
              <button
                onClick={() => {
                  setTimingType('arrive_by');
                  setShowSlider(true);
                  setDropdownOpen(false);
                }}
                className="w-full text-left px-3.5 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-50 flex items-center justify-between"
              >
                <span>Arrive by...</span>
                {timingType === 'arrive_by' && <span className="w-1.5 h-1.5 rounded-full bg-[#5B4DF5]" />}
              </button>
            </div>
          )}
        </div>

        {/* Plan a trip button */}
        <button
          onClick={() => setShowSlider(!showSlider)}
          className="text-[12px] font-semibold text-[#5B4DF5] hover:underline focus:outline-none flex items-center gap-1"
        >
          <Sliders className="w-3 h-3" />
          Plan a trip
        </button>
      </div>

      {/* Interactive Departure & Traffic Slider */}
      {showSlider && (
        <div className="mt-2.5 p-3 bg-gray-50/80 rounded-2xl border border-gray-100 space-y-2 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-gray-600 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#5B4DF5]" />
              Schedule departure:
            </span>
            <span className="font-bold text-gray-900 bg-white px-2 py-0.5 rounded-lg border border-gray-200">
              {formatMinutes(timeMinutes)}
            </span>
          </div>

          <Slider
            min={0}
            max={1425}
            step={15}
            value={timeMinutes}
            onChange={(val) => {
              setTimeMinutes(val);
              onDepartureChange?.(formatMinutes(val));
            }}
            showValueBadge={false}
            showMinMaxLabels={false}
          />

          <div className="flex items-center justify-between text-[10.5px]">
            <span className="text-gray-400 font-medium">00:00</span>
            <span className={`font-semibold px-2 py-0.5 rounded-md text-[10px] ${trafficInfo.badge}`}>
              {trafficInfo.status}
            </span>
            <span className="text-gray-400 font-medium">23:45</span>
          </div>
        </div>
      )}
    </div>
  );
};

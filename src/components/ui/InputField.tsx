import { type FC, type ChangeEvent } from 'react';
import { ArrowUpDown, PlusCircle, Trash2 } from 'lucide-react';

export interface InputFieldProps {
  label?: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  disabled?: boolean;
  className?: string;
}

export const InputField: FC<InputFieldProps> = ({
  label,
  value,
  placeholder = '',
  onChange,
  disabled = false,
  className = '',
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`flex items-center space-x-2.5 ${className}`}>
      {label && (
        <span className="w-12 text-[13.5px] font-bold text-gray-900 shrink-0 select-none">
          {label}
        </span>
      )}
      <div className="flex-1 relative">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          placeholder={placeholder}
          className="w-full h-10 px-3.5 text-xs font-semibold text-gray-800 bg-white border border-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5B4DF5]/40 transition-all placeholder:text-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      </div>
    </div>
  );
};

export interface RouteInputGroupProps {
  fromValue: string;
  toValue: string;
  onFromChange: (val: string) => void;
  onToChange: (val: string) => void;
  onSwap: () => void;
  stops?: string[];
  onAddStop?: () => void;
  onRemoveStop?: (index: number) => void;
  onStopChange?: (index: number, val: string) => void;
  className?: string;
}

export const RouteInputGroup: FC<RouteInputGroupProps> = ({
  fromValue,
  toValue,
  onFromChange,
  onToChange,
  onSwap,
  stops = [],
  onAddStop,
  onRemoveStop,
  onStopChange,
  className = '',
}) => {
  return (
    <div className={`space-y-2.5 ${className}`}>
      <div className="relative">
        {/* From Input */}
        <div className="flex items-center space-x-2.5 mb-2.5">
          <span className="w-11 text-[13px] font-bold text-gray-900 shrink-0 select-none">
            From:
          </span>
          <div className="flex-1">
            <input
              type="text"
              value={fromValue}
              onChange={(e) => onFromChange(e.target.value)}
              placeholder="Your location"
              className="w-full h-10 px-3.5 text-xs font-semibold text-gray-800 bg-white border border-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5B4DF5]/40 transition-all placeholder:text-gray-400"
            />
          </div>
          <div className="w-7 shrink-0" />
        </div>

        {/* Dynamic Stops */}
        {stops.map((stop, idx) => (
          <div key={idx} className="flex items-center space-x-2.5 mb-2.5 animate-in fade-in duration-150">
            <span className="w-11 text-[12.5px] font-bold text-gray-900 shrink-0 select-none">
              Stop {idx + 1}:
            </span>
            <div className="flex-1">
              <input
                type="text"
                value={stop}
                onChange={(e) => onStopChange?.(idx, e.target.value)}
                placeholder="Add waypoint"
                className="w-full h-10 px-3.5 text-xs font-semibold text-gray-800 bg-white border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5B4DF5]/40 transition-all"
              />
            </div>
            {onRemoveStop && (
              <button
                type="button"
                onClick={() => onRemoveStop(idx)}
                className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
                title="Remove stop"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}

        {/* To Input */}
        <div className="flex items-center space-x-2.5">
          <span className="w-11 text-[13px] font-bold text-gray-900 shrink-0 select-none">
            To:
          </span>
          <div className="flex-1">
            <input
              type="text"
              value={toValue}
              onChange={(e) => onToChange(e.target.value)}
              placeholder="Bialystok"
              className="w-full h-10 px-3.5 text-xs font-semibold text-gray-800 bg-white border border-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5B4DF5]/40 transition-all placeholder:text-gray-400"
            />
          </div>
          <div className="w-7 shrink-0" />
        </div>

        {/* Swap button between From and To */}
        <button
          type="button"
          onClick={onSwap}
          aria-label="Swap locations"
          title="Swap origin and destination"
          className="absolute right-0 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center text-gray-800 hover:text-[#5B4DF5] hover:bg-gray-100 rounded-lg transition-all focus:outline-none active:scale-90"
        >
          <ArrowUpDown className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      {/* Add stop button */}
      {onAddStop && (
        <div className="pt-0.5">
          <button
            type="button"
            onClick={onAddStop}
            className="inline-flex items-center text-[12px] font-bold text-gray-900 hover:text-[#5B4DF5] transition-colors focus:outline-none group"
          >
            <PlusCircle className="w-4 h-4 mr-1.5 stroke-[2] group-hover:scale-105 transition-transform" />
            Add stop
          </button>
        </div>
      )}
    </div>
  );
};

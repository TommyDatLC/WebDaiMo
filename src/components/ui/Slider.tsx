import { useState, type FC, type ChangeEvent } from 'react';

export interface SliderProps {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  unit?: string;
  showValueBadge?: boolean;
  showMinMaxLabels?: boolean;
  minLabel?: string;
  maxLabel?: string;
  onChange?: (value: number) => void;
  className?: string;
}

export const Slider: FC<SliderProps> = ({
  label,
  min = 0,
  max = 100,
  step = 1,
  value: controlledValue,
  defaultValue = 50,
  unit = '',
  showValueBadge = true,
  showMinMaxLabels = true,
  minLabel,
  maxLabel,
  onChange,
  className = '',
}) => {
  const [internalValue, setInternalValue] = useState<number>(defaultValue);
  const currentValue = controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextVal = Number(e.target.value);
    setInternalValue(nextVal);
    onChange?.(nextVal);
  };

  const percentage = ((currentValue - min) / (max - min)) * 100;

  return (
    <div className={`w-full font-sans select-none ${className}`}>
      {/* Label & Value Badge */}
      {(label || showValueBadge) && (
        <div className="flex items-center justify-between mb-2">
          {label && (
            <span className="text-[13px] font-bold text-gray-900 tracking-tight">
              {label}
            </span>
          )}
          {showValueBadge && (
            <span className="text-xs font-bold text-[#5B4DF5] bg-purple-50 px-2.5 py-0.5 rounded-lg border border-purple-100">
              {currentValue}
              {unit}
            </span>
          )}
        </div>
      )}

      {/* Track & Thumb */}
      <div className="relative flex items-center h-6 group cursor-pointer">
        {/* Background Track */}
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          {/* Active Highlight Fill - No transition for instant, lag-free sliding */}
          <div
            className="h-full bg-[#5B4DF5] rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Real Range Input (Invisible overlay for touch and keyboard accessibility) */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentValue}
          onChange={handleChange}
          className="peer absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />

        {/* Custom Styled Dot Button Thumb - Scales 125% on hover, 0 position transition for instant feel */}
        <div
          className="absolute w-5 h-5 bg-white border-2 border-[#5B4DF5] rounded-full shadow-md pointer-events-none transition-transform duration-150 ease-out group-hover:scale-125 peer-hover:scale-125 peer-active:scale-125"
          style={{
            left: `calc(${percentage}% - ${percentage * 0.2}px)`,
          }}
        />
      </div>

      {/* Min / Max Labels */}
      {showMinMaxLabels && (
        <div className="flex items-center justify-between mt-1 text-[11px] font-medium text-gray-400">
          <span>{minLabel || `${min}${unit}`}</span>
          <span>{maxLabel || `${max}${unit}`}</span>
        </div>
      )}
    </div>
  );
};

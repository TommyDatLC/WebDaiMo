import { useState, useRef, useEffect, type FC } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface DropdownOption {
  value: string;
  label: string;
  badge?: string;
}

export interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
  className?: string;
}

export const Dropdown: FC<DropdownProps> = ({
  options,
  value,
  onChange,
  prefix = '',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`relative inline-block text-left ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-[12.5px] font-bold text-gray-900 hover:text-[#5B4DF5] transition-colors duration-300 ease-expo focus:outline-none py-1"
      >
        <span>
          {prefix}
          {selectedOption ? selectedOption.label : 'Select'}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 ml-1 stroke-[3] transition-transform duration-400 ease-expo ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-1.5 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-1.5 z-40 animate-dropdown-expo">
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center justify-between transition-colors duration-300 ease-expo ${
                  isSelected
                    ? 'text-[#5B4DF5] bg-purple-50/70'
                    : 'text-gray-800 hover:bg-gray-50'
                }`}
              >
                <span>{opt.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

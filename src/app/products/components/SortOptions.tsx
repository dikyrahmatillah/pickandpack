import React from "react";

interface Option {
  value: string;
  label: string;
}

interface Props {
  options: Option[];
  selected: string;
  onSelect: (value: string) => void;
}

export default function SortOptions({ options, selected, onSelect }: Props) {
  return (
    <ul className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const isActive = selected === opt.value;
        return (
          <li key={opt.value}>
            <button
              type="button"
              onClick={() => onSelect(opt.value)}
              className={`px-2 py-1 border transition-colors duration-150 cursor-pointer
                ${
                  isActive
                    ? "bg-black text-white border-black"
                    : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                }
              `}
              aria-pressed={isActive}
            >
              <span className="text-sm">{opt.label}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

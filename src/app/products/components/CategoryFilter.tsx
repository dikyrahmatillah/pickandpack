import React from "react";

interface Props {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  selected,
  onSelect,
}: Props) {
  return (
    <ul className="space-y-2 font-semibold text-sm">
      {categories.map((item, idx) => (
        <li key={idx}>
          <button
            type="button"
            className={`w-full text-left cursor-pointer px-3 py-2 transition-colors
              ${
                selected === item
                  ? "bg-black text-white shadow"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            onClick={() => onSelect(item)}
          >
            {item}
          </button>
        </li>
      ))}
    </ul>
  );
}

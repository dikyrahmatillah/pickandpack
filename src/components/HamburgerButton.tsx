"use client";
import React from "react";

type HamburgerButtonProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function HamburgerButton({
  isMenuOpen,
  setIsMenuOpen,
}: HamburgerButtonProps) {
  return (
    <button
      className="relative w-12 h-12 p-2 bg-transparent rounded cursor-pointer flex items-center justify-center"
      onClick={() => setIsMenuOpen((v) => !v)}
      aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      type="button"
    >
      <span
        className={`
          absolute left-1/2 w-8 h-0.5 bg-gray-900 rounded transition-all duration-400
          ${
            isMenuOpen
              ? "top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45"
              : "top-[30%] -translate-x-1/2 -translate-y-1/2 rotate-0"
          }
        `}
      />
      <span
        className={`
          absolute left-1/2 w-8 h-0.5 bg-gray-900 rounded transition-all duration-400
          ${
            isMenuOpen
              ? "top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45"
              : "top-[70%] -translate-x-1/2 -translate-y-1/2 rotate-0"
          }
        `}
      />
    </button>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const lastScroll = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (current <= 0) {
        setShowHeader(true);
        lastScroll.current = 0;
        return;
      }
      if (current > lastScroll.current && current > 80) {
        // Scrolling down
        setShowHeader(false);
      } else if (current < lastScroll.current) {
        // Scrolling up
        setShowHeader(true);
      }
      lastScroll.current = current;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        bg-white w-full z-[100] fixed top-0 left-0 transition-transform duration-300
        ${showHeader ? "translate-y-0" : "-translate-y-full"}
        shadow
      `}
    >
      <nav className="w-full px-4 sm:px-8 md:px-28">
        <div className="flex items-center h-20 md:h-40 w-full">
          {/* Left: Logo */}
          <div className="flex items-center gap-4 w-1/2">
            <Link href="/" className="flex items-center gap-4">
              <span className="inline-block w-8 h-8 rounded-lg bg-gray-900" />
              <span className="tracking-[0.3em] font-extrabold text-lg sm:text-3xl text-gray-900 select-none">
                PICK & PACK
              </span>
            </Link>
          </div>

          {/* Right: Nav + Hamburger/Close */}
          <div className="flex w-1/2 justify-end items-center gap-4 md:gap-8">
            {/* Desktop Navigation with animation */}
            <div
              className={`
                hidden xl:flex items-center gap-8
                transition-all duration-300
                ${
                  isMenuOpen
                    ? "opacity-0 -translate-y-4 pointer-events-none"
                    : "opacity-100 translate-y-0 pointer-events-auto"
                }
              `}
            >
              <Link
                href="/products"
                className="uppercase text-gray-900 hover:text-gray-700 text-lg font-semibold tracking-wide"
              >
                products
              </Link>
              <Link
                href="/portfolio"
                className="uppercase text-gray-900 hover:text-gray-700 text-lg font-semibold tracking-wide"
              >
                portfolio
              </Link>
              <Link
                href="/about-us"
                className="uppercase text-gray-900 hover:text-gray-700 text-lg font-semibold tracking-wide"
              >
                about
              </Link>
              <Link
                href="/team"
                className="uppercase text-gray-900 hover:text-gray-700 text-lg font-semibold tracking-wide"
              >
                team
              </Link>
              <Link
                href="/journals"
                className="uppercase text-gray-900 hover:text-gray-700 text-lg font-semibold tracking-wide"
              >
                journals
              </Link>
              <Link
                href="/contact"
                className="uppercase text-gray-900 hover:text-gray-700 text-lg font-semibold tracking-wide"
              >
                contact
              </Link>
              <Link
                href="/login"
                className="uppercase text-gray-900 hover:text-gray-700 text-lg font-semibold tracking-wide"
              >
                Login
              </Link>
            </div>
            {/* Hamburger or Close */}
            <button
              className="relative w-10 h-10 flex flex-col justify-center items-center group"
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <span
                className={`
                  block absolute h-1 w-8 bg-gray-900 rounded transition-all duration-300
                  ${
                    isMenuOpen
                      ? "rotate-45 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      : "top-[30%] left-1/2 -translate-x-1/2"
                  }
                `}
                style={{ transitionProperty: "all" }}
              />
              <span
                className={`
                  block absolute h-1 w-8 bg-gray-900 rounded transition-all duration-300
                  ${
                    isMenuOpen
                      ? "-rotate-45 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      : "top-[65%] left-1/2 -translate-x-1/2"
                  }
                `}
                style={{ transitionProperty: "all" }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Animated Overlay Menu */}
      <div
        className={`
          fixed left-0 right-0 z-50 bg-white
          transition-all duration-400
          ${
            isMenuOpen
              ? "top-20 md:top-40 opacity-100 pointer-events-auto translate-y-0"
              : "top-20 md:top-40 opacity-0 pointer-events-none translate-y-8"
          }
        `}
        style={{
          minHeight: "calc(100vh - 5rem)", // 5rem = 80px = h-20, adjust if needed
        }}
      >
        <nav className="flex flex-col items-end gap-6 md:gap-10 mt-10 md:mt-20 px-4 sm:px-8 md:px-16">
          <Link
            href="/home"
            className="text-3xl sm:text-4xl md:text-7xl font-extrabold uppercase text-gray-900 hover:text-indigo-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/products"
            className="text-3xl sm:text-4xl md:text-7xl font-extrabold uppercase text-gray-900 hover:text-indigo-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Products
          </Link>
          <Link
            href="/services"
            className="text-3xl sm:text-4xl md:text-7xl font-extrabold uppercase text-gray-900 hover:text-indigo-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Portfolio
          </Link>
          <Link
            href="/about-us"
            className="text-3xl sm:text-4xl md:text-7xl font-extrabold uppercase text-gray-900 hover:text-indigo-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/team"
            className="text-3xl sm:text-4xl md:text-7xl font-extrabold uppercase text-gray-900 hover:text-indigo-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Team
          </Link>
          <Link
            href="/clients"
            className="text-3xl sm:text-4xl md:text-7xl font-extrabold uppercase text-gray-900 hover:text-indigo-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Journals
          </Link>
          <Link
            href="/contact"
            className="text-3xl sm:text-4xl md:text-7xl font-extrabold uppercase text-gray-900 hover:text-indigo-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          <Link
            href="/portfolio"
            className="text-3xl sm:text-4xl md:text-7xl font-extrabold uppercase text-gray-900 hover:text-indigo-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </Link>
        </nav>

        {/* Additional Info Links at the bottom */}
        <div className="absolute bottom-[5%] left-0 w-full flex flex-col md:flex-row justify-end items-end gap-4 md:gap-12 px-4 sm:px-8 md:px-16 pb-8 md:pb-16">
          <div className="flex flex-col md:flex-row gap-4 md:gap-12 text-lg md:text-2xl font-semibold text-gray-700">
            <Link href="/delivery" className="hover:text-indigo-600">
              delivery
            </Link>
            <Link href="/returns" className="hover:text-indigo-600">
              returns & exchanges
            </Link>
            <Link href="/privacy-policy" className="hover:text-indigo-600">
              privacy policy
            </Link>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-12 text-lg md:text-2xl font-semibold text-gray-700 md:ml-12">
            <Link href="/about" className="hover:text-indigo-600">
              about us
            </Link>
            <Link href="/contact" className="hover:text-indigo-600">
              contacts
            </Link>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener"
              className="hover:text-indigo-600"
            >
              instagram
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

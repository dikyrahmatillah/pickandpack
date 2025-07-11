"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import HamburgerButton from "./HamburgerButton";

export default function Header() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const lastScroll = useRef(0);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

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

  useEffect(() => {
    function updateHeaderHeight() {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    }
    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    window.addEventListener("orientationchange", updateHeaderHeight);
    const interval = setInterval(updateHeaderHeight, 300);
    return () => {
      window.removeEventListener("resize", updateHeaderHeight);
      window.removeEventListener("orientationchange", updateHeaderHeight);
      clearInterval(interval);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={`
        bg-white w-full z-[100] fixed top-0 left-0 transition-transform duration-300
        ${showHeader ? "translate-y-0" : "-translate-y-full"}
        shadow
      `}
    >
      <nav className="w-full px-4 sm:px-8 md:px-28">
        <div className="flex items-center h-16 md:h-20 w-full">
          {/* Left: Logo */}
          <div className="flex items-center gap-4 w-1/2">
            <Link href="/" className="flex items-center gap-4">
              <span className="inline-block w-8 h-8 md:w-7 md:h-7 rounded-lg bg-gray-900" />
              <span className="whitespace-nowrap text-md sm:text-xl tracking-[0.3em] font-extrabold text-gray-900 select-none">
                PICK & PACK
              </span>
            </Link>
          </div>

          {/* Right: Nav + Hamburger/Close */}
          <div className="flex w-1/2 justify-end items-center gap-4 md:gap-8">
            {/* Desktop Navigation with animation */}
            <div
              className={`
                hidden xl:flex items-center gap-6
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
                className="uppercase text-gray-900 hover:text-gray-700 text-sm font-semibold tracking-wide"
              >
                products
              </Link>
              <Link
                href="/portfolio"
                className="uppercase text-gray-900 hover:text-gray-700 text-sm font-semibold tracking-wide"
              >
                portfolio
              </Link>
              <Link
                href="/about-us"
                className="uppercase text-gray-900 hover:text-gray-700 text-sm font-semibold tracking-wide"
              >
                about
              </Link>
              <Link
                href="/team"
                className="uppercase text-gray-900 hover:text-gray-700 text-sm font-semibold tracking-wide"
              >
                team
              </Link>
              <Link
                href="/journals"
                className="uppercase text-gray-900 hover:text-gray-700 text-sm font-semibold tracking-wide"
              >
                journals
              </Link>
              {session?.user ? (
                <Link
                  href={
                    session.user.role === "viewer"
                      ? "/dashboard/viewer"
                      : "/dashboard"
                  }
                  className="uppercase text-gray-900 hover:text-gray-700 text-sm font-semibold tracking-wide"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="uppercase text-gray-900 hover:text-gray-700 text-sm font-semibold tracking-wide"
                >
                  Login
                </Link>
              )}
            </div>
            {/* Hamburger or Close */}
            <HamburgerButton
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
            />
          </div>
        </div>
      </nav>

      {/* Animated Overlay Menu */}
      <div
        className={`
          fixed left-0 right-0 z-100 bg-white
          transition-all duration-400
          ${
            isMenuOpen
              ? "opacity-100 pointer-events-auto translate-y-0"
              : "opacity-0 pointer-events-none translate-y-8"
          }
        `}
        style={{
          top: headerHeight,
          minHeight: `calc(100vh - ${headerHeight}px)`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Overlay Menu at Top */}
        <nav className="flex flex-col items-end gap-3 md:gap-5 mt-3 md:mt-5 px-4 sm:px-6 md:px-8">
          <Link
            href="/home"
            className="text-xl sm:text-2xl md:text-4xl font-extrabold uppercase text-gray-900 hover:text-indigo-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/products"
            className="text-xl sm:text-2xl md:text-4xl font-extrabold uppercase text-gray-900 hover:text-indigo-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Products
          </Link>
          <Link
            href="/services"
            className="text-xl sm:text-2xl md:text-4xl font-extrabold uppercase text-gray-900 hover:text-indigo-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Portfolio
          </Link>
          <Link
            href="/about-us"
            className="text-xl sm:text-2xl md:text-4xl font-extrabold uppercase text-gray-900 hover:text-indigo-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/team"
            className="text-xl sm:text-2xl md:text-4xl font-extrabold uppercase text-gray-900 hover:text-indigo-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Team
          </Link>
          <Link
            href="/journals"
            className="text-xl sm:text-2xl md:text-4xl font-extrabold uppercase text-gray-900 hover:text-indigo-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Journals
          </Link>
          <Link
            href="/contact"
            className="text-xl sm:text-2xl md:text-4xl font-extrabold uppercase text-gray-900 hover:text-indigo-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          {session?.user ? (
            <Link
              href="/dashboard"
              className="text-xl sm:text-2xl md:text-4xl font-extrabold uppercase text-gray-900 hover:text-indigo-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              className="text-xl sm:text-2xl md:text-4xl font-extrabold uppercase text-gray-900 hover:text-indigo-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </nav>

        {/* Additional Info Links at the Bottom */}
        <div className="w-full flex flex-col md:flex-row justify-end items-end gap-4 md:gap-12 px-4 sm:px-8 md:px-16 pb-8 md:pb-16">
          <div className="flex flex-col md:flex-row gap-4 md:gap-12 text-sm md:text-2xl font-semibold text-gray-700">
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
          <div className="flex flex-col md:flex-row gap-4 md:gap-12 text-sm md:text-2xl font-semibold text-gray-700 md:ml-12">
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

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import HamburgerButton from "../HamburgerButton";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import MobileFooter from "./MobileFooter";

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
        setShowHeader(false);
      } else if (current < lastScroll.current) {
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
          <div className="flex items-center gap-4 w-1/2">
            <Link href="/" className="flex items-center gap-4">
              <span className="inline-block w-8 h-8 md:w-7 md:h-7 rounded-lg bg-gray-900" />
              <span
                className="whitespace-nowrap text-md sm:text-xl tracking-[0.3em] font-extrabold text-gray-900 select-none"
                aria-label="Pick and Pack"
              >
                PICK & PACK
              </span>
            </Link>
          </div>
          <div className="flex w-1/2 justify-end items-center gap-4 md:gap-8">
            <DesktopNav isMenuOpen={isMenuOpen} session={session} />
            <HamburgerButton
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
            />
          </div>
        </div>
      </nav>
      <div
        className={`
          fixed left-0 right-0 z-100 bg-white
          transition-all duration-400
          flex flex-col justify-between
          ${
            isMenuOpen
              ? "opacity-100 pointer-events-auto translate-y-0"
              : "opacity-0 pointer-events-none translate-y-8"
          }
        `}
        style={{
          top: headerHeight,
          minHeight: `calc(100vh - ${headerHeight}px)`,
        }}
      >
        <MobileNav session={session} setIsMenuOpen={setIsMenuOpen} />
        <MobileFooter />
      </div>
    </header>
  );
}

"use client";
import React, { useEffect, useRef, useState } from "react";

const BoxCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [whiteBorder, setWhiteBorder] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handlePointerOver = (e: Event) => {
      const target = e.target as HTMLElement;

      let isInteractive = false;
      let isBlackBg = false;

      const button = target.closest("button");
      const link = target.closest("a");

      if (button || link) {
        isInteractive = true;
      }

      // Check if the current target has the specific ID
      if (target.id === "contact-button-black") {
        isInteractive = true;
        isBlackBg = true;
        console.log(" DETECTED!");
      }

      setActive(isInteractive);
      setWhiteBorder(isBlackBg);
    };

    const handlePointerOut = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setActive(false);
        setWhiteBorder(false);
      }
    };

    document.addEventListener("mousemove", moveCursor);
    document.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("pointerout", handlePointerOut);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: active ? "44px" : "22px",
        height: active ? "44px" : "22px",
        background: active ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.15)",
        border: whiteBorder
          ? "2px solid rgba(255,255,255,0.95)"
          : "2px solid rgba(0,0,0,0.7)",
        borderRadius: active ? "12px" : "7px",
        pointerEvents: "none",
        transform: `translate(-50%, -50%) rotate(${active ? 90 : 0}deg)`,
        zIndex: 9999,
        transition:
          "width 0.3s, height 0.3s, transform 1s cubic-bezier(.4,2,.6,1), background 0.3s, border 0.3s",
        mixBlendMode: whiteBorder ? "normal" : "multiply",
      }}
    />
  );
};

export default BoxCursor;

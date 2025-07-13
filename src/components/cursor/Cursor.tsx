"use client";
import React, { useEffect, useRef, useState } from "react";

interface CursorState {
  active: boolean;
  variant: "default" | "white" | "interactive";
}

const BoxCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<CursorState>({
    active: false,
    variant: "default",
  });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handlePointerOver = (e: Event) => {
      const target = e.target as HTMLElement;

      // Check for cursor variant data attributes
      const cursorVariant =
        target.getAttribute("data-cursor") ||
        target.closest("[data-cursor]")?.getAttribute("data-cursor");

      // Check for interactive elements
      const button = target.closest("button");
      const link = target.closest("a");
      const interactive = target.closest("[data-interactive]");

      const newState: CursorState = {
        active: false,
        variant: "default",
      };

      if (cursorVariant) {
        newState.active = true;
        newState.variant = cursorVariant as CursorState["variant"];
      } else if (button || link || interactive) {
        newState.active = true;
        newState.variant = "interactive";
      }

      setCursorState(newState);
    };

    const handlePointerOut = (e: Event) => {
      const target = e.target as HTMLElement;
      const hasDataCursor =
        target.getAttribute("data-cursor") || target.closest("[data-cursor]");
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-interactive]");

      if (hasDataCursor || isInteractive) {
        setCursorState({
          active: false,
          variant: "default",
        });
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

  const getCursorStyles = () => {
    const { active, variant } = cursorState;

    const baseStyles = {
      position: "fixed" as const,
      left: 0,
      top: 0,
      pointerEvents: "none" as const,
      transform: `translate(-50%, -50%) rotate(${active ? 90 : 0}deg)`,
      zIndex: 9999,
      transition:
        "width 0.3s, height 0.3s, transform 1s cubic-bezier(.4,2,.6,1), background 0.3s, border 0.3s",
    };

    switch (variant) {
      case "white":
        return {
          ...baseStyles,
          width: active ? "44px" : "22px",
          height: active ? "44px" : "22px",
          border: "2px solid rgba(255,255,255,0.95)",
          borderRadius: active ? "12px" : "7px",
          mixBlendMode: "normal" as const,
        };
      case "interactive":
        return {
          ...baseStyles,
          width: active ? "44px" : "22px",
          height: active ? "44px" : "22px",
          background: active ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.15)",
          border: "2px solid rgba(0,0,0,0.7)",
          borderRadius: active ? "12px" : "7px",
          mixBlendMode: "multiply" as const,
        };
      default:
        return {
          ...baseStyles,
          width: "22px",
          height: "22px",
          background: "rgba(0,0,0,0.15)",
          border: "2px solid rgba(0,0,0,0.7)",
          borderRadius: "7px",
          mixBlendMode: "multiply" as const,
        };
    }
  };

  return <div ref={cursorRef} style={getCursorStyles()} />;
};

export default BoxCursor;

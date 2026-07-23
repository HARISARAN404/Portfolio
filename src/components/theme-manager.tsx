"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

// useLayoutEffect on the client, useEffect during SSR (avoids the SSR warning).
const useIsoEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Re-applies an explicit saved theme after every route change. Next resets the
// <html> attributes when the locale segment changes, which would otherwise drop
// the choice; re-running on each pathname change keeps it stable across FR/EN
// switches. When there is no saved choice, the attribute is left off so the CSS
// `prefers-color-scheme` default governs (and there is no first-paint flash).
export default function ThemeManager() {
  const pathname = usePathname();

  useIsoEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored === "dark" || stored === "light") {
        document.documentElement.setAttribute("data-theme", stored);
      } else {
        document.documentElement.removeAttribute("data-theme");
      }
    } catch {
      // ignore storage failures
    }
  }, [pathname]);

  return null;
}

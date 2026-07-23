"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle({ label }: { label: string }) {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    // Light is the default; only an explicit dark choice overrides it.
    const explicit = document.documentElement.getAttribute("data-theme");
    setTheme(explicit === "dark" ? "dark" : "light");
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // ignore storage failures (private mode, etc.)
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="flex size-8 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-foreground hover:text-foreground"
    >
      {theme === "dark" ? (
        // Sun — click to switch to light
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : theme === "light" ? (
        // Moon — click to switch to dark
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        // Placeholder before mount to keep server/client markup identical
        <span className="block size-4" />
      )}
    </button>
  );
}

"use client";

import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/dictionaries";
import ThemeToggle from "@/components/theme-toggle";

export default function Nav({
  locale,
  labels,
}: {
  locale: Locale;
  labels: Dictionary["nav"];
}) {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-2xl items-center gap-x-4 px-6 py-5">
        <Link
          href={`/${locale}`}
          className="text-sm font-medium tracking-tight text-foreground"
        >
          Harisaran Vasu
        </Link>
        <div className="ml-auto flex items-center gap-x-3 text-sm">
          <span
            className="flex items-center gap-1 font-mono text-xs"
            aria-label="Language"
          >
            {(["fr", "en"] as const).map((l, i) => (
              <span key={l} className="flex items-center gap-1">
                {i > 0 && <span className="text-border">/</span>}
                <Link
                  href={`/${l}`}
                  aria-current={l === locale ? "true" : undefined}
                  className={`uppercase transition-colors ${
                    l === locale
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l}
                </Link>
              </span>
            ))}
          </span>
          <ThemeToggle label={labels.theme} />
        </div>
      </nav>
    </header>
  );
}

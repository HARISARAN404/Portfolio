"use client";

import { useState } from "react";

export default function InstitutionLogo({
  src,
  abbr,
  name,
}: {
  src: string;
  abbr: string;
  name: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    // Fallback monogram badge if the logo image isn't available.
    return (
      <div className="flex size-14 shrink-0 items-center justify-center rounded-lg border border-border bg-muted font-mono text-[11px] font-bold tracking-tight text-foreground">
        {abbr}
      </div>
    );
  }

  return (
    // White tile so logos designed for white backgrounds stay legible in dark mode.
    <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-white p-1.5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={`${name} logo`}
        className="max-h-full max-w-full object-contain"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

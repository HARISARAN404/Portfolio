"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number };

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let raf = 0;

    // Read the theme foreground colour so nodes stay monochrome and
    // adapt to light/dark. Returns an { r, g, b } triple.
    function foreground(): { r: number; g: number; b: number } {
      const isDark =
        document.documentElement.getAttribute("data-theme") === "dark" ||
        (!document.documentElement.getAttribute("data-theme") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);
      return isDark ? { r: 255, g: 255, b: 255 } : { r: 10, g: 10, b: 10 };
    }

    let color = foreground();

    function build() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas!.clientWidth;
      height = canvas!.clientHeight;
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Scale node count to viewport area, with a sensible cap.
      const count = Math.min(90, Math.floor((width * height) / 18000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
    }

    const LINK_DIST = 130;

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      const { r, g, b } = color;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        // Connecting lines to nearby nodes.
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.18;
            ctx!.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(n.x, n.y);
            ctx!.lineTo(m.x, m.y);
            ctx!.stroke();
          }
        }
      }

      // Nodes on top of the links.
      ctx!.fillStyle = `rgba(${r},${g},${b},0.55)`;
      for (const n of nodes) {
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
        ctx!.fill();
      }

      if (!reduced) raf = requestAnimationFrame(draw);
    }

    build();
    draw();

    const onResize = () => {
      build();
      if (reduced) draw();
    };
    window.addEventListener("resize", onResize);

    // Recompute colour when the theme changes.
    const themeObserver = new MutationObserver(() => {
      color = foreground();
      if (reduced) draw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onScheme = () => {
      color = foreground();
      if (reduced) draw();
    };
    media.addEventListener("change", onScheme);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      themeObserver.disconnect();
      media.removeEventListener("change", onScheme);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}

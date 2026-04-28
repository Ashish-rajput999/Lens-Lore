"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const next = height <= 0 ? 0 : Math.min(100, (scrollTop / height) * 100);
      setProgress(next);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-px bg-transparent">
      <div
        className="h-full bg-gold shadow-[0_0_18px_rgba(201,169,110,0.55)] transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

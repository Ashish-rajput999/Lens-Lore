"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 20, stiffness: 300, mass: 0.4 });
  const springY = useSpring(y, { damping: 20, stiffness: 300, mass: 0.4 });

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const mediaQuery = window.matchMedia("(pointer: fine)");
    const toggle = () => setEnabled(mediaQuery.matches);
    const handleMove = (event: MouseEvent) => {
      x.set(event.clientX - 4);
      y.set(event.clientY - 4);
      setVisible(true);
      const target = event.target as HTMLElement | null;
      setHovering(Boolean(target?.closest("[data-cursor='hover']")));
    };
    const handleLeave = () => setVisible(false);

    toggle();
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseout", handleLeave);
    mediaQuery.addEventListener("change", toggle);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseout", handleLeave);
      mediaQuery.removeEventListener("change", toggle);
    };
  }, [reduceMotion, x, y]);

  if (reduceMotion || !enabled || !visible) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-50 hidden rounded-full border border-gold/60 bg-gold/10 mix-blend-screen md:block"
      style={{
        x: springX,
        y: springY,
        width: hovering ? 20 : 8,
        height: hovering ? 20 : 8,
      }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
    />
  );
}

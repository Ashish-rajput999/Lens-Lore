"use client";

import Link, { LinkProps } from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

type MagneticButtonProps = LinkProps & {
  children: ReactNode;
  className?: string;
};

export function MagneticButton({
  children,
  className,
  ...props
}: MagneticButtonProps) {
  const reduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 18, stiffness: 260 });
  const springY = useSpring(mouseY, { damping: 18, stiffness: 260 });

  const handleMove = (event: MouseEvent<HTMLAnchorElement>) => {
    if (reduceMotion) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const offsetX = (event.clientX - bounds.left - bounds.width / 2) / 7;
    const offsetY = (event.clientY - bounds.top - bounds.height / 2) / 7;
    mouseX.set(Math.max(-8, Math.min(8, offsetX)));
    mouseY.set(Math.max(-8, Math.min(8, offsetY)));
  };

  const reset = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div style={{ x: springX, y: springY }}>
      <Link
        {...props}
        data-cursor="hover"
        onMouseMove={handleMove}
        onMouseLeave={reset}
        className={cn(
          "inline-flex items-center gap-3 border border-gold bg-gold px-5 py-3 font-mono text-[0.68rem] uppercase tracking-[0.35em] text-black transition-colors hover:bg-transparent hover:text-gold",
          className,
        )}
      >
        {children}
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </motion.div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Story } from "@/lib/site-data";
import { ChevronLeft, ChevronRight } from "lucide-react";

type HeroSectionProps = {
  stories: Story[];
};

export function HeroSection({ stories }: HeroSectionProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const touchStartX = useRef<number | null>(null);
  const story = stories[index]!;

  // Auto-advance every 6s
  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % stories.length);
    }, 6000);
    return () => clearTimeout(timer);
  }, [index, paused, stories.length]);

  function goTo(next: number, dir: number) {
    setDirection(dir);
    setIndex((next + stories.length) % stories.length);
  }

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
    if (Math.abs(dx) > 40) {
      goTo(index + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
    }
    touchStartX.current = null;
  }

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "6%" : "-6%",
      opacity: 0,
      scale: 1.04,
    }),
    center: { x: "0%", opacity: 1, scale: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? "-6%" : "6%",
      opacity: 0,
      scale: 0.98,
    }),
  };

  return (
    <section
      className="relative min-h-[100svh] overflow-hidden border-b border-ivory/10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Background image with crossfade */}
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={story.slug}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="story-gradient absolute inset-0"
        >
          <Image
            src={story.image}
            alt={story.title}
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            blurDataURL={story.blurDataURL}
            className="object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-20 pt-32 sm:px-8 lg:px-12 lg:pb-28">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={story.slug + "-content"}
            custom={direction}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl space-y-8"
          >
            <div className="flex flex-wrap gap-4">
              <span className="label-mono">{story.issue}</span>
              <span className="label-mono">{story.category}</span>
              <span className="label-mono">{story.readingTime}</span>
            </div>

            <div className="space-y-5">
              <h1 className="max-w-5xl font-display text-[clamp(3.5rem,9vw,7rem)] leading-[0.93] text-ivory">
                {story.title}
              </h1>
              <p className="max-w-2xl text-base leading-8 text-ivory/72 sm:text-lg">
                {story.summary}
              </p>
            </div>

            <Link
              href={story.href}
              className="inline-flex items-center gap-3 border border-ivory/30 px-6 py-4 font-mono text-xs uppercase tracking-[0.35em] text-ivory transition-all duration-300 hover:border-gold hover:text-gold"
            >
              Read Story
              <span>→</span>
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="mt-12 flex items-center gap-6">
          {/* Dot indicators */}
          <div className="flex gap-2">
            {stories.map((s, i) => (
              <button
                key={s.slug}
                type="button"
                onClick={() => goTo(i, i > index ? 1 : -1)}
                aria-label={`Go to story ${i + 1}`}
                className={`h-1 transition-all duration-500 ${
                  i === index
                    ? "w-8 bg-gold"
                    : "w-3 bg-ivory/30 hover:bg-ivory/60"
                }`}
              />
            ))}
          </div>

          {/* Prev / Next */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => goTo(index - 1, -1)}
              aria-label="Previous story"
              className="flex h-9 w-9 items-center justify-center border border-ivory/20 text-ivory/60 transition-colors hover:border-gold hover:text-gold"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1, 1)}
              aria-label="Next story"
              className="flex h-9 w-9 items-center justify-center border border-ivory/20 text-ivory/60 transition-colors hover:border-gold hover:text-gold"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Story counter */}
          <span className="ml-auto font-mono text-[0.62rem] uppercase tracking-[0.38em] text-ivory/36">
            {String(index + 1).padStart(2, "0")} / {String(stories.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}

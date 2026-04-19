"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { FeatureStory } from "@/lib/site-data";

type HeroSectionProps = {
  story: FeatureStory;
};

export function HeroSection({ story }: HeroSectionProps) {
  return (
    <section className="relative min-h-[100svh] overflow-hidden border-b border-ivory/10">
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
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
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl items-end px-5 pb-16 pt-32 sm:px-8 lg:px-12 lg:pb-24">
        <div className="max-w-4xl space-y-8">
          <div className="flex flex-wrap gap-4">
            <span className="label-mono">{story.issue}</span>
            <span className="label-mono">{story.category}</span>
            <span className="label-mono">{story.readingTime}</span>
          </div>

          <div className="space-y-5">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-5xl font-display text-[clamp(4.5rem,11vw,7.5rem)] leading-[0.9] text-ivory"
            >
              {story.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="max-w-2xl text-base leading-8 text-ivory/72 sm:text-lg"
            >
              {story.summary}
            </motion.p>
          </div>

          <MagneticButton href="/stories/neon-after-rain">
            Read Story
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

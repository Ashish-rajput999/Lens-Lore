"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type StoryHeroMediaProps = {
  image: string;
  title: string;
  slug: string;
  blurDataURL: string;
};

export function StoryHeroMedia({
  image,
  title,
  slug,
  blurDataURL,
}: StoryHeroMediaProps) {
  return (
    <motion.div layoutId={`story-image-${slug}`} className="absolute inset-0">
      <Image
        src={image}
        alt={title}
        fill
        priority
        sizes="100vw"
        placeholder="blur"
        blurDataURL={blurDataURL}
        className="object-cover"
      />
    </motion.div>
  );
}

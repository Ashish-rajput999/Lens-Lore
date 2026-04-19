import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Story } from "@/lib/site-data";

type ArticleCardProps = {
  story: Story;
  featured?: boolean;
};

export function ArticleCard({ story, featured = false }: ArticleCardProps) {
  return (
    <Link
      href={story.href}
      data-cursor="hover"
      className="story-card group block h-full"
    >
      <div className="relative min-h-[360px] overflow-hidden">
        <Image
          src={story.image}
          alt={story.title}
          fill
          sizes={featured ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
          placeholder="blur"
          blurDataURL={story.blurDataURL}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 z-10 space-y-4 p-6 lg:p-8">
          <div className="flex flex-wrap gap-3">
            <span className="label-mono text-gold">{story.category}</span>
            <span className="label-mono">{story.readingTime}</span>
          </div>
          <div className="flex items-end justify-between gap-4">
            <div className="space-y-3">
              <h3
                className={
                  featured
                    ? "max-w-2xl font-display text-4xl leading-tight text-ivory sm:text-5xl"
                    : "max-w-lg font-display text-3xl leading-tight text-ivory"
                }
              >
                {story.title}
              </h3>
              <p className="max-w-xl text-sm leading-7 text-ivory/70">
                {story.summary}
              </p>
            </div>
            <span className="flex h-10 w-10 items-center justify-center border border-ivory/14 text-ivory transition-colors group-hover:border-gold group-hover:text-gold">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

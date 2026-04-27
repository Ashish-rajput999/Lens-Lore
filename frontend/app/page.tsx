"use client";

import { useState } from "react";
import { ArticleGrid } from "@/components/magazine/ArticleGrid";
import { HeroSection } from "@/components/magazine/HeroSection";
import { IssueStrip } from "@/components/magazine/IssueStrip";
import { TrendingRail } from "@/components/magazine/TrendingRail";
import { MarqueeStrip } from "@/components/ui/MarqueeStrip";
import { ShopPreview } from "@/components/commerce/ShopPreview";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { archiveStories, marqueeItems, monthlyIssue, stories, topStories } from "@/lib/site-data";
import { useToast } from "@/components/ui/Toast";

// Use first 3 stories for the hero carousel
const heroStories = [stories[0]!, stories[1]!, stories[2]!];

export default function Home() {
  const [email, setEmail] = useState("");
  const { showToast } = useToast();

  function handleNewsletterSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    showToast("You're on the list. Watch for dispatches.", "success");
    setEmail("");
  }

  return (
    <PageWrapper>
      <HeroSection stories={heroStories} />
      <ArticleGrid stories={topStories} archiveStories={archiveStories} />
      <TrendingRail />
      <ShopPreview />
      <IssueStrip issue={monthlyIssue} />
      <MarqueeStrip items={marqueeItems} />

      <section className="border-t border-ivory/10 bg-black px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5">
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-gold">
              Newsletter
            </p>
            <h2 className="max-w-3xl font-display text-5xl leading-[0.95] text-ivory sm:text-6xl">
              Dispatches from the curb, the darkroom, and the gear bag.
            </h2>
            <p className="max-w-xl text-base leading-8 text-ivory/68">
              Weekly notes on cameras that earn their scuffs, photo books worth
              hunting down, and the stories behind the streets that shape the
              image.
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="grid gap-4 self-end">
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <div className="group relative overflow-hidden border border-ivory/18 bg-slate px-5 py-5 transition-colors duration-500 focus-within:border-gold hover:border-ivory/40">
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="w-full bg-transparent font-sans text-base tracking-[0.02em] text-ivory outline-none placeholder:text-ivory/36"
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-500 group-focus-within:scale-x-100" />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-between border border-blood px-5 py-4 font-mono text-xs uppercase tracking-[0.35em] text-ivory transition-colors duration-300 hover:bg-blood"
            >
              Subscribe
              <span>→</span>
            </button>
          </form>
        </div>
      </section>
    </PageWrapper>
  );
}

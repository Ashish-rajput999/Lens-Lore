"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useReaderHydrated, useReaderStore } from "@/lib/store/reader-store";

type SaveStoryButtonProps = {
  storySlug: string;
  variant?: "overlay" | "inline";
};

export function SaveStoryButton({
  storySlug,
  variant = "overlay",
}: SaveStoryButtonProps) {
  const hydrated = useReaderHydrated();
  const saved = useReaderStore((state) => state.savedStorySlugs.includes(storySlug));
  const toggleSavedStory = useReaderStore((state) => state.toggleSavedStory);

  const Icon = hydrated && saved ? BookmarkCheck : Bookmark;

  return (
    <button
      type="button"
      aria-pressed={hydrated && saved}
      aria-label={hydrated && saved ? "Remove story from saved list" : "Save story"}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleSavedStory(storySlug);
      }}
      className={
        variant === "overlay"
          ? "flex h-11 w-11 items-center justify-center border border-ivory/18 bg-black/45 text-ivory transition-colors hover:border-gold hover:text-gold"
          : "inline-flex items-center gap-2 border border-ivory/14 px-4 py-3 font-mono text-[0.68rem] uppercase tracking-[0.3em] text-ivory transition-colors hover:border-gold hover:text-gold"
      }
    >
      <Icon className={variant === "overlay" ? "h-4 w-4" : "h-3.5 w-3.5"} />
      {variant === "inline" ? (
        <span>{hydrated && saved ? "Saved" : "Save Story"}</span>
      ) : null}
    </button>
  );
}

const blurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MCcgaGVpZ2h0PScyNCcgdmlld0JveD0nMCAwIDQwIDI0Jz48cmVjdCB3aWR0aD0nNDAnIGhlaWdodD0nMjQnIGZpbGw9JyMxMTEwMGYnLz48cmVjdCB4PScwJyB5PScxMicgd2lkdGg9JzQwJyBoZWlnaHQ9JzEyJyBmaWxsPScjMjMyMDE4Jy8+PHJlY3QgeD0nMCcgeT0nMCcgd2lkdGg9JzQwJyBoZWlnaHQ9JzYnIGZpbGw9JyMyZTFmMTcnLz48L3N2Zz4=";

export type Story = {
  title: string;
  slug: string;
  href: string;
  image: string;
  summary: string;
  category: string;
  readingTime: string;
  blurDataURL: string;
};

export type FeatureStory = Story & {
  issue: string;
};

export type MonthlyIssue = {
  issueNumber: string;
  title: string;
  articles: Story[];
};

const stories: Story[] = [
  {
    title: "Neon After Rain: The Cameras That Love Wet Pavement",
    slug: "neon-after-rain",
    href: "/stories/neon-after-rain",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1600&q=80",
    summary:
      "A midnight walk through Shinjuku, with compact rangefinders, tungsten spill, and the lenses that keep sodium vapor honest.",
    category: "Gear",
    readingTime: "8 Min Read",
    blurDataURL,
  },
  {
    title: "What Makes A Shoulder Bag Feel Invisible At Hour Six",
    slug: "invisible-shoulder-bag",
    href: "/stories/invisible-shoulder-bag",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
    summary:
      "Our field notes on quiet straps, weathered canvas, and the bags that vanish into a long day of waiting for gestures.",
    category: "Culture",
    readingTime: "5 Min Read",
    blurDataURL,
  },
  {
    title: "The Pocket Flash Revival Happening Between Bars And Bodegas",
    slug: "pocket-flash-revival",
    href: "/stories/pocket-flash-revival",
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
    summary:
      "A new generation of street shooters is making hard light feel intimate again, one pocket-sized unit at a time.",
    category: "Photography",
    readingTime: "6 Min Read",
    blurDataURL,
  },
  {
    title: "Five Photo Books That Explain Why Grain Still Feels Human",
    slug: "grain-feels-human",
    href: "/stories/grain-feels-human",
    image:
      "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?auto=format&fit=crop&w=1200&q=80",
    summary:
      "From Moriyama to contemporary zines, the texture of imperfection remains a language of closeness.",
    category: "Essay",
    readingTime: "4 Min Read",
    blurDataURL,
  },
  {
    title: "How Repair Shops Became The New Streetwear Forums",
    slug: "repair-shops-forums",
    href: "/stories/repair-shops-forums",
    image:
      "https://images.unsplash.com/photo-1516728778615-2d590ea18575?auto=format&fit=crop&w=1200&q=80",
    summary:
      "There is a culture forming around patina, maintenance, and the social life of cameras that refuse to die.",
    category: "Interview",
    readingTime: "9 Min Read",
    blurDataURL,
  },
  {
    title: "The Quiet Luxury Of A Lens Hood That Actually Stays Put",
    slug: "quiet-luxury-lens-hood",
    href: "/stories/quiet-luxury-lens-hood",
    image:
      "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&w=1200&q=80",
    summary:
      "Not every hero product announces itself. Some simply spare you the frame-killing flare at the exact right moment.",
    category: "Gear",
    readingTime: "3 Min Read",
    blurDataURL,
  },
  {
    title: "Scanning Contact Sheets Like They Are Maps Back To A Feeling",
    slug: "contact-sheet-maps",
    href: "/stories/contact-sheet-maps",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    summary:
      "Why editors and photographers keep returning to the frames before and after the keeper.",
    category: "Culture",
    readingTime: "7 Min Read",
    blurDataURL,
  },
];

export const featuredStory: FeatureStory = {
  ...stories[0],
  issue: "Issue 01 / April 2026",
};

export const topStories: [Story, Story, Story] = [stories[0], stories[1], stories[2]];

export const archiveStories = stories.slice(3);

export const monthlyIssue: MonthlyIssue = {
  issueNumber: "01",
  title: "After Hours, Before Dawn",
  articles: stories.slice(0, 4),
};

export const marqueeItems = [
  "Ricoh GR IIIx",
  "Leica Q3 43",
  "Portra 400",
  "Shoulder Bags",
  "Rangefinders",
  "Rain Covers",
  "Photo Books",
  "Flash Units",
  "Cine Bloom Filters",
  "Monochrome Zines",
];

const blurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MCcgaGVpZ2h0PScyNCcgdmlld0JveD0nMCAwIDQwIDI0Jz48cmVjdCB3aWR0aD0nNDAnIGhlaWdodD0nMjQnIGZpbGw9JyMxMTEwMGYnLz48cmVjdCB4PScwJyB5PScxMicgd2lkdGg9JzQwJyBoZWlnaHQ9JzEyJyBmaWxsPScjMjMyMDE4Jy8+PHJlY3QgeD0nMCcgeT0nMCcgd2lkdGg9JzQwJyBoZWlnaHQ9JzYnIGZpbGw9JyMyZTFmMTcnLz48L3N2Zz4=";

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  comparePrice?: number;
  image: string;
  lifestyleImage: string;
  category: string;
  description: string;
  tag: string;
  specs: Array<{ key: string; value: string }>;
  featuredIn: string[];
};

export type InlineProductEmbed = {
  productSlug: string;
  note: string;
};

export type StorySection =
  | {
      type: "paragraph";
      content: string;
    }
  | {
      type: "pullQuote";
      quote: string;
      attribution: string;
    }
  | {
      type: "photoGrid";
      columns: 2 | 3;
      photos: Array<{
        image: string;
        caption: string;
      }>;
    }
  | {
      type: "productEmbed";
      embed: InlineProductEmbed;
    };

export type Story = {
  title: string;
  slug: string;
  href: string;
  image: string;
  summary: string;
  category: string;
  readingTime: string;
  blurDataURL: string;
  issue: string;
  publishedAt: string;
  author: {
    name: string;
    role: string;
    image: string;
  };
  featuredProductSlugs: string[];
  body: StorySection[];
};

export type FeatureStory = Story;

export type MonthlyIssue = {
  issueNumber: string;
  slug: string;
  title: string;
  dek: string;
  coverImage: string;
  month: string;
  year: number;
  articles: Story[];
};

export type LookbookCollection = {
  id: string;
  title: string;
  creator: string;
  category: string;
  itemCount: number;
  saves: number;
  createdAt: string;
  thumbnail: string;
  description: string;
  productSlugs: string[];
};

export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Stories", href: "/stories" },
  { label: "Shop", href: "/shop" },
  { label: "Issues", href: "/issue/01" },
  { label: "Collections", href: "/collections" },
];

export const products: Product[] = [
  {
    id: "gr3x",
    slug: "ricoh-griiix-urban-shadow",
    name: "Ricoh GR IIIx Urban Shadow",
    brand: "Ricoh",
    price: 1099,
    comparePrice: 1199,
    image:
      "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=1400&q=80",
    lifestyleImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
    category: "Camera",
    description:
      "A compact street camera with a 40mm-equivalent perspective that feels composed without becoming precious.",
    tag: "As Seen In Neon After Rain",
    specs: [
      { key: "Lens", value: "40mm equiv / f2.8" },
      { key: "Sensor", value: "24.2MP APS-C" },
      { key: "Weight", value: "262g" },
    ],
    featuredIn: ["neon-after-rain"],
  },
  {
    id: "cinebloom",
    slug: "cinebloom-10-filter",
    name: "CineBloom 10% Filter",
    brand: "Moment",
    price: 69,
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1400&q=80",
    lifestyleImage:
      "https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=1400&q=80",
    category: "Filter",
    description:
      "A restrained diffusion filter that blooms harsh signage and headlights without turning the frame to mush.",
    tag: "As Seen In Neon After Rain",
    specs: [
      { key: "Strength", value: "10%" },
      { key: "Thread", value: "49mm / 52mm / 67mm" },
      { key: "Finish", value: "Black anodized" },
    ],
    featuredIn: ["neon-after-rain"],
  },
  {
    id: "bellroy",
    slug: "bellroy-venture-sling-6l",
    name: "Bellroy Venture Sling 6L",
    brand: "Bellroy",
    price: 139,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=80",
    lifestyleImage:
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1400&q=80",
    category: "Bag",
    description:
      "A weatherproof sling with soft structure and quiet hardware that disappears into a long day on foot.",
    tag: "As Seen In Invisible Shoulder Bag",
    specs: [
      { key: "Capacity", value: "6L" },
      { key: "Fabric", value: "Recycled woven shell" },
      { key: "Carry", value: "Crossbody" },
    ],
    featuredIn: ["invisible-shoulder-bag"],
  },
  {
    id: "insert",
    slug: "modular-insert-coal-felt",
    name: "Modular Insert, Coal Felt",
    brand: "Wotancraft",
    price: 49,
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1400&q=80",
    lifestyleImage:
      "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?auto=format&fit=crop&w=1400&q=80",
    category: "Bag Accessory",
    description:
      "A felt-lined divider system that adds shape without making a shoulder bag feel overdesigned.",
    tag: "As Seen In Invisible Shoulder Bag",
    specs: [
      { key: "Material", value: "Compressed felt" },
      { key: "Fit", value: "Small sling / satchel" },
      { key: "Use", value: "1 body + 2 lenses" },
    ],
    featuredIn: ["invisible-shoulder-bag"],
  },
  {
    id: "lux-jr",
    slug: "godox-lux-junior-flash",
    name: "Godox Lux Junior Flash",
    brand: "Godox",
    price: 79,
    image:
      "https://images.unsplash.com/photo-1516728778615-2d590ea18575?auto=format&fit=crop&w=1400&q=80",
    lifestyleImage:
      "https://images.unsplash.com/photo-1494256997604-768d1f608cac?auto=format&fit=crop&w=1400&q=80",
    category: "Flash",
    description:
      "A pocket-sized flash that brings bar-side portraits and sidewalk snapshots back into sharp relief.",
    tag: "As Seen In Pocket Flash Revival",
    specs: [
      { key: "Guide Number", value: "GN12" },
      { key: "Modes", value: "Auto / Manual" },
      { key: "Power", value: "Built-in battery" },
    ],
    featuredIn: ["pocket-flash-revival"],
  },
  {
    id: "portra",
    slug: "kodak-portra-400",
    name: "Kodak Portra 400",
    brand: "Kodak",
    price: 18,
    image:
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=1400&q=80",
    lifestyleImage:
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1400&q=80",
    category: "Film",
    description:
      "A forgiving color negative stock that holds skin, signage, and overcast daylight in the same breath.",
    tag: "As Seen In Grain Feels Human",
    specs: [
      { key: "Format", value: "35mm / 36 exp" },
      { key: "ISO", value: "400" },
      { key: "Look", value: "Warm neutrals" },
    ],
    featuredIn: ["grain-feels-human", "contact-sheet-maps"],
  },
  {
    id: "hood",
    slug: "metal-ventilated-lens-hood",
    name: "Metal Ventilated Lens Hood",
    brand: "Squarehood",
    price: 85,
    image:
      "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&w=1400&q=80",
    lifestyleImage:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1400&q=80",
    category: "Accessory",
    description:
      "A ventilated hood that keeps flare controlled while preserving the lean silhouette of a daily-carry lens.",
    tag: "As Seen In Quiet Luxury Lens Hood",
    specs: [
      { key: "Build", value: "Machined aluminum" },
      { key: "Finish", value: "Matte black" },
      { key: "Fit", value: "Compact primes" },
    ],
    featuredIn: ["quiet-luxury-lens-hood"],
  },
  {
    id: "strap",
    slug: "leather-wrist-strap-smoke-tan",
    name: "Leather Wrist Strap, Smoke Tan",
    brand: "Artefact",
    price: 54,
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1400&q=80",
    lifestyleImage:
      "https://images.unsplash.com/photo-1519183071298-a2962be96ea1?auto=format&fit=crop&w=1400&q=80",
    category: "Accessory",
    description:
      "Soft leather that settles quickly and makes a compact body feel secure without telegraphing itself.",
    tag: "As Seen In Repair Shops Became Forums",
    specs: [
      { key: "Material", value: "Vegetable-tanned leather" },
      { key: "Length", value: "Adjustable" },
      { key: "Hardware", value: "Brass" },
    ],
    featuredIn: ["repair-shops-forums"],
  },
];

export const stories: Story[] = [
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
    issue: "Issue 01 / April 2026",
    publishedAt: "April 18, 2026",
    author: {
      name: "Maya Ito",
      role: "Contributing Editor",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    },
    featuredProductSlugs: ["ricoh-griiix-urban-shadow", "cinebloom-10-filter"],
    body: [
      {
        type: "paragraph",
        content:
          "At 1:13 a.m., puddles become mirrors and every passing taxi turns the block into a temporary light installation. The best compact cameras for this hour are the ones that disappear until a reflection opens up in front of you.",
      },
      {
        type: "productEmbed",
        embed: {
          productSlug: "ricoh-griiix-urban-shadow",
          note:
            "The 40mm-equivalent frame keeps wet pavement, signage, and faces in the same emotional register without pushing the scene into spectacle.",
        },
      },
      {
        type: "paragraph",
        content:
          "Street work after rain has less to do with sharpness than temperament. You want a camera that meters quickly, a lens that does not shout, and controls that let instinct win before the moment evaporates.",
      },
      {
        type: "pullQuote",
        quote:
          "Night gear earns its place when it disappears from your hand and reappears only in the final frame.",
        attribution: "Maya Ito",
      },
      {
        type: "photoGrid",
        columns: 2,
        photos: [
          {
            image:
              "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80",
            caption: "A convenience-store canopy reflecting gold into the crosswalk.",
          },
          {
            image:
              "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
            caption: "Diffusion at work, softening a hard LED spill above the curb.",
          },
        ],
      },
      {
        type: "productEmbed",
        embed: {
          productSlug: "cinebloom-10-filter",
          note:
            "One small layer of bloom turns headlight glare into atmosphere rather than distraction.",
        },
      },
      {
        type: "paragraph",
        content:
          "This is not gear for dominating a city. It is gear for slipping into its rhythm. When the street is already giving you enough drama, the best tool is the one that edits with restraint.",
      },
    ],
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
    issue: "Issue 01 / April 2026",
    publishedAt: "April 16, 2026",
    author: {
      name: "Jonah Vale",
      role: "Gear Columnist",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    },
    featuredProductSlugs: ["bellroy-venture-sling-6l", "modular-insert-coal-felt"],
    body: [
      {
        type: "paragraph",
        content:
          "A good shoulder bag stops introducing itself after the first hour. It does not squeak, swing too wide, or insist on being adjusted every six blocks.",
      },
      {
        type: "productEmbed",
        embed: {
          productSlug: "bellroy-venture-sling-6l",
          note:
            "Soft structure, quick access, and enough give to sit close without flattening everything inside.",
        },
      },
      {
        type: "paragraph",
        content:
          "The point is not minimalism for its own sake. It is quiet. A carry system should support the body’s patience, not compete with it.",
      },
      {
        type: "photoGrid",
        columns: 3,
        photos: [
          {
            image:
              "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1000&q=80",
            caption: "A sling worn close enough to stay out of the frame until needed.",
          },
          {
            image:
              "https://images.unsplash.com/photo-1494256997604-768d1f608cac?auto=format&fit=crop&w=1000&q=80",
            caption: "Soft hardware matters more than flashy capacity numbers.",
          },
          {
            image:
              "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?auto=format&fit=crop&w=1000&q=80",
            caption: "An insert that gives order without asking for attention.",
          },
        ],
      },
      {
        type: "productEmbed",
        embed: {
          productSlug: "modular-insert-coal-felt",
          note:
            "A small felt divider makes the bag faster because it makes every movement quieter.",
        },
      },
    ],
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
    issue: "Issue 01 / April 2026",
    publishedAt: "April 11, 2026",
    author: {
      name: "Maya Ito",
      role: "Contributing Editor",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    },
    featuredProductSlugs: ["godox-lux-junior-flash"],
    body: [
      {
        type: "paragraph",
        content:
          "There is a difference between aggressive flash and decisive flash. The new pocket units are bringing back a kind of directness that feels less paparazzi and more diary entry.",
      },
      {
        type: "productEmbed",
        embed: {
          productSlug: "godox-lux-junior-flash",
          note:
            "Small enough to keep on hand, strong enough to carve a face out of bar light.",
        },
      },
      {
        type: "pullQuote",
        quote:
          "Hard light stops feeling harsh when the photographer knows exactly why it is there.",
        attribution: "Maya Ito",
      },
      {
        type: "paragraph",
        content:
          "The result is a new intimacy: sharp catchlights, quick gestures, and color that feels alive instead of merely documented.",
      },
    ],
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
    issue: "Issue 01 / April 2026",
    publishedAt: "April 7, 2026",
    author: {
      name: "Leah March",
      role: "Archive Editor",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
    },
    featuredProductSlugs: ["kodak-portra-400"],
    body: [
      {
        type: "paragraph",
        content:
          "Grain can make an image feel less perfect and more proximate. It is not nostalgia alone; it is the sensation of a surface that carries time in it.",
      },
      {
        type: "productEmbed",
        embed: {
          productSlug: "kodak-portra-400",
          note:
            "Still one of the easiest ways to make skin, asphalt, and window light live in the same palette.",
        },
      },
    ],
  },
  {
    title: "How Repair Shops Became The New Streetwear Forums",
    slug: "repair-shops-forums",
    href: "/stories/repair-shops-forums",
    image:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1200&q=80",
    summary:
      "There is a culture forming around patina, maintenance, and the social life of cameras that refuse to die.",
    category: "Interview",
    readingTime: "9 Min Read",
    blurDataURL,
    issue: "Issue 01 / April 2026",
    publishedAt: "March 29, 2026",
    author: {
      name: "Tariq Boone",
      role: "Features Writer",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
    },
    featuredProductSlugs: ["leather-wrist-strap-smoke-tan"],
    body: [
      {
        type: "paragraph",
        content:
          "Repair counters have become unofficial salons for the city’s most obsessive camera carriers. The talk is half mechanics, half myth-making.",
      },
      {
        type: "productEmbed",
        embed: {
          productSlug: "leather-wrist-strap-smoke-tan",
          note:
            "The kind of accessory that gets better only after years of oils, weather, and accidental history.",
        },
      },
    ],
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
    issue: "Issue 00 / March 2026",
    publishedAt: "March 24, 2026",
    author: {
      name: "Jonah Vale",
      role: "Gear Columnist",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    },
    featuredProductSlugs: ["metal-ventilated-lens-hood"],
    body: [
      {
        type: "paragraph",
        content:
          "The best accessories do their work before you notice them. A good lens hood removes problems rather than adding personality.",
      },
      {
        type: "productEmbed",
        embed: {
          productSlug: "metal-ventilated-lens-hood",
          note:
            "Tight tolerances and a lean silhouette make this feel more like part of the lens than an afterthought.",
        },
      },
    ],
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
    issue: "Issue 00 / March 2026",
    publishedAt: "March 18, 2026",
    author: {
      name: "Leah March",
      role: "Archive Editor",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
    },
    featuredProductSlugs: ["kodak-portra-400"],
    body: [
      {
        type: "paragraph",
        content:
          "The contact sheet is not only about selection. It is proof that feeling often lives one frame before certainty.",
      },
    ],
  },
];

export const issues: MonthlyIssue[] = [
  {
    issueNumber: "01",
    slug: "01",
    title: "After Hours, Before Dawn",
    dek: "A first issue about late trains, rain sheen, compact cameras, and the accessories that earn their place by staying quiet.",
    coverImage:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1600&q=80",
    month: "April",
    year: 2026,
    articles: stories.slice(0, 4),
  },
  {
    issueNumber: "00",
    slug: "00",
    title: "Margins, Repairs, and Contact Prints",
    dek: "Notes from workshops, archive drawers, and the objects that outlive trend cycles.",
    coverImage:
      "https://images.unsplash.com/photo-1516728778615-2d590ea18575?auto=format&fit=crop&w=1600&q=80",
    month: "March",
    year: 2026,
    articles: stories.slice(4),
  },
];

export const collections: LookbookCollection[] = [
  {
    id: "midnight-reflections",
    title: "Midnight Reflections",
    creator: "Ari Mendoza",
    category: "Night Carry",
    itemCount: 4,
    saves: 212,
    createdAt: "April 12, 2026",
    thumbnail:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1400&q=80",
    description:
      "A compact city-walk kit built around rain, reflections, and fast access.",
    productSlugs: ["ricoh-griiix-urban-shadow", "cinebloom-10-filter", "bellroy-venture-sling-6l"],
  },
  {
    id: "soft-carry-study",
    title: "Soft Carry Study",
    creator: "Noa Elster",
    category: "Bag Systems",
    itemCount: 3,
    saves: 154,
    createdAt: "April 8, 2026",
    thumbnail:
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1400&q=80",
    description:
      "A study in shape, quiet hardware, and all-day comfort for shoulder carry.",
    productSlugs: ["bellroy-venture-sling-6l", "modular-insert-coal-felt", "leather-wrist-strap-smoke-tan"],
  },
  {
    id: "hard-light-diary",
    title: "Hard Light Diary",
    creator: "Rui Chen",
    category: "Flash",
    itemCount: 3,
    saves: 98,
    createdAt: "April 1, 2026",
    thumbnail:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1400&q=80",
    description:
      "A compact direct-flash kit for portraits made between bars, bodegas, and train platforms.",
    productSlugs: ["godox-lux-junior-flash", "ricoh-griiix-urban-shadow", "cinebloom-10-filter"],
  },
];

export const featuredStory: FeatureStory = stories[0]!;
export const topStories: [Story, Story, Story] = [stories[0]!, stories[1]!, stories[2]!];
export const archiveStories = stories.slice(3);
export const monthlyIssue: MonthlyIssue = issues[0]!;

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

export function getStoryBySlug(slug: string) {
  return stories.find((story) => story.slug === slug);
}

export function getIssueBySlug(slug: string) {
  return issues.find((issue) => issue.slug === slug || issue.issueNumber === slug);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getCollectionById(id: string) {
  return collections.find((collection) => collection.id === id);
}

export function getProductsForStory(story: Story) {
  return story.featuredProductSlugs
    .map((slug) => getProductBySlug(slug))
    .filter((product): product is Product => Boolean(product));
}

export function getStoriesForProduct(productSlug: string) {
  return stories.filter((story) => story.featuredProductSlugs.includes(productSlug));
}

export function getRelatedStories(slug: string) {
  return stories.filter((story) => story.slug !== slug).slice(0, 3);
}

export function getRelatedProducts(slug: string) {
  return products.filter((product) => product.slug !== slug).slice(0, 4);
}

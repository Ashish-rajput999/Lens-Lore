import Image from "next/image";
import Link from "next/link";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { collections } from "@/lib/site-data";

const blurPlaceholder =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MCcgaGVpZ2h0PSc0MCcgdmlld0JveD0nMCAwIDQwIDQwJz48cmVjdCB3aWR0aD0nNDAnIGhlaWdodD0nNDAnIGZpbGw9JyMxNTE1MTUnLz48L3N2Zz4=";

export default function CollectionsPage() {
  const [hero, second, ...rest] = collections;

  return (
    <PageWrapper>
      {/* Page header */}
      <section className="border-b border-ivory/8 px-5 pb-14 pt-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.48em] text-gold">
            Collections
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-[clamp(3rem,7vw,5.5rem)] leading-[0.95] text-ivory">
            Public lookbooks built like moodboards.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-ivory/58">
            Every collection is a curated set of gear — assembled by editors,
            contributors, and readers. Browse, save, and build your own on the canvas.
          </p>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl space-y-4">

          {/* Row 1: Hero (large) + Second (tall) */}
          {hero && second && (
            <div className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
              {/* Hero — large landscape */}
              <Link
                href={`/collections/${hero.id}`}
                className="group relative block overflow-hidden border border-ivory/10 bg-slate"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={hero.thumbnail}
                    alt={hero.title}
                    fill
                    priority
                    sizes="(min-width: 1024px) 65vw, 100vw"
                    placeholder="blur"
                    blurDataURL={blurPlaceholder}
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 space-y-2 p-7">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.42em] text-gold">
                      {hero.category}
                    </span>
                    <span className="h-px w-6 bg-gold/40" />
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.38em] text-ivory/45">
                      {hero.itemCount} items · {hero.saves} saves
                    </span>
                  </div>
                  <h2 className="font-display text-4xl text-ivory transition-colors group-hover:text-gold sm:text-5xl">
                    {hero.title}
                  </h2>
                  <p className="max-w-md text-sm leading-7 text-ivory/62">
                    {hero.description}
                  </p>
                  <div className="flex items-center gap-3 pt-1">
                    <div className="h-px flex-1 bg-ivory/12" />
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.35em] text-ivory/45">
                      By {hero.creator}
                    </span>
                  </div>
                </div>
              </Link>

              {/* Second — tall portrait */}
              <Link
                href={`/collections/${second.id}`}
                className="group relative block overflow-hidden border border-ivory/10 bg-slate"
              >
                <div className="relative h-full min-h-[320px] overflow-hidden">
                  <Image
                    src={second.thumbnail}
                    alt={second.title}
                    fill
                    sizes="(min-width: 1024px) 35vw, 100vw"
                    placeholder="blur"
                    blurDataURL={blurPlaceholder}
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/25 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 space-y-2 p-6">
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.42em] text-gold">
                    {second.category}
                  </span>
                  <h3 className="font-display text-3xl text-ivory transition-colors group-hover:text-gold">
                    {second.title}
                  </h3>
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-ivory/45">
                      {second.itemCount} items · By {second.creator}
                    </span>
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-ivory/45 transition-colors group-hover:text-gold">
                      Explore →
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Row 2: remaining collections in 2-col grid (always even) */}
          <div className="grid gap-4 sm:grid-cols-2">
            {rest.map((collection, i) => {
              // Last item spans full width if count is odd
              const isLastOdd = rest.length % 2 !== 0 && i === rest.length - 1;
              return (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.id}`}
                  className={`group relative block overflow-hidden border border-ivory/10 bg-slate ${isLastOdd ? "sm:col-span-2" : ""}`}
                >
                  <div className={`relative overflow-hidden ${isLastOdd ? "aspect-[21/9]" : "aspect-[4/3]"}`}>
                    <Image
                      src={collection.thumbnail}
                      alt={collection.title}
                      fill
                      sizes={isLastOdd ? "(min-width: 640px) 100vw, 100vw" : "(min-width: 640px) 50vw, 100vw"}
                      placeholder="blur"
                      blurDataURL={blurPlaceholder}
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 space-y-2 p-6">
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.42em] text-gold">
                      {collection.category}
                    </span>
                    <h3 className="font-display text-2xl text-ivory transition-colors group-hover:text-gold sm:text-3xl">
                      {collection.title}
                    </h3>
                    {isLastOdd && (
                      <p className="max-w-lg text-sm leading-7 text-ivory/55">
                        {collection.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between pt-1">
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-ivory/42">
                        {collection.itemCount} items · By {collection.creator}
                      </span>
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-ivory/42 transition-colors group-hover:text-gold">
                        Explore →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Footer stat bar */}
          <div className="flex items-center justify-between border border-ivory/8 bg-slate/40 px-6 py-4">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.4em] text-ivory/38">
              {collections.length} Collections · Updated April 2026
            </span>
            <Link
              href="/canvas"
              className="font-mono text-[0.65rem] uppercase tracking-[0.38em] text-gold/70 transition-colors hover:text-gold"
            >
              Build Your Own →
            </Link>
          </div>

        </div>
      </section>
    </PageWrapper>
  );
}

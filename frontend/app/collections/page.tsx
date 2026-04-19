import Image from "next/image";
import Link from "next/link";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { PageIntro } from "@/components/ui/PageIntro";
import { collections } from "@/lib/site-data";

export default function CollectionsPage() {
  const [featured, ...rest] = collections;

  return (
    <PageWrapper>
      <section className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl space-y-14">
          <PageIntro
            eyebrow="Collections"
            title="Public lookbooks built like moodboards, not shopping carts."
            description="Each collection below now resolves to a real detail page so the browse flow feels complete."
          />

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <Link href={`/collections/${featured.id}`} className="group relative block overflow-hidden border border-ivory/12">
              <div className="relative aspect-[16/9]">
                <Image
                  src={featured.thumbnail}
                  alt={featured.title}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2Zy8+"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 space-y-3 p-8">
                <p className="label-mono text-gold">Featured Collection</p>
                <h2 className="font-display text-5xl text-ivory">{featured.title}</h2>
                <p className="max-w-xl text-base leading-8 text-ivory/68">{featured.description}</p>
              </div>
            </Link>
            <div className="space-y-4 border border-ivory/12 bg-slate p-6">
              <p className="label-mono">Browse By</p>
              {["Most Saved", "Newest", "By Category"].map((filter) => (
                <div
                  key={filter}
                  className="border-t border-ivory/10 pt-4 first:border-t-0 first:pt-0"
                >
                  <p className="font-display text-3xl text-ivory">{filter}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {rest.map((collection) => (
              <Link key={collection.id} href={`/collections/${collection.id}`} className="border border-ivory/12 bg-slate">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={collection.thumbnail}
                    alt={collection.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2Zy8+"
                    className="object-cover"
                  />
                </div>
                <div className="space-y-3 p-5">
                  <p className="label-mono text-gold">{collection.creator}</p>
                  <h3 className="font-display text-3xl text-ivory">{collection.title}</h3>
                  <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.32em] text-ivory/62">
                    <span>{collection.itemCount} Items</span>
                    <span>Explore</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

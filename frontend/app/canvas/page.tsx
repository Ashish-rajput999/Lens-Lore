import Link from "next/link";
import { ProductCard } from "@/components/commerce/ProductCard";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { PageIntro } from "@/components/ui/PageIntro";
import { products } from "@/lib/site-data";

export default function CanvasPage() {
  return (
    <PageWrapper>
      <section className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl space-y-12">
          <PageIntro
            eyebrow="Lookbook Canvas"
            title="A dark workspace for arranging products like a moodboard."
            description="This is now a live route rather than a dead link. It acts as the entry point for the future drag canvas and already connects into the collection flow."
          />

          <div className="grid gap-6 lg:grid-cols-[280px_1fr_320px]">
            <div className="space-y-4 border border-ivory/12 bg-slate p-5">
              <p className="label-mono">Product Rail</p>
              <div className="space-y-4">
                {products.slice(0, 4).map((product) => (
                  <Link
                    key={product.slug}
                    href={`/product/${product.slug}`}
                    className="block border border-ivory/10 px-4 py-4 font-display text-xl text-ivory transition-colors hover:border-gold"
                  >
                    {product.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="min-h-[680px] border border-dashed border-ivory/18 bg-[radial-gradient(circle_at_top,#2a2a2a,transparent_45%)] p-6">
              <div className="grid h-full place-items-center">
                <div className="max-w-md text-center">
                  <p className="font-display text-4xl text-ivory">Canvas Stage</p>
                  <p className="mt-4 text-base leading-8 text-ivory/62">
                    The free-drag interaction is the next implementation step, but the page and save/share flow are now in place and navigable.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 border border-ivory/12 bg-slate p-5">
              <p className="label-mono">Canvas Settings</p>
              <input
                defaultValue="Midnight Kit Study"
                className="w-full border border-ivory/12 bg-black px-4 py-4 text-ivory outline-none"
              />
              <textarea
                defaultValue="A compact carry system for rain, transit, and quick portraits."
                className="min-h-[160px] w-full border border-ivory/12 bg-black px-4 py-4 text-ivory outline-none"
              />
              <Link
                href="/collections/midnight-reflections"
                className="flex items-center justify-between border border-blood px-4 py-4 font-mono text-xs uppercase tracking-[0.3em] text-ivory transition-colors hover:bg-blood"
              >
                Share Collection
                <span>Live</span>
              </Link>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.slug} product={product} compact />
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

import Image from "next/image";
import Link from "next/link";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { PageIntro } from "@/components/ui/PageIntro";
import { products } from "@/lib/site-data";

export default function ShopPage() {
  const feature = products[0]!;
  const second = products[1]!;
  const third = products[2]!;
  const fourth = products[3]!;
  const rest = products.slice(4);

  return (
    <PageWrapper>
      <section className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl space-y-14">
          <PageIntro
            eyebrow="Shop"
            title="Editorial commerce: products introduced the way stories introduce characters."
            description="This page now has real destinations for every product and a magazine-style rhythm instead of broken grid links."
          />

          <div className="flex flex-wrap gap-3">
            {["Cameras", "Bags", "Flash", "Film", "Accessories"].map((filter) => (
              <span
                key={filter}
                className="border border-ivory/12 px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.32em] text-ivory/70"
              >
                {filter}
              </span>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <Link href={`/product/${feature.slug}`} className="group block border border-ivory/12">
              <div className="relative aspect-[5/4] overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.name}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2Zy8+"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
            </Link>
            <div className="flex flex-col justify-between border border-ivory/12 bg-slate p-8">
              <div className="space-y-4">
                <p className="label-mono text-gold">{feature.tag}</p>
                <h2 className="font-display text-5xl text-ivory">{feature.name}</h2>
                <p className="max-w-xl text-base leading-8 text-ivory/68">{feature.description}</p>
              </div>
              <div className="space-y-4">
                <div className="font-mono text-xs uppercase tracking-[0.32em] text-ivory/64">
                  {feature.brand} / ${feature.price}
                </div>
                <Link
                  href={`/product/${feature.slug}`}
                  className="inline-flex w-fit border border-gold px-5 py-3 font-mono text-xs uppercase tracking-[0.35em] text-gold transition-colors hover:bg-gold hover:text-black"
                >
                  View Product
                </Link>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[second, third, fourth].map((product) => (
              <Link key={product.slug} href={`/product/${product.slug}`} className="group border border-ivory/12 bg-slate">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2Zy8+"
                    className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                  />
                  <Image
                    src={product.lifestyleImage}
                    alt={`${product.name} in context`}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2Zy8+"
                    className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </div>
                <div className="space-y-3 p-5">
                  <p className="label-mono">{product.tag}</p>
                  <h3 className="font-display text-3xl text-ivory">{product.name}</h3>
                  <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.3em] text-ivory/65">
                    <span>{product.brand}</span>
                    <span>${product.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="border border-ivory/12 bg-[linear-gradient(135deg,#2a2a2a,transparent)] p-8 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="space-y-4">
                <p className="label-mono text-gold">Full Width Feature</p>
                <h2 className="font-display text-5xl text-ivory">Built for the long walk back.</h2>
                <p className="text-base leading-8 text-ivory/66">{rest[0]?.description}</p>
                {rest[0] ? (
                  <Link
                    href={`/product/${rest[0].slug}`}
                    className="inline-flex border border-ivory/14 px-5 py-3 font-mono text-xs uppercase tracking-[0.35em] text-ivory transition-colors hover:border-gold hover:text-gold"
                  >
                    Explore {rest[0].name}
                  </Link>
                ) : null}
              </div>
              {rest[0] ? (
                <div className="relative aspect-[16/9] overflow-hidden border border-ivory/12">
                  <Image
                    src={rest[0].lifestyleImage}
                    alt={rest[0].name}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2Zy8+"
                    className="object-cover"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

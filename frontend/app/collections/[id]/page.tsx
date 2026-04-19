import Image from "next/image";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/commerce/ProductCard";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { getCollectionById, getProductBySlug } from "@/lib/site-data";

type CollectionPageProps = {
  params: {
    id: string;
  };
};

export default function CollectionPage({ params }: CollectionPageProps) {
  const collection = getCollectionById(params.id);

  if (!collection) {
    notFound();
  }

  const products = collection.productSlugs
    .map((slug) => getProductBySlug(slug))
    .filter(Boolean);

  return (
    <PageWrapper>
      <section className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl space-y-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
            <div className="relative aspect-[16/10] overflow-hidden border border-ivory/12">
              <Image
                src={collection.thumbnail}
                alt={collection.title}
                fill
                priority
                sizes="(min-width: 1024px) 60vw, 100vw"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2Zy8+"
                className="object-cover"
              />
            </div>
            <div className="space-y-5 border border-ivory/12 bg-slate p-8">
              <p className="label-mono text-gold">{collection.category}</p>
              <h1 className="font-display text-5xl text-ivory">{collection.title}</h1>
              <p className="text-base leading-8 text-ivory/66">{collection.description}</p>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="label-mono">Creator</p>
                  <p className="mt-3 font-display text-2xl text-ivory">{collection.creator}</p>
                </div>
                <div>
                  <p className="label-mono">Items</p>
                  <p className="mt-3 font-display text-2xl text-ivory">{collection.itemCount}</p>
                </div>
                <div>
                  <p className="label-mono">Saves</p>
                  <p className="mt-3 font-display text-2xl text-ivory">{collection.saves}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) =>
              product ? <ProductCard key={product.slug} product={product} compact /> : null,
            )}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

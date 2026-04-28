import Image from "next/image";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/commerce/ProductCard";
import { ProductPurchasePanel } from "@/components/commerce/ProductPurchasePanel";
import { ArticleCard } from "@/components/magazine/ArticleCard";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { getProductBySlug, getRelatedProducts, getStoriesForProduct } from "@/lib/site-data";

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const featuredStories = getStoriesForProduct(product.slug);
  const relatedProducts = getRelatedProducts(product.slug);

  return (
    <PageWrapper>
      <section className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_420px]">
          <div className="space-y-6">
            {[product.image, product.lifestyleImage, product.image].map((image, index) => (
              <div key={`${image}-${index}`} className="relative aspect-[4/5] overflow-hidden border border-ivory/12">
                <Image
                  src={image}
                  alt={product.name}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2Zy8+"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <div className="space-y-8 lg:sticky lg:top-28 lg:h-fit">
            <div className="space-y-4 border border-ivory/12 bg-slate p-6">
              <p className="label-mono text-gold">{product.tag}</p>
              <h1 className="font-display text-5xl text-ivory">{product.name}</h1>
              <p className="text-base leading-8 text-ivory/66">{product.description}</p>
              <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em] text-ivory/64">
                <span>{product.brand}</span>
                <span>${product.price}</span>
                <span>{product.category}</span>
              </div>
            </div>

            <ProductPurchasePanel product={product} />

            <div className="border border-ivory/12 bg-slate p-6">
              <p className="label-mono">Specs</p>
              <div className="mt-4 space-y-3">
                {product.specs.map((spec) => (
                  <div key={spec.key} className="flex items-center justify-between border-t border-ivory/10 pt-3 first:border-t-0 first:pt-0">
                    <span className="font-mono text-xs uppercase tracking-[0.3em] text-ivory/48">
                      {spec.key}
                    </span>
                    <span className="text-sm text-ivory/72">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-7xl space-y-8">
          <p className="label-mono text-gold">As Featured In</p>
          <div className="grid gap-6 lg:grid-cols-3">
            {featuredStories.map((story) => (
              <ArticleCard key={story.slug} story={story} />
            ))}
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-7xl space-y-8">
          <p className="label-mono">Related Products</p>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {relatedProducts.map((related) => (
              <ProductCard key={related.slug} product={related} compact />
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/site-data";

type ShoppableSidebarProps = {
  products: Product[];
};

export function ShoppableSidebar({ products }: ShoppableSidebarProps) {
  const total = products.reduce((sum, product) => sum + product.price, 0);

  return (
    <aside className="space-y-6 lg:sticky lg:top-28">
      <div className="border border-ivory/12 bg-slate p-5">
        <p className="label-mono text-gold">Shop This Story</p>
        <div className="mt-5 space-y-4">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/product/${product.slug}`}
              data-cursor="hover"
              className="group grid grid-cols-[84px_1fr] gap-4 border-t border-ivory/10 pt-4 first:border-t-0 first:pt-0"
            >
              <div className="relative aspect-square overflow-hidden border border-ivory/12">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="120px"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MCcgaGVpZ2h0PSc0MCcgdmlld0JveD0nMCAwIDQwIDQwJz48cmVjdCB3aWR0aD0nNDAnIGhlaWdodD0nNDAnIGZpbGw9JyMxNTE1MTUnLz48L3N2Zz4="
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="space-y-2">
                <p className="font-display text-xl text-ivory">{product.name}</p>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.32em] text-ivory/56">
                  {product.brand}
                </p>
                <div className="flex items-center justify-between pt-2">
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold">
                    ${product.price}
                  </span>
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.32em] text-ivory/60 transition-colors group-hover:text-ivory">
                    Add to Lookbook
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="border border-ivory/12 bg-black p-5">
        <p className="label-mono">Curated Total</p>
        <div className="mt-3 flex items-end justify-between">
          <p className="font-display text-3xl text-ivory">${total}</p>
          <Link
            href="/cart"
            className="font-mono text-xs uppercase tracking-[0.35em] text-gold"
          >
            View Cart
          </Link>
        </div>
      </div>
    </aside>
  );
}

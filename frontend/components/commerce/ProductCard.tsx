import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Product } from "@/lib/site-data";

type ProductCardProps = {
  product: Product;
  compact?: boolean;
};

export function ProductCard({ product, compact = false }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.slug}`}
      data-cursor="hover"
      className="group block border border-ivory/12 bg-slate"
    >
      <div className={`relative overflow-hidden ${compact ? "aspect-square" : "aspect-[4/5]"}`}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes={compact ? "(min-width: 1024px) 20vw, 50vw" : "(min-width: 1024px) 30vw, 90vw"}
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MCcgaGVpZ2h0PSc0MCcgdmlld0JveD0nMCAwIDQwIDQwJz48cmVjdCB3aWR0aD0nNDAnIGhlaWdodD0nNDAnIGZpbGw9JyMxNTE1MTUnLz48L3N2Zz4="
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="label-mono text-gold">{product.brand}</p>
            <h3 className={compact ? "font-display text-xl text-ivory" : "font-display text-2xl text-ivory"}>
              {product.name}
            </h3>
          </div>
          <ArrowUpRight className="mt-1 h-4 w-4 text-ivory/50 transition-colors group-hover:text-gold" />
        </div>
        <p className="text-sm leading-7 text-ivory/62">{product.description}</p>
        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.32em] text-ivory/76">
          <span>{product.category}</span>
          <span>${product.price}</span>
        </div>
      </div>
    </Link>
  );
}

import Link from "next/link";
import { ProductCard } from "@/components/commerce/ProductCard";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { PageIntro } from "@/components/ui/PageIntro";
import { products } from "@/lib/site-data";

export default function CartPage() {
  const cartProducts = products.slice(0, 3);
  const subtotal = cartProducts.reduce((sum, product) => sum + product.price, 0);

  return (
    <PageWrapper>
      <section className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl space-y-12">
          <PageIntro
            eyebrow="Cart"
            title="A curated cart view with live destinations instead of empty controls."
            description="Every cart item links back to a real product page and checkout now has its own route."
          />

          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
            <div className="grid gap-6">
              {cartProducts.map((product) => (
                <ProductCard key={product.slug} product={product} compact />
              ))}
            </div>

            <div className="h-fit space-y-5 border border-ivory/12 bg-slate p-6 lg:sticky lg:top-28">
              <p className="label-mono">Summary</p>
              <div className="space-y-3 border-y border-ivory/10 py-5">
                <div className="flex items-center justify-between text-sm text-ivory/68">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-ivory/68">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              <Link
                href="/checkout"
                className="flex items-center justify-between border border-blood px-4 py-4 font-mono text-xs uppercase tracking-[0.3em] text-ivory transition-colors hover:bg-blood"
              >
                Continue to Checkout
                <span>${subtotal}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

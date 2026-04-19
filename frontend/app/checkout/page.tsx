import { PageWrapper } from "@/components/layout/PageWrapper";
import { PageIntro } from "@/components/ui/PageIntro";

export default function CheckoutPage() {
  return (
    <PageWrapper>
      <section className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl space-y-12">
          <PageIntro
            eyebrow="Checkout"
            title="A dedicated checkout route with a stable inline payment area."
            description="The Stripe integration still needs live keys, but the UX no longer breaks when users try to reach checkout."
          />

          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
            <div className="border border-ivory/12 bg-slate p-6">
              <p className="label-mono">Payment Element</p>
              <div className="mt-5 min-h-[320px] border border-ivory/12 bg-black/70 p-6">
                <div className="grid gap-4">
                  <div className="border border-ivory/10 px-4 py-4 text-ivory/55">Email</div>
                  <div className="border border-ivory/10 px-4 py-4 text-ivory/55">Card details</div>
                  <div className="border border-ivory/10 px-4 py-4 text-ivory/55">Billing address</div>
                </div>
              </div>
            </div>

            <div className="h-fit border border-ivory/12 bg-black p-6 lg:sticky lg:top-28">
              <p className="label-mono">Order Summary</p>
              <div className="mt-5 space-y-3 font-mono text-xs uppercase tracking-[0.3em] text-ivory/62">
                <div className="flex items-center justify-between">
                  <span>Items</span>
                  <span>$1,307</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Shipping</span>
                  <span>TBD</span>
                </div>
                <div className="flex items-center justify-between border-t border-ivory/10 pt-4 text-gold">
                  <span>Total</span>
                  <span>$1,307</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

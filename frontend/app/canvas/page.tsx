import { LookbookCanvas } from "@/components/lookbook/LookbookCanvas";
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
            description="The canvas now behaves like a persistent draft workspace, so products you collect from stories and product pages stay arranged between visits while we build the shared publishing layer."
          />

          <LookbookCanvas products={products} />
        </div>
      </section>
    </PageWrapper>
  );
}

import Link from "next/link";
import { PageWrapper } from "@/components/layout/PageWrapper";

export default function NotFound() {
  return (
    <PageWrapper>
      <section className="grid min-h-[70vh] place-items-center px-5 py-24 sm:px-8 lg:px-12">
        <div className="max-w-2xl space-y-5 text-center">
          <p className="label-mono text-gold">404 / Missing Page</p>
          <h1 className="font-display text-6xl text-ivory sm:text-7xl">
            The page slipped back into the archive.
          </h1>
          <p className="text-base leading-8 text-ivory/62">
            I replaced the default Next.js 404 with a branded fallback so even bad URLs feel intentional.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/"
              className="border border-gold px-5 py-3 font-mono text-xs uppercase tracking-[0.35em] text-gold transition-colors hover:bg-gold hover:text-black"
            >
              Back Home
            </Link>
            <Link
              href="/stories"
              className="border border-ivory/12 px-5 py-3 font-mono text-xs uppercase tracking-[0.35em] text-ivory transition-colors hover:border-ivory/30"
            >
              Browse Stories
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

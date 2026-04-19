import Link from "next/link";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { PageIntro } from "@/components/ui/PageIntro";

export default function ProfilePage() {
  return (
    <PageWrapper>
      <section className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl space-y-12">
          <PageIntro
            eyebrow="Account"
            title="Profile, saved stories, and collections now have real account surfaces."
            description="This keeps the account icon from becoming a dead end and gives us a stable place to wire Supabase auth next."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="border border-ivory/12 bg-slate p-6">
              <p className="label-mono">Reader</p>
              <p className="mt-4 font-display text-4xl text-ivory">Ashish Rajput</p>
              <p className="mt-3 text-sm leading-7 text-ivory/62">
                Collector of compact cameras, late light, and archive pages.
              </p>
            </div>
            <Link href="/saved" className="border border-ivory/12 bg-black p-6 transition-colors hover:border-gold">
              <p className="label-mono">Saved</p>
              <p className="mt-4 font-display text-4xl text-ivory">Saved Stories</p>
            </Link>
            <Link href="/collections" className="border border-ivory/12 bg-black p-6 transition-colors hover:border-gold">
              <p className="label-mono">Lookbooks</p>
              <p className="mt-4 font-display text-4xl text-ivory">Public Collections</p>
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

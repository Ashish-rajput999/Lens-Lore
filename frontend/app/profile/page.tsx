import Link from "next/link";
import { ProfileLibrarySummary } from "@/components/account/ProfileLibrarySummary";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { PageIntro } from "@/components/ui/PageIntro";
import { getCurrentUser } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default async function ProfilePage() {
  const configured = isSupabaseConfigured();
  const user = await getCurrentUser();

  return (
    <PageWrapper>
      <section className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl space-y-12">
          <PageIntro
            eyebrow="Account"
            title="Your personal LENS & LORE account."
            description="Multi-user auth is Supabase-ready, so saved stories, carts, and lookbooks can scale per user instead of living as local placeholders."
          />

          {!configured ? (
            <div className="border border-gold/30 bg-gold/10 p-6">
              <p className="label-mono text-gold">Supabase Not Configured</p>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-ivory/70">
                Add `NEXT_PUBLIC_SUPABASE_URL` and
                `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `frontend/.env` to activate
                real sign-up, sign-in, and session-aware profiles.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/sign-up"
                  className="border border-gold px-5 py-3 font-mono text-xs uppercase tracking-[0.35em] text-gold transition-colors hover:bg-gold hover:text-black"
                >
                  Open Sign Up
                </Link>
                <Link
                  href="/sign-in"
                  className="border border-ivory/12 px-5 py-3 font-mono text-xs uppercase tracking-[0.35em] text-ivory transition-colors hover:border-ivory/30"
                >
                  Open Sign In
                </Link>
              </div>
            </div>
          ) : null}

          {configured && !user ? (
            <div className="border border-ivory/12 bg-slate p-6">
              <p className="label-mono text-gold">Authentication Required</p>
              <h2 className="mt-4 font-display text-4xl text-ivory">
                Sign in to view your profile.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-ivory/62">
                User-specific data will be loaded from Supabase once a session
                exists.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/sign-in"
                  className="border border-blood px-5 py-3 font-mono text-xs uppercase tracking-[0.35em] text-ivory transition-colors hover:bg-blood"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="border border-ivory/12 px-5 py-3 font-mono text-xs uppercase tracking-[0.35em] text-ivory transition-colors hover:border-gold hover:text-gold"
                >
                  Create Account
                </Link>
              </div>
            </div>
          ) : null}

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="border border-ivory/12 bg-slate p-6">
              <p className="label-mono">Reader</p>
              <p className="mt-4 font-display text-4xl text-ivory">
                {user?.email ?? "Guest Reader"}
              </p>
              <p className="mt-3 text-sm leading-7 text-ivory/62">
                {user
                  ? "Session active. This account can now own saved articles, carts, orders, and lookbooks."
                  : "Create an account to make this profile user-specific."}
              </p>
              {user ? <div className="mt-5"><SignOutButton /></div> : null}
            </div>
            <Link href="/collections" className="border border-ivory/12 bg-black p-6 transition-colors hover:border-gold">
              <p className="label-mono">Collections</p>
              <p className="mt-4 font-display text-4xl text-ivory">Public Lookbooks</p>
              <p className="mt-3 text-sm leading-7 text-ivory/62">
                Browse the outward-facing side of the editorial moodboard universe.
              </p>
            </Link>
            <Link href="/stories" className="border border-ivory/12 bg-black p-6 transition-colors hover:border-gold">
              <p className="label-mono">Stories</p>
              <p className="mt-4 font-display text-4xl text-ivory">Editorial Feed</p>
              <p className="mt-3 text-sm leading-7 text-ivory/62">
                Return to the magazine and continue building your archive.
              </p>
            </Link>
          </div>

          <ProfileLibrarySummary />
        </div>
      </section>
    </PageWrapper>
  );
}

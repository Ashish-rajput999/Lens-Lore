import { AuthForm } from "@/components/auth/AuthForm";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { PageIntro } from "@/components/ui/PageIntro";

export default function SignInPage() {
  return (
    <PageWrapper>
      <section className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_480px] lg:items-start">
          <PageIntro
            eyebrow="Member Access"
            title="Sign in to sync saved stories, carts, and lookbooks across devices."
            description="The account system is Supabase-ready with password auth, magic links, and Google OAuth."
          />
          <AuthForm mode="sign-in" />
        </div>
      </section>
    </PageWrapper>
  );
}

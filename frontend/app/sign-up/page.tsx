import { AuthForm } from "@/components/auth/AuthForm";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { PageIntro } from "@/components/ui/PageIntro";

export default function SignUpPage() {
  return (
    <PageWrapper>
      <section className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_480px] lg:items-start">
          <PageIntro
            eyebrow="Create Account"
            title="Build a personal archive of gear, stories, and visual collections."
            description="New users can register with email/password, receive a magic link, or continue with Google once Supabase credentials are configured."
          />
          <AuthForm mode="sign-up" />
        </div>
      </section>
    </PageWrapper>
  );
}

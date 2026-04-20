import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/profile";
  const supabase = createServerSupabaseClient();

  if (!supabase) {
    return NextResponse.redirect(
      new URL("/sign-in?error=supabase-not-configured", requestUrl.origin),
    );
  }

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(new URL(next, requestUrl.origin));
}

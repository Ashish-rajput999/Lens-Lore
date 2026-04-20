import { createClient } from "@supabase/supabase-js";
import { env, requireEnv } from "../config/env.js";

let supabaseAdminSingleton:
  | ReturnType<typeof createClient<any>>
  | undefined;

export function getSupabaseAdmin() {
  if (supabaseAdminSingleton) {
    return supabaseAdminSingleton;
  }

  supabaseAdminSingleton = createClient<any>(
    requireEnv(
      env.SUPABASE_URL,
      "SUPABASE_URL",
      "Add it to backend/.env before using Supabase-backed routes.",
    ),
    requireEnv(
      env.SUPABASE_SERVICE_ROLE_KEY,
      "SUPABASE_SERVICE_ROLE_KEY",
      "Add it to backend/.env before using Supabase-backed routes.",
    ),
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );

  return supabaseAdminSingleton;
}

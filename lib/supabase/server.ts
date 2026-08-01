import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/lib/supabase/database.types";

type ServerFactory = typeof createServerClient<Database, "public">;
export type ServerSupabaseClient = ReturnType<ServerFactory>;

export async function createClient(): Promise<ServerSupabaseClient> {
  const cookieStore = await cookies();

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://oppyergocafcybxsneey.supabase.co";
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wcHllcmdvY2FmY3lieHNuZWV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MTc3MjcsImV4cCI6MjEwMTA5MzcyN30.3haQuSQhM2iatPHy_MF4ScrK_pfgq_biefryrpsEV04";

  return createServerClient<Database, "public">(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(
        cookiesToSet: Array<{
          name: string;
          value: string;
          options?: CookieOptions;
        }>
      ) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if middleware is handling session refreshes.
        }
      },
    },
  });
}

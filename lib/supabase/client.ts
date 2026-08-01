import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://oppyergocafcybxsneey.supabase.co";
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wcHllcmdvY2FmY3lieHNuZWV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MTc3MjcsImV4cCI6MjEwMTA5MzcyN30.3haQuSQhM2iatPHy_MF4ScrK_pfgq_biefryrpsEV04";

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

// Browser-side Supabase Client Helper
export function getSupabaseBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  return {
    isConfigured: Boolean(supabaseUrl && supabaseAnonKey),
    url: supabaseUrl,
    key: supabaseAnonKey,
  };
}

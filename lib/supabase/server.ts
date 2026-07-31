// Server-side Component & Server Action Supabase Client Helper
export function getSupabaseServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  return {
    isConfigured: Boolean(supabaseUrl && supabaseServiceKey),
    url: supabaseUrl,
    key: supabaseServiceKey,
  };
}

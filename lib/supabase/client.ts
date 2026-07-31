import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://oppyergocafcybxsneey.supabase.co";
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "sb_publishable_dQ32al8DrCFMKNOl4_5YnA_NE1cp9Mh";

export const createClient = () =>
  createBrowserClient(
    supabaseUrl,
    supabaseKey
  );

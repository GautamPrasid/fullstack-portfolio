import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://oppyergocafcybxsneey.supabase.co";
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "sb_publishable_dQ32al8DrCFMKNOl4_5YnA_NE1cp9Mh";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  let user = null;
  try {
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch {
    // Ignored if offline
  }

  const hasFallbackAdminToken = Boolean(request.cookies.get("admin_session")?.value);
  const isAuthenticated = Boolean(user || hasFallbackAdminToken);

  // Protect all routes under /admin except /admin/login
  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    !request.nextUrl.pathname.startsWith("/admin/login")
  ) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Redirect authenticated user away from login page to dashboard
  if (request.nextUrl.pathname.startsWith("/admin/login") && isAuthenticated) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return supabaseResponse;
}

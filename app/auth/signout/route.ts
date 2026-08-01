"use server";

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const supabase = await createClient();

    try {
      await supabase.auth.signOut();
    } catch {
      // Ignore Supabase signOut errors - still clear cookies
    }

    cookieStore.delete("admin_session");

    const { searchParams } = new URL(request.url);
    const redirect = searchParams.get("redirect") ?? "/admin/login";

    return NextResponse.redirect(new URL(redirect, request.url), 303);
  } catch (err) {
    console.error("SignOut error:", err);
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }
}

export async function GET(request: NextRequest) {
  return POST(request);
}

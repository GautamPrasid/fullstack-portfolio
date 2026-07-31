import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  // Verify secret token if needed
  if (secret && secret !== "revalidate_secret_2026") {
    return NextResponse.json({ message: "Invalid secret token" }, { status: 401 });
  }

  try {
    // Purge static cache for root portfolio home page and admin routes
    revalidatePath("/", "page");
    revalidatePath("/admin/projects", "page");

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      message: "Cache revalidated successfully!",
    });
  } catch (err) {
    return NextResponse.json(
      { revalidated: false, message: "Error revalidating cache" },
      { status: 500 }
    );
  }
}

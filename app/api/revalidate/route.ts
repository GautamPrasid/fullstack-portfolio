import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  const expectedSecret =
    process.env.REVALIDATE_SECRET_TOKEN ??
    process.env.NEXT_PUBLIC_REVALIDATE_SECRET_TOKEN;

  if (expectedSecret && secret && secret !== expectedSecret) {
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
  } catch {
    return NextResponse.json(
      { revalidated: false, message: "Error revalidating cache" },
      { status: 500 }
    );
  }
}

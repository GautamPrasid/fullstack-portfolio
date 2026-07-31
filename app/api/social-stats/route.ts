import { NextResponse } from "next/server";

// Cache response for 1 hour to prevent API rate limiting
export const revalidate = 3600;

export async function GET() {
  const stats = {
    youtube: 5000,   // Fallback baseline
    instagram: 2500, // Fallback baseline
    facebook: 1200,  // Fallback baseline
    tiktok: 3400,    // Fallback baseline
  };

  try {
    // 1. YouTube Data API v3
    if (process.env.YOUTUBE_API_KEY && process.env.YOUTUBE_CHANNEL_ID) {
      const ytRes = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${process.env.YOUTUBE_CHANNEL_ID}&key=${process.env.YOUTUBE_API_KEY}`
      );
      if (ytRes.ok) {
        const ytData = await ytRes.json();
        const subs = ytData.items?.[0]?.statistics?.subscriberCount;
        if (subs) stats.youtube = parseInt(subs, 10);
      }
    }

    // 2. Instagram Graph API (Requires Business/Creator Account linked to Meta)
    if (process.env.INSTAGRAM_ACCESS_TOKEN && process.env.INSTAGRAM_USER_ID) {
      const instaRes = await fetch(
        `https://graph.facebook.com/v19.0/${process.env.INSTAGRAM_USER_ID}?fields=followers_count&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`
      );
      if (instaRes.ok) {
        const instaData = await instaRes.json();
        if (instaData.followers_count) {
          stats.instagram = instaData.followers_count;
        }
      }
    }

    return NextResponse.json({ success: true, stats, updatedAt: new Date().toISOString() });
  } catch (error) {
    console.error("Social stats fetch error:", error);
    // Return fallback stats so the portfolio frontend never crashes
    return NextResponse.json({ success: false, stats });
  }
}

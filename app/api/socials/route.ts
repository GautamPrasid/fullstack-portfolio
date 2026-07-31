import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET() {
  const stats = {
    youtube: 5000,
    instagram: 2500,
    facebook: 1200,
    tiktok: 3400,
  };

  try {
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
    console.error("Social stats API error:", error);
    return NextResponse.json({ success: false, stats });
  }
}

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, subject } = body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Name is required." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    // 1. Save message directly into Supabase contact_messages table
    try {
      const supabase = await createClient();
      await supabase.from("contact_messages").insert([
        {
          name: name.trim(),
          email: email.trim(),
          subject: subject ? subject.trim() : `Portfolio Message from ${name.trim()}`,
          message: message.trim(),
          is_read: false,
          replied: false,
        },
      ]);
    } catch (dbErr) {
      console.error("Failed to insert message into Supabase contact_messages:", dbErr);
    }

    // 2. Dispatch via Resend API if configured
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: ["gprasid10@gmail.com"],
            reply_to: email,
            subject: `Portfolio Message from ${name}`,
            html: `
              <div style="font-family: sans-serif; padding: 20px; color: #111;">
                <h2>New Message from Portfolio Website</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <blockquote style="background: #f4f4f5; padding: 12px 16px; border-left: 4px solid #a855f7;">
                  ${message.replace(/\n/g, "<br />")}
                </blockquote>
              </div>
            `,
          }),
        });
      } catch (emailErr) {
        console.error("Resend API dispatch error:", emailErr);
      }
    }

    return NextResponse.json(
      { success: true, message: "Thank you! Your message has been sent successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}

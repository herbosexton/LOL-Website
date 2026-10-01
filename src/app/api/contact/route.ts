import { NextResponse } from "next/server";
import { z } from "zod";
import {
  createMailTransport,
  escapeHtml,
  isSmtpConfigured,
  smtpPublicErrorMessage,
} from "@/lib/mail";
import { rateLimit } from "@/lib/rate-limit";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  subject: z.string().trim().min(1).max(160),
  message: z.string().trim().min(10).max(5000),
  company: z.string().optional(),
});

function getClientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const limited = rateLimit(`contact:${ip}`, 5, 60_000);
    if (!limited.ok) {
      return NextResponse.json(
        { message: "Too many requests. Please try again shortly." },
        { status: 429 },
      );
    }

    const json = await request.json();
    const parsed = contactSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { message: "Please check the form and try again." },
        { status: 400 },
      );
    }

    // Honeypot — silently accept bots without sending mail.
    if (parsed.data.company) {
      return NextResponse.json({ message: "Thank you. Your message has been sent." });
    }

    if (!isSmtpConfigured() || !process.env.CONTACT_TO_EMAIL) {
      console.error(
        "[contact] SMTP is not fully configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL.",
      );
      return NextResponse.json(
        {
          message:
            "Messaging is temporarily unavailable. Please try again later or visit the store.",
        },
        { status: 503 },
      );
    }

    const transporter = createMailTransport();
    const { name, email, phone, subject, message } = parsed.data;
    const safe = escapeHtml;

    await transporter.sendMail({
      from: `"Legacy on Lark" <${process.env.CONTACT_FROM_EMAIL}>`,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `[Legacy on Lark] ${subject}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "N/A"}`,
        "",
        message,
      ].join("\n"),
      html: `
        <p><strong>Name:</strong> ${safe(name)}</p>
        <p><strong>Email:</strong> ${safe(email)}</p>
        <p><strong>Phone:</strong> ${safe(phone || "N/A")}</p>
        <p><strong>Subject:</strong> ${safe(subject)}</p>
        <p>${safe(message).replace(/\n/g, "<br/>")}</p>
      `,
    });

    return NextResponse.json({
      message: "Thank you. Your message has been sent.",
    });
  } catch (error) {
    console.error("[contact] Failed to process contact form.", error);
    return NextResponse.json(
      { message: smtpPublicErrorMessage(error) },
      { status: 500 },
    );
  }
}

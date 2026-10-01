import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
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

function isSmtpConfigured() {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.CONTACT_TO_EMAIL &&
      process.env.CONTACT_FROM_EMAIL,
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

    if (!isSmtpConfigured()) {
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

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const { name, email, phone, subject, message } = parsed.data;
    const safe = (value: string) =>
      value.replace(/[<>&]/g, (char) => {
        switch (char) {
          case "<":
            return "&lt;";
          case ">":
            return "&gt;";
          case "&":
            return "&amp;";
          default:
            return char;
        }
      });

    await transporter.sendMail({
      from: process.env.CONTACT_FROM_EMAIL,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `[Legacy on Lark] ${safe(subject)}`,
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
      { message: "Unable to send your message right now." },
      { status: 500 },
    );
  }
}

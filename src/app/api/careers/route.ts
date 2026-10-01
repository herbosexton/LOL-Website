import { NextResponse } from "next/server";
import { z } from "zod";
import { siteConfig } from "@/config/site";
import {
  createMailTransport,
  escapeHtml,
  isSmtpConfigured,
  smtpPublicErrorMessage,
} from "@/lib/mail";
import { rateLimit } from "@/lib/rate-limit";

const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const ALLOWED_RESUME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const ALLOWED_RESUME_EXTENSIONS = /\.(pdf|doc|docx)$/i;

const roleIds = siteConfig.careers.map((job) => job.id) as [string, ...string[]];

const careersSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(7).max(40),
  role: z.enum(roleIds),
  experience: z.string().trim().min(10).max(4000),
  availability: z.string().trim().min(2).max(500),
  message: z.string().trim().max(4000).optional().or(z.literal("")),
  company: z.string().optional(),
});

function getClientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function careersInbox() {
  return process.env.CAREERS_TO_EMAIL?.trim() || "careers@loldispensary.com";
}

function isAllowedResume(file: File) {
  const typeOk = !file.type || ALLOWED_RESUME_TYPES.has(file.type);
  const nameOk = ALLOWED_RESUME_EXTENSIONS.test(file.name);
  return typeOk && nameOk;
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const limited = rateLimit(`careers:${ip}`, 5, 60_000);
    if (!limited.ok) {
      return NextResponse.json(
        { message: "Too many requests. Please try again shortly." },
        { status: 429 },
      );
    }

    const formData = await request.formData();
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      role: String(formData.get("role") || ""),
      experience: String(formData.get("experience") || ""),
      availability: String(formData.get("availability") || ""),
      message: String(formData.get("message") || ""),
      company: String(formData.get("company") || ""),
    };

    const parsed = careersSchema.safeParse(payload);
    if (!parsed.success) {
      return NextResponse.json(
        { message: "Please check the form and try again." },
        { status: 400 },
      );
    }

    if (parsed.data.company) {
      return NextResponse.json({
        message: "Thank you. Your application has been sent.",
      });
    }

    const resumeEntry = formData.get("resume");
    if (!(resumeEntry instanceof File) || resumeEntry.size === 0) {
      return NextResponse.json(
        { message: "Please upload your resume (PDF or Word)." },
        { status: 400 },
      );
    }

    if (resumeEntry.size > MAX_RESUME_BYTES) {
      return NextResponse.json(
        { message: "Resume must be 5MB or smaller." },
        { status: 400 },
      );
    }

    if (!isAllowedResume(resumeEntry)) {
      return NextResponse.json(
        { message: "Resume must be a PDF or Word document (.pdf, .doc, .docx)." },
        { status: 400 },
      );
    }

    if (!isSmtpConfigured()) {
      console.error(
        "[careers] SMTP is not fully configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_FROM_EMAIL.",
      );
      return NextResponse.json(
        {
          message:
            "Applications are temporarily unavailable. Please email careers@loldispensary.com directly.",
        },
        { status: 503 },
      );
    }

    const job = siteConfig.careers.find((item) => item.id === parsed.data.role);
    const roleTitle = job?.title || parsed.data.role;
    const resumeBuffer = Buffer.from(await resumeEntry.arrayBuffer());
    const transporter = createMailTransport();
    const { name, email, phone, experience, availability, message } = parsed.data;
    const safe = escapeHtml;

    await transporter.sendMail({
      from: `"Legacy on Lark Careers" <${process.env.CONTACT_FROM_EMAIL}>`,
      to: careersInbox(),
      replyTo: email,
      subject: `[Careers] ${roleTitle}, ${name}`,
      text: [
        `Role: ${roleTitle}`,
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "N/A"}`,
        `Availability: ${availability}`,
        `Resume: ${resumeEntry.name}`,
        "",
        "Experience:",
        experience,
        "",
        "Additional notes:",
        message || "N/A",
      ].join("\n"),
      html: `
        <p><strong>Role:</strong> ${safe(roleTitle)}</p>
        <p><strong>Name:</strong> ${safe(name)}</p>
        <p><strong>Email:</strong> ${safe(email)}</p>
        <p><strong>Phone:</strong> ${safe(phone || "N/A")}</p>
        <p><strong>Availability:</strong> ${safe(availability)}</p>
        <p><strong>Resume:</strong> ${safe(resumeEntry.name)}</p>
        <p><strong>Experience:</strong></p>
        <p>${safe(experience).replace(/\n/g, "<br/>")}</p>
        <p><strong>Additional notes:</strong></p>
        <p>${safe(message || "N/A").replace(/\n/g, "<br/>")}</p>
      `,
      attachments: [
        {
          filename: resumeEntry.name.replace(/[^\w.\- ()]/g, "_"),
          content: resumeBuffer,
          contentType: resumeEntry.type || undefined,
        },
      ],
    });

    return NextResponse.json({
      message: "Thank you. Your application has been sent.",
    });
  } catch (error) {
    console.error("[careers] Failed to process application.", error);
    return NextResponse.json(
      { message: smtpPublicErrorMessage(error) },
      { status: 500 },
    );
  }
}

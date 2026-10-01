import nodemailer from "nodemailer";

export function isSmtpConfigured() {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.CONTACT_FROM_EMAIL,
  );
}

export function createMailTransport() {
  const port = Number(process.env.SMTP_PORT);
  const host = process.env.SMTP_HOST || "";
  const secureEnv = process.env.SMTP_SECURE?.trim().toLowerCase();
  const secure =
    secureEnv === "true" || secureEnv === "1"
      ? true
      : secureEnv === "false" || secureEnv === "0"
        ? false
        : port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    // Helps with SiteGround / shared-host TLS handshakes.
    tls: {
      servername: host === "localhost" || host === "127.0.0.1" ? undefined : host,
      minVersion: "TLSv1.2",
    },
    connectionTimeout: 20_000,
    greetingTimeout: 20_000,
    socketTimeout: 20_000,
  });
}

export function smtpPublicErrorMessage(error: unknown) {
  const err = error as { code?: string; responseCode?: number; message?: string };
  const code = String(err?.code || "").toUpperCase();
  const message = String(err?.message || "").toLowerCase();

  if (
    code === "EAUTH" ||
    message.includes("invalid login") ||
    message.includes("authentication failed") ||
    err?.responseCode === 535
  ) {
    return "Email login failed. Check SMTP_USER and SMTP_PASS in SiteGround environment variables.";
  }

  if (
    code === "ECONNECTION" ||
    code === "ETIMEDOUT" ||
    code === "ESOCKET" ||
    message.includes("connect") ||
    message.includes("timeout")
  ) {
    return "Could not reach the mail server. Try SMTP_HOST=localhost with SMTP_PORT=587, or mail.loldispensary.com with port 465.";
  }

  return "Unable to send your message right now.";
}

export function escapeHtml(value: string) {
  return value.replace(/[<>&]/g, (char) => {
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
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { FormField, HoneypotField, TextAreaField } from "@/components/ui/FormField";
import { trackEvent } from "@/lib/analytics";
import styles from "./ContactForm.module.css";

type FieldErrors = Partial<
  Record<"name" | "email" | "phone" | "subject" | "message", string>
>;

export function ContactForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(formData: FormData) {
    setStatus("submitting");
    setErrors({});
    setMessage("");

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      subject: String(formData.get("subject") || ""),
      message: String(formData.get("message") || ""),
      company: String(formData.get("company") || ""),
    };

    const nextErrors: FieldErrors = {};
    if (!payload.name.trim()) nextErrors.name = "Name is required.";
    if (!payload.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!payload.subject.trim()) nextErrors.subject = "Subject is required.";
    if (!payload.message.trim() || payload.message.trim().length < 10) {
      nextErrors.message = "Please enter a message of at least 10 characters.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("idle");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        setStatus("error");
        setMessage(data.message || "Unable to send your message right now.");
        return;
      }

      trackEvent("contact_submit");
      setStatus("success");
      setMessage(data.message || "Thank you. Your message has been sent.");
      (document.getElementById("contact-form") as HTMLFormElement | null)?.reset();
    } catch {
      setStatus("error");
      setMessage("Unable to send your message right now. Please try again later.");
    }
  }

  return (
    <form
      id="contact-form"
      className={styles.form}
      action={onSubmit}
      noValidate
    >
      <HoneypotField />
      <FormField id="name" name="name" label="Name" required error={errors.name} />
      <FormField
        id="email"
        name="email"
        type="email"
        label="Email"
        required
        autoComplete="email"
        error={errors.email}
      />
      <FormField
        id="phone"
        name="phone"
        type="tel"
        label="Phone"
        optional
        autoComplete="tel"
        error={errors.phone}
      />
      <FormField
        id="subject"
        name="subject"
        label="Subject"
        required
        error={errors.subject}
      />
      <TextAreaField
        id="message"
        name="message"
        label="Message"
        required
        error={errors.message}
      />

      {status === "success" ? (
        <p className={`${styles.status} ${styles.success}`} role="status">
          {message}
        </p>
      ) : null}
      {status === "error" ? (
        <p className={`${styles.status} ${styles.error}`} role="alert">
          {message}
        </p>
      ) : null}

      <Button type="submit" variant="primary" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}

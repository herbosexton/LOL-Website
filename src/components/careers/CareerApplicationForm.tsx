"use client";

import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  FormField,
  HoneypotField,
  TextAreaField,
} from "@/components/ui/FormField";
import { siteConfig } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import styles from "@/components/contact/ContactForm.module.css";
import fieldStyles from "@/components/ui/FormField.module.css";
import careerFormStyles from "./CareerForm.module.css";

type FieldErrors = Partial<
  Record<
    "name" | "email" | "phone" | "role" | "experience" | "availability" | "resume",
    string
  >
>;

const MAX_RESUME_BYTES = 5 * 1024 * 1024;

export function CareerApplicationForm({
  defaultRole = "",
}: {
  defaultRole?: string;
}) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  const [resumeName, setResumeName] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("submitting");
    setErrors({});
    setMessage("");

    const resume = formData.get("resume");
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

    const nextErrors: FieldErrors = {};
    if (!payload.name.trim()) nextErrors.name = "Name is required.";
    if (!payload.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!payload.phone.trim() || payload.phone.trim().length < 7) {
      nextErrors.phone = "Phone number is required.";
    }
    if (!payload.role.trim()) nextErrors.role = "Select a role.";
    if (!payload.experience.trim() || payload.experience.trim().length < 10) {
      nextErrors.experience = "Tell us a bit more about your experience.";
    }
    if (!payload.availability.trim()) {
      nextErrors.availability = "Availability is required.";
    }
    if (!(resume instanceof File) || resume.size === 0) {
      nextErrors.resume = "Please upload your resume.";
    } else if (resume.size > MAX_RESUME_BYTES) {
      nextErrors.resume = "Resume must be 5MB or smaller.";
    } else if (!/\.(pdf|doc|docx)$/i.test(resume.name)) {
      nextErrors.resume = "Use a PDF or Word file (.pdf, .doc, .docx).";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("idle");
      return;
    }

    try {
      const response = await fetch("/api/careers", {
        method: "POST",
        body: formData,
      });
      const data = (await response.json().catch(() => ({}))) as { message?: string };

      if (!response.ok) {
        setStatus("error");
        setMessage(data.message || "Unable to send your application right now.");
        return;
      }

      trackEvent("careers_submit", { role: payload.role });
      setStatus("success");
      setMessage(data.message || "Thank you. Your application has been sent.");
      setResumeName("");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Unable to send your application right now. Please try again later.");
    }
  }

  return (
    <form
      id="careers-form"
      className={styles.form}
      onSubmit={handleSubmit}
      noValidate
      encType="multipart/form-data"
    >
      <HoneypotField />
      <FormField id="name" name="name" label="Full name" required error={errors.name} />
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
        required
        autoComplete="tel"
        error={errors.phone}
      />

      <div className={fieldStyles.field}>
        <label className={fieldStyles.label} htmlFor="role">
          Role
        </label>
        <select
          id="role"
          name="role"
          className={fieldStyles.control}
          defaultValue={defaultRole}
          required
          aria-invalid={Boolean(errors.role)}
          aria-describedby={errors.role ? "role-error" : undefined}
        >
          <option value="">Select a position</option>
          {siteConfig.careers.map((job) => (
            <option key={job.id} value={job.id}>
              {job.title}
            </option>
          ))}
        </select>
        {errors.role ? (
          <p id="role-error" className={fieldStyles.error} role="alert">
            {errors.role}
          </p>
        ) : null}
      </div>

      <FormField
        id="availability"
        name="availability"
        label="Availability"
        required
        placeholder="e.g. Weekdays, evenings, weekends"
        error={errors.availability}
      />
      <TextAreaField
        id="experience"
        name="experience"
        label="Experience"
        required
        placeholder="Relevant retail, cannabis, inventory, or hospitality experience"
        error={errors.experience}
      />
      <TextAreaField
        id="message"
        name="message"
        label="Anything else we should know"
        optional
      />

      <div className={fieldStyles.field}>
        <span className={fieldStyles.label} id="resume-label">
          Resume
        </span>
        <label className={careerFormStyles.upload} htmlFor="resume">
          <input
            id="resume"
            name="resume"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            required
            className={careerFormStyles.fileInput}
            aria-labelledby="resume-label"
            aria-invalid={Boolean(errors.resume)}
            aria-describedby={errors.resume ? "resume-error" : "resume-hint"}
            onChange={(event) => {
              const file = event.target.files?.[0];
              setResumeName(file?.name || "");
            }}
          />
          <span className={careerFormStyles.uploadButton}>Upload resume</span>
          <span className={careerFormStyles.uploadName}>
            {resumeName || "PDF or Word · max 5MB"}
          </span>
        </label>
        <p id="resume-hint" className={careerFormStyles.hint}>
          Required. Accepted formats: .pdf, .doc, .docx
        </p>
        {errors.resume ? (
          <p id="resume-error" className={fieldStyles.error} role="alert">
            {errors.resume}
          </p>
        ) : null}
      </div>

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
        {status === "submitting" ? "Sending…" : "Submit Application"}
      </Button>
    </form>
  );
}

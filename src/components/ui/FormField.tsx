import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import styles from "./FormField.module.css";

type Base = {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  className?: string;
};

export function FormField({
  id,
  label,
  error,
  optional,
  className,
  ...props
}: Base & ComponentProps<"input">) {
  return (
    <div className={cn(styles.field, className)}>
      <label className={styles.label} htmlFor={id}>
        {label}
        {optional ? <span className={styles.optional}> (optional)</span> : null}
      </label>
      <input
        id={id}
        className={styles.control}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error ? (
        <p id={`${id}-error`} className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function TextAreaField({
  id,
  label,
  error,
  optional,
  className,
  ...props
}: Base & ComponentProps<"textarea">) {
  return (
    <div className={cn(styles.field, className)}>
      <label className={styles.label} htmlFor={id}>
        {label}
        {optional ? <span className={styles.optional}> (optional)</span> : null}
      </label>
      <textarea
        id={id}
        className={cn(styles.control, styles.textarea)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error ? (
        <p id={`${id}-error`} className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function HoneypotField() {
  return (
    <div className={styles.honeypot} aria-hidden="true">
      <label htmlFor="company">Company</label>
      <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

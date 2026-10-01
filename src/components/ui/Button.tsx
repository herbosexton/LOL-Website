import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "gold" | "outline" | "ghost";

type Common = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  fullWidth?: boolean;
};

type ButtonAsButton = Common &
  Omit<ComponentProps<"button">, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = Common & {
  href: string;
  external?: boolean;
  onClick?: ComponentProps<"a">["onClick"];
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    className,
    fullWidth,
  } = props;
  const classes = cn(
    styles.button,
    styles[variant],
    fullWidth && styles.full,
    className,
  );

  if ("href" in props && props.href) {
    const { href, external, onClick } = props;
    if (external || /^https?:\/\//i.test(href)) {
      return (
        <a
          href={href}
          className={classes}
          onClick={onClick}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...rest } = props as ButtonAsButton;
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}

import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Image
              src="/images/logo.jpg"
              alt="Legacy on Lark"
              width={64}
              height={64}
              unoptimized
            />
            <address className={styles.address}>
              {siteConfig.address.street}
              <br />
              {siteConfig.address.city}, {siteConfig.address.state}{" "}
              {siteConfig.address.postalCode}
            </address>
          </div>

          <div>
            <p className={styles.heading}>Explore</p>
            <nav className={styles.links} aria-label="Footer">
              {siteConfig.footerLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className={styles.heading}>Hours</p>
            <ul className={styles.hours}>
              {siteConfig.hours.map((item) => (
                <li key={item.label}>
                  <span>{item.label}</span>
                  <span>{item.value}</span>
                </li>
              ))}
            </ul>
            {siteConfig.social.length > 0 ? (
              <div className={styles.social}>
                {siteConfig.social.map((item) => (
                  <a
                    key={item.platform}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {year} {siteConfig.name}. 21+ only. Please consume responsibly.</p>
          <nav className={styles.legal} aria-label="Legal">
            {siteConfig.legalLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

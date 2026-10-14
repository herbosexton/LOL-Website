import Image from "next/image";
import Link from "next/link";
import { CTASection } from "@/components/ui/CTASection";
import { ImageHero } from "@/components/ui/ImageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { imageAlt } from "@/lib/image-alts";
import { getMenuHref, isExternalMenu } from "@/lib/menu";
import { createMetadata } from "@/lib/seo";
import styles from "@/styles/pages.module.css";

export const metadata = createMetadata({
  title: "About the Lark Street Shop",
  description:
    "Meet the people behind Legacy on Lark, the adult-use dispensary at 260 Lark Street in Albany. Family, friends, and a shop built for neighbors.",
  path: "/about",
});

export default function AboutPage() {
  const menuHref = getMenuHref();

  return (
    <>
      <ImageHero
        eyebrow="About"
        title="Built by people who care"
        copy="Legacy on Lark started with family, friendship, and a plan to run a real shop on Lark Street, not a corporate copy."
        image="/images/about/store-interior.jpg"
        alt={imageAlt.storefront}
      />

      <section className={styles.section}>
        <div className={styles.grid2}>
          <div className={styles.prose}>
            <SectionHeading title="Our Story" />
            <p>
              Legacy on Lark is led by Niaja and Chianti, a married couple who
              built this business together. Their close friend Herbert helped
              shape the vision from day one. Matthew Robinson later joined as an
              investor and landlord, and stays involved as a guide.
            </p>
            <p>
              We keep the story honest. No invented biographies, no filler
              slogans. Just the people who actually built the house on Lark.
            </p>
          </div>
          <div className={styles.media}>
            <Image
              src="/images/about/community.jpg"
              alt={imageAlt.prerollOverJar}
              fill
              sizes="(max-width: 900px) 100vw, 45vw"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
          <SectionHeading title="Mission" subtitle={siteConfig.mission} />
          <SectionHeading title="Vision" subtitle={siteConfig.vision} />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
          <SectionHeading
            title="Values"
            subtitle="What we hold ourselves to in the shop every day."
          />
        </div>
        <div className={styles.grid3}>
          {siteConfig.values.map((value) => (
            <article key={value.title} className={styles.card}>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
          <SectionHeading
            title="People Behind Legacy"
            subtitle="The crew that made 260 Lark Street happen."
          />
          <p>
            <Link className={styles.textLink} href="/careers">
              See open roles at the Albany shop.
            </Link>
          </p>
        </div>
        <div className={styles.grid3}>
          {siteConfig.people.map((person) => (
            <article key={person.name} className={styles.card}>
              <h3>{person.name}</h3>
              <p>
                <strong>{person.role}</strong>
              </p>
              <p>{person.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.grid2}>
          <div className={styles.prose}>
            <SectionHeading title="Community" />
            <p>
              We are rooted in Albany, on Lark Street, among neighbors, artists,
              and curious guests. Hospitality here means respect, warmth, and
              room to ask questions.
            </p>
            <p>
              Pickup is at{" "}
              <Link className={styles.textLink} href="/contact">
                260 Lark Street in Albany
              </Link>
              . We also offer{" "}
              <Link className={styles.textLink} href="/delivery">
                delivery in Albany and nearby towns
              </Link>
              , and guests can{" "}
              <Link className={styles.textLink} href="/review">
                leave a Google review
              </Link>{" "}
              after a visit.
            </p>
          </div>
          <div className={styles.prose}>
            <SectionHeading title="Education in the Shop" />
            <p>
              Budtenders explain product in plain language. Our online guide is
              there if you want homework before you visit. People still come
              first.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title="Come see the shop"
        copy="Visit 260 Lark St or browse the live menu when you are ready."
        primary={{ label: "Visit Us", href: "/contact" }}
        secondary={{
          label: "Shop Now",
          href: menuHref,
          external: isExternalMenu(),
        }}
      />
    </>
  );
}

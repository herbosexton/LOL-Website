import Image from "next/image";
import Link from "next/link";
import { CultureCard } from "@/components/ui/CultureCard";
import { ImageHero } from "@/components/ui/ImageHero";
import { KultureAnalytics } from "@/app/kulture/KultureAnalytics";
import { imageAlt } from "@/lib/image-alts";
import { createMetadata } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata = createMetadata({
  title: "Kulture on Lark Street",
  description:
    "Kulture is the editorial space at Legacy on Lark, the Albany dispensary on Lark Street. Stories of culture, creativity, community, and history.",
  path: "/kulture",
});

export default function KulturePage() {
  return (
    <div className={styles.page}>
      <KultureAnalytics />
      <ImageHero
        eyebrow="Kulture"
        title="Legacy Lives in Culture"
        copy="A late-night jazz lounge energy meets Black-owned gallery calm, creative, confident, and expansive."
        image="/images/kulture/hero.jpg"
        alt={imageAlt.kultureHero}
      />

      <section className={styles.section}>
        <div className={styles.inner}>
          <p className={styles.statement}>
            Culture is inheritance, invention, and invitation.
          </p>
          <p className={styles.copy}>
            Kulture represents Black culture broadly through history, family,
            community, creativity, music, art, entrepreneurship, fashion, food,
            language, joy, resilience, innovation, ownership, connection, legacy,
            and future. Cannabis is one part of the story, not the whole frame.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.split}>
          <div className={styles.media}>
            <Image
              src="/images/kulture/roots.jpg"
              alt={imageAlt.roots}
              fill
              sizes="(max-width: 900px) 100vw, 55vw"
              loading="lazy"
            />
          </div>
          <div className={styles.inner}>
            <h2>Roots</h2>
            <p className={styles.copy}>
              Lineage and memory shape how we gather. Roots are family tables,
              neighborhood corridors, mentors, and the quiet work of building
              something that lasts.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.split}>
          <div className={styles.inner}>
            <h2>Rhythm</h2>
            <p className={styles.copy}>
              Jazz, hip-hop, vinyl, studio sessions, spoken word, performance,
              and creative expression, rhythm as language, not stereotype.
            </p>
          </div>
          <div className={styles.media}>
            <Image
              src="/images/kulture/rhythm.jpg"
              alt={imageAlt.rhythm}
              fill
              sizes="(max-width: 900px) 100vw, 45vw"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
          <h2>Voices</h2>
          <p className={styles.copy}>
            Voices carry entrepreneurship, fashion, foodways, scholarship, and
            joy. They expand the narrative beyond a single soundtrack.
          </p>
        </div>
        <div className={styles.grid}>
          <CultureCard title="Art & Ownership">
            Creative practice as authorship, gallery walls, design, and the right
            to define the room.
          </CultureCard>
          <CultureCard title="Language & Joy">
            Humor, brilliance, and everyday poetry that keep culture alive in
            motion.
          </CultureCard>
          <CultureCard title="Future Builders">
            Innovation with memory, building institutions, businesses, and
            gatherings for the next generation.
          </CultureCard>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.split}>
          <div className={styles.media}>
            <Image
              src="/images/kulture/community.jpg"
              alt={imageAlt.hands}
              fill
              sizes="(max-width: 900px) 100vw, 55vw"
              loading="lazy"
            />
          </div>
          <div className={styles.inner}>
            <h2>Community</h2>
            <p className={styles.copy}>
              Community is presence. It is showing up for Albany with warmth,
              excellence, and room for everyone who enters with respect.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-label="Kulture gallery">
        <div className={styles.inner}>
          <h2>Kulture Gallery</h2>
        </div>
        <div className={styles.gallery}>
          {[
            { src: "/images/kulture/gallery-1.jpg", alt: imageAlt.galleryRecord },
            { src: "/images/kulture/gallery-2.jpg", alt: imageAlt.gallerySinger },
            { src: "/images/kulture/gallery-3.jpg", alt: imageAlt.galleryHat },
          ].map((item) => (
            <div key={item.src} className={styles.galleryItem}>
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.split}>
          <div className={styles.inner}>
            <h2>Cannabis + Cultural History</h2>
            <p className={styles.copy}>
              Cannabis intersects with culture, policy, and community memory. We
              hold that history with care, celebrating creativity and ownership
              while refusing to flatten Black culture into cannabis alone.
            </p>
          </div>
          <div className={styles.media}>
            <Image
              src="/images/kulture/history.jpg"
              alt={imageAlt.history}
              fill
              sizes="(max-width: 900px) 100vw, 45vw"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
          <h2>Visit the shop</h2>
          <p className={styles.copy}>
            Kulture is part of the dispensary at{" "}
            <Link className={styles.textLink} href="/contact">
              260 Lark Street in Albany
            </Link>
            .{" "}
            <Link className={styles.textLink} href="/about">
              Read the Legacy on Lark story
            </Link>
            , or{" "}
            <Link className={styles.textLink} href="/shop">
              shop the menu
            </Link>
            .
          </p>
        </div>
      </section>

      <section className={styles.finale}>
        <h2 className={styles.finaleTitle}>Legacy lives here.</h2>
      </section>
    </div>
  );
}

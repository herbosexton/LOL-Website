import Image from "next/image";
import { CultureCard } from "@/components/ui/CultureCard";
import { ImageHero } from "@/components/ui/ImageHero";
import { KultureAnalytics } from "@/app/kulture/KultureAnalytics";
import { createMetadata } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata = createMetadata({
  title: "Kulture",
  description:
    "Kulture at Legacy on Lark—an editorial space for Black culture, creativity, community, history, and legacy in Albany, NY.",
  path: "/kulture",
});

export default function KulturePage() {
  return (
    <div className={styles.page}>
      <KultureAnalytics />
      <ImageHero
        eyebrow="Kulture"
        title="Legacy Lives in Culture"
        copy="A late-night jazz lounge energy meets Black-owned gallery calm—creative, confident, and expansive."
        image="/images/kulture/hero.jpg"
        alt="Cinematic near-black Kulture hero atmosphere"
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
            and future. Cannabis is one part of the story—not the whole frame.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.split}>
          <div className={styles.media}>
            <Image
              src="/images/kulture/roots.jpg"
              alt="Textural imagery suggesting roots, lineage, and memory"
              fill
              sizes="(max-width: 900px) 100vw, 55vw"
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
              and creative expression—rhythm as language, not stereotype.
            </p>
          </div>
          <div className={styles.media}>
            <Image
              src="/images/kulture/rhythm.jpg"
              alt="Dark studio-like visual suggesting music and performance"
              fill
              sizes="(max-width: 900px) 100vw, 45vw"
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
            Creative practice as authorship—gallery walls, design, and the right
            to define the room.
          </CultureCard>
          <CultureCard title="Language & Joy">
            Humor, brilliance, and everyday poetry that keep culture alive in
            motion.
          </CultureCard>
          <CultureCard title="Future Builders">
            Innovation with memory—building institutions, businesses, and
            gatherings for the next generation.
          </CultureCard>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.split}>
          <div className={styles.media}>
            <Image
              src="/images/kulture/community.jpg"
              alt="Community gathering atmosphere in a refined dark setting"
              fill
              sizes="(max-width: 900px) 100vw, 55vw"
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
            "/images/kulture/gallery-1.jpg",
            "/images/kulture/gallery-2.jpg",
            "/images/kulture/gallery-3.jpg",
          ].map((src, index) => (
            <div key={src} className={styles.galleryItem}>
              <Image
                src={src}
                alt={`Kulture gallery image ${index + 1}`}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
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
              hold that history with care—celebrating creativity and ownership
              while refusing to flatten Black culture into cannabis alone.
            </p>
          </div>
          <div className={styles.media}>
            <Image
              src="/images/kulture/history.jpg"
              alt="Editorial dark imagery for cannabis and cultural history"
              fill
              sizes="(max-width: 900px) 100vw, 45vw"
            />
          </div>
        </div>
      </section>

      <section className={styles.finale}>
        <h2 className={styles.finaleTitle}>Legacy lives here.</h2>
      </section>
    </div>
  );
}

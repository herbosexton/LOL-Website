import { CareerApplicationForm } from "@/components/careers/CareerApplicationForm";
import { ImageHero } from "@/components/ui/ImageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo";
import styles from "@/styles/pages.module.css";
import careerStyles from "./page.module.css";

export const metadata = createMetadata({
  title: "Careers",
  description:
    "Join Legacy on Lark in Albany. Apply for Budtender and Inventory Specialist roles.",
  path: "/careers",
});

export default async function CareersPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const params = await searchParams;
  const defaultRole =
    siteConfig.careers.find((job) => job.id === params.role)?.id || "";

  return (
    <>
      <ImageHero
        eyebrow="Careers"
        title="Work With Legacy"
        copy="Build culture, hospitality, and craft on Lark Street—roles for adults 21+ who care about the guest experience."
        image="/images/about/store-interior.jpg"
        alt="Interior of Legacy on Lark in Albany"
        compact
      />

      <section className={styles.section}>
        <div className={styles.inner}>
          <SectionHeading
            title="Open Roles"
            subtitle="Two paths into the house—front-of-house hospitality and inventory stewardship."
          />
          <div className={careerStyles.jobs}>
            {siteConfig.careers.map((job) => (
              <article key={job.id} id={job.id} className={careerStyles.job}>
                <div className={careerStyles.jobTop}>
                  <h3>{job.title}</h3>
                  <span className={careerStyles.type}>{job.type}</span>
                </div>
                <p>{job.summary}</p>
                <div className={careerStyles.columns}>
                  <div>
                    <h4>Responsibilities</h4>
                    <ul>
                      {job.responsibilities.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4>Requirements</h4>
                    <ul>
                      {job.requirements.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <a className={careerStyles.applyLink} href={`?role=${job.id}#apply`}>
                  Apply for {job.title}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="apply" className={styles.section}>
        <div className={styles.grid2}>
          <div>
            <SectionHeading
              title="Apply"
              subtitle="Applications go to careers@loldispensary.com. Adults 21+ only."
            />
            <p className={styles.prose}>
              Share a clear note about your experience and availability. We’ll follow
              up if there’s a fit.
            </p>
          </div>
          <CareerApplicationForm defaultRole={defaultRole} />
        </div>
      </section>
    </>
  );
}

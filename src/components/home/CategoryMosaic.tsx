import { CategoryCard } from "@/components/ui/CategoryCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import styles from "./CategoryMosaic.module.css";

export function CategoryMosaic() {
  const byId = Object.fromEntries(
    siteConfig.categories.map((item) => [item.id, item]),
  );
  const flower = byId.flower;
  const prerolls = byId.prerolls;
  const infusion = byId.infusion;
  const edibles = byId.edibles;
  const vaporizers = byId.vaporizers;
  const accessories = byId.accessories;
  const tinctures = byId.tinctures;

  if (
    !flower ||
    !prerolls ||
    !infusion ||
    !edibles ||
    !vaporizers ||
    !accessories ||
    !tinctures
  ) {
    return null;
  }

  return (
    <section className={styles.section} aria-labelledby="categories-heading">
      <div className={styles.header}>
        <SectionHeading
          align="center"
          eyebrow="The Menu"
          title="Find what fits"
          subtitle="A calm, curated path into the shop—photography that respects every product."
        />
        <h2 id="categories-heading" className="sr-only">
          Product categories
        </h2>
      </div>
      <div className={styles.mosaic}>
        <div className={styles.flower}>
          <CategoryCard item={flower} priority />
        </div>
        <div className={styles.prerolls}>
          <CategoryCard item={prerolls} />
        </div>
        <div className={styles.infusion}>
          <CategoryCard item={infusion} />
        </div>
        <div className={styles.edibles}>
          <CategoryCard item={edibles} />
        </div>
        <div className={styles.vaporizers}>
          <CategoryCard item={vaporizers} />
        </div>
      </div>
      <div className={styles.secondary}>
        <CategoryCard item={accessories} />
        <CategoryCard item={tinctures} />
      </div>
    </section>
  );
}

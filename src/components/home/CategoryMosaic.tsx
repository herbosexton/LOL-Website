import { CategoryCard } from "@/components/ui/CategoryCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { getLiveMenuByCategory } from "@/lib/blaze/menu";
import { LiveMenuBrowser } from "./LiveMenuBrowser";
import styles from "./CategoryMosaic.module.css";

export async function CategoryMosaic() {
  const liveCategories = await getLiveMenuByCategory(12);

  return (
    <section className={styles.section} aria-labelledby="categories-heading">
      <div className={styles.header}>
        <SectionHeading
          align="center"
          eyebrow="The Menu"
          title="Find what fits"
          subtitle="Live products from the Legacy on Lark shop, grouped the way we stock them."
        />
        <h2 id="categories-heading" className="sr-only">
          Product categories
        </h2>
      </div>

      {liveCategories.length > 0 ? (
        <LiveMenuBrowser categories={liveCategories} />
      ) : (
        <StaticCategoryFallback />
      )}
    </section>
  );
}

function StaticCategoryFallback() {
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
    <>
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
    </>
  );
}

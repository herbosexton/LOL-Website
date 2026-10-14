/**
 * JSON-LD is data, not executable script. Next.js docs say to render a native
 * script tag and escape "<" so a string in the payload cannot break out.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

import { MDXRemote } from "next-mdx-remote/rsc";

export function ArticleBody({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={{
        h2: (props) => <h2 {...props} />,
        h3: (props) => <h3 {...props} />,
        p: (props) => <p {...props} />,
        ul: (props) => <ul {...props} />,
        ol: (props) => <ol {...props} />,
        li: (props) => <li {...props} />,
        a: (props) => <a {...props} rel="noopener noreferrer" />,
      }}
    />
  );
}

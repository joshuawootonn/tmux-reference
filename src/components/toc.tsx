type Heading = { depth: number; slug: string; text: string };
type Headings = Heading[];

function HeadingPlaceholder({ heading }: { heading: Heading }) {
  if (heading.depth == 2) {
    return <div className="bg-sidebar-foreground/60 h-[1px] w-3" />;
  }

  return <div className="bg-sidebar-secondary/60 ml-1 h-[1px] w-3" />;
}

function Heading({ heading }: { heading: Heading }) {
  if (heading.depth == 2) {
    return (
      <h2 className="text-sidebar-foreground hover:text-sidebar-foreground/70 dark:hover:text-sidebar-foreground/80">
        {heading.text}
      </h2>
    );
  }

  return (
    <h3 className="text-sidebar-secondary hover:text-sidebar-secondary/80 pl-3">
      {heading.text}
    </h3>
  );
}

export function TableOfContent({ headings }: { headings: Headings }) {
  return (
    <nav className="group not-prose fixed top-1/2 right-1 z-50 -translate-y-1/2 sm:right-[unset] sm:left-1">
      <div className="bg-background border-border space-y-2 border-2 px-3 py-3">
        {headings.map((heading) => (
          <HeadingPlaceholder heading={heading} />
        ))}
      </div>
      <div className="bg-background border-border absolute top-1/2 -translate-y-1/2 border-2 px-5 py-3 opacity-0 group-hover:opacity-100">
        {headings.map((heading) => (
          <a className="scroll-ps-30" href={`#${heading.slug}`}>
            <Heading heading={heading} />
          </a>
        ))}
      </div>
    </nav>
  );
}

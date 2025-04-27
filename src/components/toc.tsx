import { motion } from "motion/react";
import { useState } from "react";
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
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial="closed"
      whileHover="open"
      animate={open ? "open" : "closed"}
      className="group not-prose fixed top-1/2 left-1 z-50 hidden -translate-y-1/2 sm:block"
    >
      <motion.div
        variants={{
          open: { scale: 1.5 },
          closed: { scale: 1 },
        }}
        transition={{ duration: 0.1 }}
        style={{
          originX: 0,
        }}
        className="bg-background border-border space-y-2 border-2 px-3 py-3"
      >
        {headings.map((heading) => (
          <HeadingPlaceholder heading={heading} />
        ))}
      </motion.div>
      <motion.div
        variants={{
          open: { opacity: 1, scale: 1, x: 0 },
          closed: { opacity: 0, scale: 0.9, x: -5 },
        }}
        transition={{ duration: 0.1 }}
        style={{ originX: 0 }}
        className="bg-background border-border absolute top-1/2 -translate-y-1/2 border-2 px-5 py-3"
      >
        {headings.map((heading) => (
          <a className="scroll-ps-30" href={`#${heading.slug}`}>
            <Heading heading={heading} />
          </a>
        ))}
      </motion.div>
    </motion.nav>
  );
}

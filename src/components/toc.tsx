import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useCallback, useRef, useState } from "react";
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
      <h2 className="text-sidebar-foreground hover:text-sidebar-foreground/70 dark:hover:text-sidebar-foreground/80 inline-block">
        {heading.text}
      </h2>
    );
  }

  return (
    <h3 className="text-sidebar-secondary hover:text-sidebar-secondary/80 inline-block">
      {heading.text}
    </h3>
  );
}

export function TableOfContent({ headings }: { headings: Headings }) {
  const [open, _setOpen] = useState(false);
  const justClosed = useRef(false);

  const setOpen = useCallback(
    (next: boolean) => {
      if (!next && open) {
        _setOpen(next);

        justClosed.current = true;
        const id = setTimeout(() => {
          justClosed.current = false;
        }, 600);

        return () => clearTimeout(id);
      } else if (next && !open && justClosed.current) {
        //noop
      } else {
        _setOpen(next);
      }
    },
    [open],
  );

  return (
    <motion.nav
      initial="closed"
      onFocus={() => {
        return setOpen(true);
      }}
      onPointerMove={() => {
        return setOpen(true);
      }}
      onPointerEnter={() => {
        return setOpen(true);
      }}
      onPointerOut={(e) => {
        // Don't fire for children elements
        if (e.currentTarget !== e.target) return;
        return setOpen(false);
      }}
      onPointerLeave={() => {
        return setOpen(false);
      }}
      onClick={() => {
        return setOpen(false);
      }}
      animate={open ? "open" : "closed"}
      className="group not-prose group fixed top-1/2 left-1 z-50 hidden -translate-y-1/2 sm:block"
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
        className="bg-background border-border relative z-0 space-y-2 border-2 px-3 py-3"
      >
        <div className="absolute inset-0 -m-10"></div>
        {headings.map((heading) => (
          <HeadingPlaceholder heading={heading} />
        ))}
      </motion.div>
      <motion.div
        variants={{
          open: {
            display: "block",
            opacity: 1,
            scale: 1,
            x: 0,
          },
          closed: {
            opacity: 0,
            scale: 0.9,
            x: -5,
            transitionEnd: { display: "none" },
          },
        }}
        transition={{ duration: 0.1 }}
        style={{ originX: 0 }}
        className="bg-background border-border absolute top-1/2 z-0 -translate-y-1/2 space-y-0.5 border-2 px-4 py-3"
      >
        <div className="absolute inset-0 -z-10 -m-10"></div>
        {headings.map((heading) => (
          <a
            className={cn(
              "block scroll-ps-30 text-[15px] whitespace-nowrap",
              heading.depth === 3 && "ml-3",
            )}
            key={heading.slug}
            href={`#${heading.slug}`}
          >
            <Heading heading={heading} />
          </a>
        ))}
      </motion.div>
    </motion.nav>
  );
}

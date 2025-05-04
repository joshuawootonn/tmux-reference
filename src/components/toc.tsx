import { cn } from "@/lib/utils";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { AnimatePresence, motion, useMotionValue } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
type Heading = { depth: number; slug: string; text: string };
type Headings = Heading[];

function HeadingPlaceholder({ heading }: { heading: Heading }) {
  if (heading.depth == 2) {
    return (
      <div className="bg-sidebar-foreground/60 h-[1.5px] w-3 rounded-lg" />
    );
  }

  return (
    <div className="bg-sidebar-secondary/60 ml-1 h-[1.5px] w-3 rounded-lg" />
  );
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

export function FloatingTableOfContent({ headings }: { headings: Headings }) {
  const [open, setOpen] = useState(false);
  const overflow = useMotionValue("auto");

  return (
    <div className="fixed top-[max(min(50%,_calc(100%_-_440px)),_116px)] left-1 z-50 hidden -translate-y-1/2 sm:flex sm:flex-col sm:space-y-2">
      <ThemeToggle
        dropdownContentProps={{ align: "start", side: "top", alignOffset: 0 }}
      />
      <Popover open={open} onOpenChange={(next) => setOpen(next)}>
        <motion.nav
          animate={open ? "open" : "closed"}
          className="not-prose group"
          onAnimationStart={() => {
            overflow.set("hidden");
          }}
          onAnimationComplete={() => {
            overflow.set("auto");
          }}
        >
          <PopoverAnchor></PopoverAnchor>
          <PopoverTrigger asChild>
            <motion.button
              variants={{
                open: { scale: 1.5 },
                closed: { scale: 1 },
              }}
              transition={{ duration: 0.1 }}
              style={{
                originX: 0,
                originY: 0,
              }}
              className="bg-background border-border relative z-0 space-y-2 border-2 px-3 py-3"
            >
              {headings.map((heading) => (
                <HeadingPlaceholder key={heading.slug} heading={heading} />
              ))}
            </motion.button>
          </PopoverTrigger>

          <AnimatePresence>
            {open && (
              <PopoverContent
                className="max-h-[calc(100vh_-_60px)]"
                align="start"
                asChild
                forceMount={true}
              >
                <motion.div
                  variants={{
                    open: {
                      opacity: 1,
                      scale: 1,
                      x: 0,
                    },
                    closed: {
                      opacity: 0,
                      scale: 0.9,
                      x: -5,
                    },
                  }}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  transition={{ duration: 0.1 }}
                  onAnimationStart={() => {
                    overflow.set("hidden");
                  }}
                  onAnimationComplete={() => {
                    overflow.set("auto");
                  }}
                  style={{ originX: 0, originY: 0, overflow }}
                >
                  <div className="absolute inset-0 -z-10 -mx-10 -mb-10"></div>
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
              </PopoverContent>
            )}
          </AnimatePresence>
        </motion.nav>
      </Popover>
    </div>
  );
}

export function TableOfContent({ headings }: { headings: Headings }) {
  return (
    <div>
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
    </div>
  );
}

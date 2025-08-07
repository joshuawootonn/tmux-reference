import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useMotionValue } from "motion/react";
import { useRef, useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
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
  const anchorRef = useRef<HTMLDivElement>(null);

  return (
    <div className="fixed top-[max(min(50%,_calc(100%_-_440px)),_116px)] left-1 z-50 hidden -translate-y-1/2 sm:flex sm:flex-col sm:space-y-2">
      <ThemeToggle positionerProps={{ align: "start", side: "right" }} />
      <Popover  openOnHover delay={0} open={open} onOpenChange={setOpen}>
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
          <div ref={anchorRef}/>
          <PopoverTrigger
            render={(props) => (
              <motion.button
                // todo(josh): fix this
                {...(props as any)}
                variants={{
                  open: { scale: 1.5 },
                  closed: { scale: 1 },
                }}
                transition={{ duration: 0.1 }}
                style={{
                  originX: 0,
                  originY: 0,
                }}
                className="bg-background border-border relative z-0 cursor-pointer space-y-[7px] border-2 px-3 py-3"
              >
                {headings.map((heading) => (
                  <HeadingPlaceholder key={heading.slug} heading={heading} />
                ))}
              </motion.button>
            )}
          />

          <AnimatePresence>
            {open && (
              <PopoverContent

              
                className="max-h-[calc(100vh_-_60px)]"
                positionerProps={{ align: "start", anchor: anchorRef, sideOffset:0 }}
                render={(props) => (
                  <motion.div
                    // todo(josh): fix this
                    {...(props as any)}
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
                    onClick={(e) => {
                      if (!(e.target instanceof HTMLElement)) return;

                      const isLink = e.target.nodeName === "A";
                      const isWithinLink = e.target.closest("a") != null;

                      if (isLink || isWithinLink) setOpen(false);
                    }}
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
                )}
              />
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

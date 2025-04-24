import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";

export function Terminal({ children }: { children: string }) {
  const [isCopied, setCopied] = useState(false);

  const copy = useCallback(() => {
    setCopied(true);

    const timer = setTimeout(() => setCopied(false), 1000);

    return () => clearTimeout(timer);
  }, [isCopied]);

  return (
    <div
      onClick={(e) => {
        const content = e.currentTarget.textContent;

        if (content == null || content.length === 0)
          throw new Error(`Attempted to copy Terminal command: ${content}`);

        navigator.clipboard.writeText(content);
        copy();
      }}
      className="not-prose group bg-background border-border flex w-full items-center justify-between border-[1.5px] text-left"
    >
      <code className="before:text-symbol bg-background truncate border-none p-[0.2em_0.4em] text-base font-normal before:mr-[3px] before:content-['$'] after:hidden">
        {children}
      </code>
      <button
        className={cn(
          "text-symbol mx-1 font-mono text-sm opacity-0 transition-opacity duration-150 ease-in-out group-hover:opacity-100 focus:opacity-100",
          isCopied && "opacity-100",
        )}
        onClick={(e) => {
          const content = e.currentTarget.parentElement?.textContent;

          if (content == null || content.length === 0)
            throw new Error(`Attempted to copy Terminal command: ${content}`);

          navigator.clipboard.writeText(content);
          copy();
        }}
      >
        {isCopied ? (
          <svg
            fill="none"
            stroke-width="2"
            className="square text-symbol size-5"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m4.5 12.75 6 6 9-13.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        ) : (
          <>
            <svg
              className="square text-symbol size-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="none"
            >
              <path d="M18 2H9c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h9c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H9V4h9v12zM3 15v-2h2v2H3zm0-5.5h2v2H3v-2zM10 20h2v2h-2v-2zm-7-1.5v-2h2v2H3zM5 22c-1.1 0-2-.9-2-2h2v2zm3.5 0h-2v-2h2v2zm5 0v-2h2c0 1.1-.9 2-2 2zM5 6v2H3c0-1.1.9-2 2-2z"></path>
            </svg>
          </>
        )}
      </button>
    </div>
  );
}

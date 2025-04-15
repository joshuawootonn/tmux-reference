import type { ReactNode } from "react";

export function Terminal({ children }: { children: ReactNode }) {
  return (
    <code className="bg-background border-border before:text-symbol border before:content-['$_']">
      {children}
    </code>
  );
}

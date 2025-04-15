import type { ReactNode } from "react";

export function Tmux({ children }: { children: ReactNode }) {
  return <code className="before:content-[':_']">{children}</code>;
}

import type { ReactNode } from "react";

export function Keyboard({ children }: { children: ReactNode }) {
  return (
    <>
      <kbd className="mr-2 !ml-5.5 inline-block">ctrl + b</kbd>,
      <kbd className="ml-1 inline-block">{children}</kbd>{" "}
    </>
  );
}

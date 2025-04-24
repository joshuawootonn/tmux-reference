import type { ReactNode } from "react";

export function Keyboard({ children }: { children: ReactNode }) {
  return (
    <>
      <kbd className="mr-2 ml-3.5 inline-block text-base">ctrl + b</kbd>,
      <kbd className="!ml-1 inline-block text-base">{children}</kbd>{" "}
    </>
  );
}

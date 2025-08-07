import * as React from "react";
import { Popover as PopoverPrimitive } from "@base-ui-components/react/popover";

import { cn } from "@/lib/utils";

function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverContent({
  className,
  children,
  positionerProps: {
    className: positionerClassName,
    sideOffset = 8,
    ...positionerProps
  } = {},
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Popup> & {
  positionerProps?: React.ComponentProps<typeof PopoverPrimitive.Positioner>;
}) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        className={cn("z-50", positionerClassName)}
        sideOffset={sideOffset}
        {...positionerProps}
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cn(
            "bg-background border-border space-y-0.5 border-2 px-4 py-3 outline-hidden",
            className,
          )}
          {...props}
        >
          {children}
        </PopoverPrimitive.Popup>
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

export { Popover, PopoverTrigger, PopoverContent };

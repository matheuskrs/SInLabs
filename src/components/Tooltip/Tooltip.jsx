import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { useMediaQuery } from "@mui/material";
import { useMemo, useState } from "react";
import "./tooltip.css";

export default function Tooltip({ content, children, disabled, placement }) {
  const isMobile = useMediaQuery("(max-width:700px)");
  const [open, setOpen] = useState(false);

  const resolvedSide = placement ?? (isMobile ? "top" : "right");

  const triggerChild = useMemo(() => {
    if (disabled) return children;
    if (!isMobile) return children;

    if (!children || typeof children !== "object" || !("props" in children)) {
      return children;
    }

    const originalOnClick = children.props?.onClick;

    return {
      ...children,
      props: {
        ...children.props,
        onClick: (e) => {
          originalOnClick?.(e);
          e.preventDefault();
          setOpen((prev) => !prev);
        },
      },
    };
  }, [children, isMobile, disabled]);

  if (disabled) return children;

  return (
    <TooltipPrimitive.Root
      delayDuration={200}
      disableHoverableContent
      open={isMobile ? open : undefined}
      onOpenChange={isMobile ? setOpen : undefined}
    >
      <TooltipPrimitive.Trigger asChild>
        {triggerChild}
      </TooltipPrimitive.Trigger>

      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side={resolvedSide}
          className="radix-tooltip-content"
        >
          {content}
          <TooltipPrimitive.Arrow className="radix-tooltip-arrow" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}

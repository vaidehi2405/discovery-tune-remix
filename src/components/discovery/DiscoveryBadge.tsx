import { BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { DISCOVERY_LEVELS } from "@/services/discovery";
import type { DiscoveryLevel } from "@/types/discovery";

export function DiscoveryBadge({
  level,
  className,
  size = "md",
}: {
  level: DiscoveryLevel;
  className?: string;
  size?: "sm" | "md";
}) {
  const cfg = DISCOVERY_LEVELS[level];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-semibold tracking-tight",
        size === "sm" ? "text-[11px] px-2 py-0.5" : "text-xs px-2.5 py-1",
        "bg-primary/15 text-primary",
        className,
      )}
    >
      <BarChart3 className={size === "sm" ? "size-3" : "size-3.5"} />
      {cfg.label}
    </span>
  );
}
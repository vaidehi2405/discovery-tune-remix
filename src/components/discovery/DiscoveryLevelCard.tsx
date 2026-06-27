import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DiscoveryLevelConfig } from "@/types/discovery";

export function DiscoveryLevelCard({
  config,
  selected,
  onSelect,
}: {
  config: DiscoveryLevelConfig;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "w-full text-left rounded-2xl py-4 pl-4 pr-6 border transition-all duration-300 active:scale-[0.985]",
        "flex items-center gap-4",
        selected
          ? "border-primary bg-primary/8 shadow-[var(--shadow-green-glow)]"
          : "border-white/8 bg-card hover:bg-card/80 hover:border-white/15",
      )}
    >
      <div
        className={cn(
          "size-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all",
          selected ? "border-primary bg-primary" : "border-white/30",
        )}
      >
        {selected && <Check className="size-3 text-primary-foreground" strokeWidth={3} />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-base font-bold text-foreground">{config.label}</p>
        <p className="text-sm text-muted-foreground leading-snug mt-0.5">{config.description}</p>
      </div>
    </button>
  );
}
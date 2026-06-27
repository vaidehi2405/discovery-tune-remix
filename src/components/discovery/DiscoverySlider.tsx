import { useCallback } from "react";
import { cn } from "@/lib/utils";
import type { DiscoveryLevel } from "@/types/discovery";

const LEVELS: DiscoveryLevel[] = ["familiar", "balanced", "exploratory"];

export function DiscoverySlider({
  value,
  onChange,
}: {
  value: DiscoveryLevel;
  onChange: (l: DiscoveryLevel) => void;
}) {
  const index = LEVELS.indexOf(value);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = LEVELS[Number(e.target.value)];
      if (next && next !== value) onChange(next);
    },
    [onChange, value],
  );

  return (
    <div className="space-y-3 select-none">
      <div className="flex justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        <span className={cn(value === "familiar" && "text-foreground")}>Familiar</span>
        <span className={cn(value === "exploratory" && "text-foreground")}>Exploratory</span>
      </div>
      <div className="relative h-6 flex items-center">
        <div className="absolute inset-x-0 h-1 rounded-full bg-white/15" />
        <div
          className="absolute left-0 h-1 rounded-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${(index / (LEVELS.length - 1)) * 100}%` }}
        />
        {LEVELS.map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute size-2 rounded-full transition-colors",
              i <= index ? "bg-primary" : "bg-white/25",
            )}
            style={{ left: `calc(${(i / (LEVELS.length - 1)) * 100}% - 4px)` }}
          />
        ))}
        <div
          className="absolute size-6 rounded-full bg-foreground shadow-lg border-4 border-primary transition-all duration-300 ease-out"
          style={{ left: `calc(${(index / (LEVELS.length - 1)) * 100}% - 12px)` }}
        />
        <input
          type="range"
          min={0}
          max={LEVELS.length - 1}
          step={1}
          value={index}
          onChange={handleChange}
          className="absolute inset-0 w-full opacity-0 cursor-pointer touch-none"
          aria-label="Discovery level"
        />
      </div>
    </div>
  );
}
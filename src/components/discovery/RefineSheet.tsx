import { useEffect, useRef, useState } from "react";
import { BottomSheet } from "./BottomSheet";
import { cn } from "@/lib/utils";

const CHIPS = [
  { id: "road_trip", label: "Road Trip", phrase: "road trip vibes" },
  { id: "workout", label: "Workout", phrase: "high-energy workout tracks" },
  { id: "focus", label: "Focus", phrase: "focus-friendly songs" },
  { id: "late_night", label: "Late Night", phrase: "late night mood" },
  { id: "hidden_gems", label: "Hidden Gems", phrase: "hidden gems" },
  { id: "female_artists", label: "Female Artists", phrase: "more female artists" },
  { id: "surprise", label: "Surprise Me", phrase: "surprise me" },
] as const;

const MAX = 150;
const PLACEHOLDER =
  "e.g. Road trip vibes, more female indie artists, less mainstream pop";

function buildSentence(ids: string[]): string {
  const phrases = ids
    .map((id) => CHIPS.find((c) => c.id === id)?.phrase)
    .filter(Boolean) as string[];
  if (phrases.length === 0) return "";
  if (phrases.length === 1) {
    const p = phrases[0];
    return p.charAt(0).toUpperCase() + p.slice(1) + ".";
  }
  const head = phrases.slice(0, -1).join(", ");
  const tail = phrases[phrases.length - 1];
  const s = `${head} with ${tail}.`;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function RefineSheet({
  open,
  initialValue,
  onApply,
  onSkip,
}: {
  open: boolean;
  initialValue: string;
  onApply: (value: string) => void;
  onSkip: () => void;
}) {
  const [value, setValue] = useState(initialValue);
  const [selected, setSelected] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) {
      setValue(initialValue);
      setSelected([]);
      const t = setTimeout(() => textareaRef.current?.focus(), 360);
      return () => clearTimeout(t);
    }
  }, [open, initialValue]);

  const toggleChip = (id: string) => {
    const next = selected.includes(id)
      ? selected.filter((s) => s !== id)
      : [...selected, id];
    setSelected(next);
    setValue(buildSentence(next).slice(0, MAX));
  };

  return (
    <BottomSheet open={open} onClose={onSkip} heightClass="max-h-[90%]">
      <div className="px-5 pt-2 pb-5 overflow-y-auto">
        <h2 className="text-[20px] font-bold text-foreground leading-tight">
          Refine this week's Discover Weekly?
        </h2>
        <p className="text-[13px] text-muted-foreground mt-1.5 leading-snug">
          Add anything specific you want, or skip this step.
        </p>

        <div className="relative mt-4">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value.slice(0, MAX))}
            maxLength={MAX}
            rows={3}
            placeholder={PLACEHOLDER}
            className="w-full resize-none rounded-xl bg-white/[0.06] border border-white/8 focus:border-primary/60 outline-none px-3 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground/70 leading-snug transition-colors"
          />
          <span className="absolute bottom-2 right-3 text-[10px] text-muted-foreground/70 tabular-nums">
            {value.length}/{MAX}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {CHIPS.map((c) => {
            const active = selected.includes(c.id);
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => toggleChip(c.id)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-[12px] font-semibold border transition-all duration-200 active:scale-95",
                  active
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-white/[0.06] text-foreground border-white/10 hover:bg-white/[0.10]",
                )}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        <p className="text-[11px] text-muted-foreground leading-snug mt-3">
          Only affects this week's Discover Weekly. Your long-term taste profile won't change.
        </p>

        <div className="flex items-center gap-3 mt-5">
          <button
            type="button"
            onClick={onSkip}
            className="flex-1 h-12 rounded-full border border-white/15 text-foreground font-bold text-[14px] active:scale-[0.98] transition-all"
          >
            Skip
          </button>
          <button
            type="button"
            onClick={() => onApply(value.trim())}
            className="flex-1 h-12 rounded-full bg-primary text-primary-foreground font-bold text-[14px] active:scale-[0.98] transition-all shadow-[var(--shadow-green-glow)]"
          >
            Apply
          </button>
        </div>
      </div>
    </BottomSheet>
  );
}
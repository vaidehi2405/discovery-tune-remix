import { useEffect, useRef, useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const PRIMARY_CHIPS = [
  { id: "road_trip", label: "Road Trip", phrase: "road trip vibes" },
  { id: "workout", label: "Workout", phrase: "high-energy workout tracks" },
  { id: "focus", label: "Focus", phrase: "focus-friendly songs" },
] as const;

const MORE_CHIPS = [
  { id: "late_night", label: "Late Night", phrase: "late night mood" },
  { id: "hidden_gems", label: "Hidden Gems", phrase: "hidden gems" },
  { id: "female_artists", label: "Female Artists", phrase: "more female artists" },
  { id: "surprise", label: "Surprise Me", phrase: "surprise me" },
] as const;

const ALL_CHIPS = [...PRIMARY_CHIPS, ...MORE_CHIPS];

const MAX = 150;
const PLACEHOLDER =
  "e.g. Road trip vibes, more female indie artists, upbeat Marathi songs...";

function buildSentence(ids: string[]): string {
  const phrases = ids
    .map((id) => ALL_CHIPS.find((c) => c.id === id)?.phrase)
    .filter(Boolean) as string[];
  if (phrases.length === 0) return "";
  if (phrases.length === 1) {
    const p = phrases[0];
    return p.charAt(0).toUpperCase() + p.slice(1) + ".";
  }
  const head = phrases.slice(0, -1).join(", ");
  const tail = phrases[phrases.length - 1];
  const sentence = `${head} with ${tail}.`;
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}

export function WeeklyPreference({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!contentRef.current) return;
    setHeight(open ? contentRef.current.scrollHeight : 0);
  }, [open, value, selected, showMore]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => textareaRef.current?.focus(), 280);
      return () => clearTimeout(t);
    }
  }, [open]);

  const toggleChip = (id: string) => {
    const next = selected.includes(id)
      ? selected.filter((s) => s !== id)
      : [...selected, id];
    setSelected(next);
    onChange(buildSentence(next).slice(0, MAX));
  };

  const renderChip = (c: { id: string; label: string }) => {
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
  };

  return (
    <div className="rounded-2xl border border-white/8 bg-card overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 p-4 text-left active:scale-[0.995] transition-transform"
        aria-expanded={open}
      >
        <Sparkles className="size-5 text-primary shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-[15px] font-bold text-foreground leading-tight">
            Refine this week's recommendations
          </p>
          <p className="text-[12px] text-muted-foreground leading-snug mt-0.5">
            Fine-tune this week's Discover Weekly using natural language.
          </p>
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground bg-white/[0.06] border border-white/10 rounded-full px-2 py-0.5">
          Optional
        </span>
        <ChevronDown
          className={cn(
            "size-4 text-muted-foreground transition-transform duration-[280ms]",
            open && "rotate-180",
          )}
        />
      </button>

      <div
        style={{ height }}
        className="transition-[height] duration-[280ms] ease-out overflow-hidden"
      >
        <div ref={contentRef} className="px-4 pb-4 pt-1 space-y-3">
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value.slice(0, MAX))}
              maxLength={MAX}
              rows={3}
              placeholder={PLACEHOLDER}
              className="w-full resize-none rounded-xl bg-white/[0.06] border border-white/8 focus:border-primary/60 outline-none px-3 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground/70 leading-snug transition-colors"
            />
            <span className="absolute bottom-2 right-3 text-[10px] text-muted-foreground/70 tabular-nums">
              {value.length}/{MAX}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {PRIMARY_CHIPS.map(renderChip)}
            {showMore && MORE_CHIPS.map(renderChip)}
            {!showMore && (
              <button
                type="button"
                onClick={() => setShowMore(true)}
                className="px-3 py-1.5 rounded-full text-[12px] font-semibold border border-dashed border-white/15 text-muted-foreground hover:text-foreground hover:border-white/25 transition-all duration-200 active:scale-95"
              >
                More suggestions
              </button>
            )}
          </div>

          <p className="text-[11px] text-muted-foreground leading-snug">
            Temporary preference • Doesn't change your music profile
          </p>
        </div>
      </div>
    </div>
  );
}
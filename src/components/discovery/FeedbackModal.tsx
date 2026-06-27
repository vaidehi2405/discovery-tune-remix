import { useEffect, useRef, useState } from "react";
import { Check, Music2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FeedbackPayload, FeedbackReason, Track } from "@/types/discovery";

const REASONS: { id: FeedbackReason; label: string }[] = [
  { id: "not_my_taste", label: "Not my taste" },
  { id: "too_repetitive", label: "Too repetitive" },
  { id: "too_mainstream", label: "Too mainstream" },
  { id: "wrong_mood", label: "Wrong mood or vibe" },
  { id: "already_know", label: "Already know this song" },
  { id: "too_different", label: "Too different from what I wanted" },
  { id: "other", label: "Other" },
];

export function FeedbackModal({
  open,
  track,
  onClose,
  onSubmit,
}: {
  open: boolean;
  track: Track | null;
  onClose: () => void;
  onSubmit: (payload: FeedbackPayload) => void;
}) {
  const [reason, setReason] = useState<FeedbackReason | null>(null);
  const [details, setDetails] = useState("");
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const otherRef = useRef<HTMLDivElement>(null);

  // Mount / unmount with slide animation
  useEffect(() => {
    if (open) {
      setReason(null);
      setDetails("");
      setMounted(true);
      // next frame, trigger slide-up
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    } else if (mounted) {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 320);
      return () => clearTimeout(t);
    }
  }, [open, mounted]);

  if (!mounted || !track) return null;

  const canSubmit = reason !== null && (reason !== "other" || details.trim().length > 0);
  const isOther = reason === "other";

  return (
    <div className="absolute inset-0 z-50">
      {/* Backdrop */}
      <button
        aria-label="Close"
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-black/65 backdrop-blur-[2px] transition-opacity duration-300",
          visible ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="feedback-title"
        className={cn(
          "absolute inset-x-0 bottom-0 h-[68%] bg-[#1c1c1c] rounded-t-[24px] shadow-[0_-20px_50px_-10px_rgba(0,0,0,0.6)]",
          "flex flex-col will-change-transform",
          "transition-transform duration-[340ms]",
          visible ? "translate-y-0" : "translate-y-full",
        )}
        style={{
          transitionTimingFunction: visible
            ? "cubic-bezier(0.22, 1, 0.36, 1)"
            : "cubic-bezier(0.4, 0, 1, 1)",
        }}
      >
        {/* Grabber */}
        <div className="flex justify-center pt-2.5 pb-1 shrink-0">
          <div className="h-1 w-9 rounded-full bg-white/25" />
        </div>

        {/* Header */}
        <div className="px-5 pt-2 pb-3 shrink-0">
          <h2
            id="feedback-title"
            className="text-[19px] font-extrabold text-foreground leading-tight tracking-tight"
          >
            Why didn't this recommendation work?
          </h2>
          <p className="text-[13px] text-muted-foreground mt-1">
            Help us improve future recommendations.
          </p>

          {/* Track card */}
          <div className="mt-3 flex items-center gap-3 rounded-xl bg-white/[0.06] p-2.5">
            <div
              className="size-10 rounded-md shrink-0 flex items-center justify-center"
              style={{ background: track.coverGradient }}
            >
              <Music2 className="size-4 text-white/85" />
            </div>
            <div className="min-w-0">
              <p className="text-[14px] font-semibold text-foreground truncate leading-tight">
                {track.title}
              </p>
              <p className="text-[12px] text-muted-foreground truncate">{track.artist}</p>
            </div>
          </div>
        </div>

        {/* Options — fits without scrolling */}
        <div className="flex-1 min-h-0 px-3 overflow-hidden">
          <div className="flex flex-col">
            {REASONS.map((r) => {
              const checked = reason === r.id;
              return (
                <div key={r.id} className="flex flex-col">
                  <button
                    type="button"
                    onClick={() => setReason(r.id)}
                    className={cn(
                      "w-full min-h-12 flex items-center gap-3 px-3 rounded-lg text-left",
                      "transition-colors duration-200",
                      checked ? "bg-primary/12" : "active:bg-white/[0.04]",
                    )}
                  >
                    <span
                      className={cn(
                        "size-[22px] rounded-full shrink-0 flex items-center justify-center transition-all duration-200",
                        checked
                          ? "bg-primary border-0"
                          : "border-[1.5px] border-white/40 bg-transparent",
                      )}
                    >
                      <Check
                        className={cn(
                          "size-3.5 text-black transition-opacity duration-150",
                          checked ? "opacity-100" : "opacity-0",
                        )}
                        strokeWidth={3.5}
                      />
                    </span>
                    <span
                      className={cn(
                        "text-[14.5px] transition-colors",
                        checked ? "text-primary font-semibold" : "text-foreground/95",
                      )}
                    >
                      {r.label}
                    </span>
                  </button>

                  {/* "Other" expandable text field, inline under the row */}
                  {r.id === "other" && (
                    <div
                      ref={otherRef}
                      style={{
                        maxHeight: isOther ? 120 : 0,
                        opacity: isOther ? 1 : 0,
                      }}
                      className="overflow-hidden transition-all duration-300 ease-out px-3"
                    >
                      <div className="pt-2 pb-1">
                        <textarea
                          value={details}
                          onChange={(e) => setDetails(e.target.value.slice(0, 150))}
                          placeholder="Tell us more..."
                          rows={2}
                          className="w-full rounded-lg bg-white/[0.06] text-foreground placeholder:text-muted-foreground p-2.5 text-[13px] resize-none border border-white/10 focus:border-primary focus:outline-none transition-colors no-scrollbar"
                        />
                        <div className="text-right text-[10.5px] text-muted-foreground mt-0.5 tabular-nums">
                          {details.length}/150
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer — always visible */}
        <div className="shrink-0 px-5 pt-3 pb-5 border-t border-white/[0.06] bg-[#1c1c1c]">
          <button
            type="button"
            disabled={!canSubmit}
            onClick={() =>
              reason &&
              onSubmit({
                trackId: track.id,
                reason,
                details: reason === "other" ? details : undefined,
              })
            }
            className={cn(
              "w-full h-12 rounded-full bg-primary text-primary-foreground font-bold text-[15px]",
              "hover:bg-[var(--spotify-green-hover)] active:scale-[0.98] transition-all",
              "disabled:opacity-40 disabled:active:scale-100",
            )}
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full h-10 mt-1 text-[14px] font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
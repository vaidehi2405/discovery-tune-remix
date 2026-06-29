import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface CoachMarkProps {
  /** Whether to render */
  show: boolean;
  /** Current step number (1-based) */
  step: number;
  /** Total steps */
  totalSteps: number;
  /** Title */
  title: string;
  /** Short body copy */
  body: string;
  /** Primary CTA label */
  cta?: string;
  /** Called on primary CTA */
  onNext: () => void;
  /** Called on Skip */
  onSkip: () => void;
  /** Called on Back (hidden on step 1) */
  onBack?: () => void;
  /**
   * Where to place the tooltip relative to the highlighted element.
   * "above" = tooltip sits above the highlight cutout
   * "below" = tooltip sits below the highlight cutout
   */
  position?: "above" | "below";
}

export function CoachMark({
  show,
  step,
  totalSteps,
  title,
  body,
  cta = "Next",
  onNext,
  onSkip,
  onBack,
  position = "below",
}: CoachMarkProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }
    setVisible(false);
  }, [show]);

  if (!show) return null;

  return (
    <div
      className={cn(
        "absolute inset-0 z-[80] pointer-events-auto transition-opacity duration-300",
        visible ? "opacity-100" : "opacity-0",
      )}
    >
      {/* Dim overlay — pointer events pass through to highlighted elements via z-index */}
      <div className="absolute inset-0 bg-black/55 pointer-events-auto" onClick={onSkip} />

      {/* Tooltip */}
      <div
        className={cn(
          "absolute left-4 right-4 z-[90] pointer-events-auto transition-all duration-300 ease-out",
          position === "below" ? "bottom-[100px]" : "top-[70px]",
          visible
            ? "opacity-100 translate-y-0"
            : position === "below"
              ? "opacity-0 translate-y-3"
              : "opacity-0 -translate-y-3",
        )}
      >
        <div className="rounded-2xl bg-[#1a1a1a]/95 backdrop-blur-sm border border-white/10 px-5 py-4 shadow-2xl">
          {/* Step indicator */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-primary tracking-wider uppercase">
              Step {step}/{totalSteps}
            </span>
            {onBack && step > 1 && (
              <button
                type="button"
                onClick={onBack}
                className="flex items-center gap-0.5 text-[12px] text-white/50 hover:text-white/80 transition-colors"
              >
                <ChevronLeft className="size-3.5" />
                Back
              </button>
            )}
          </div>

          <h3 className="text-[15px] font-bold text-white leading-snug">{title}</h3>
          <p className="text-[12.5px] text-white/65 mt-1 leading-relaxed">{body}</p>

          {/* Actions */}
          <div className="flex items-center gap-3 mt-4">
            <button
              type="button"
              onClick={onNext}
              className="flex-1 h-9 rounded-full bg-primary text-primary-foreground text-[13px] font-bold active:scale-[0.97] transition-transform"
            >
              {cta}
            </button>
            <button
              type="button"
              onClick={onSkip}
              className="px-3 h-9 rounded-full text-[12px] font-semibold text-white/50 hover:text-white/80 transition-colors"
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

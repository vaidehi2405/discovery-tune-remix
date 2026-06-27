import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DiscoveryBadge } from "./DiscoveryBadge";
import type { DiscoveryLevel } from "@/types/discovery";

export function SuccessCard({
  level,
  onContinue,
}: {
  level: DiscoveryLevel;
  onContinue: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-up" />
      <div className="relative w-full md:max-w-md bg-card md:rounded-2xl rounded-t-3xl border border-white/10 px-6 pt-10 pb-8 animate-fade-up">
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-full" />
            <div className="relative size-20 rounded-full bg-primary flex items-center justify-center animate-success-pop">
              <Check className="size-10 text-primary-foreground" strokeWidth={3} />
            </div>
          </div>
          <h2 className="mt-6 text-2xl font-bold text-foreground">
            Got it. We'll improve future recommendations.
          </h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-xs">
            Thanks for helping us make Discover Weekly better.
          </p>

          <div className="mt-7 w-full rounded-2xl bg-muted/40 border border-white/8 p-5 flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              Your Discovery Level
            </span>
            <DiscoveryBadge level={level} />
            <p className="text-xs text-muted-foreground mt-1">You can change this anytime.</p>
          </div>

          <Button
            onClick={onContinue}
            className="mt-6 w-full h-12 rounded-full bg-primary text-primary-foreground font-bold text-[15px] hover:bg-[var(--spotify-green-hover)] active:scale-[0.98] transition-all"
          >
            Continue Listening
          </Button>
        </div>
      </div>
    </div>
  );
}
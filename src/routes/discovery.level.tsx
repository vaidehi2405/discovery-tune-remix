import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useState } from "react";
import { PhoneFrame } from "@/components/discovery/PhoneFrame";
import { DiscoverySlider } from "@/components/discovery/DiscoverySlider";
import { DiscoveryLevelCard } from "@/components/discovery/DiscoveryLevelCard";
import { PlaylistPreview } from "@/components/discovery/PlaylistPreview";
import { RefineSheet } from "@/components/discovery/RefineSheet";
import { DISCOVERY_LEVELS } from "@/services/discovery";
import {
  setDiscoveryLevel,
  setWeeklyPreference,
  useDiscoveryLevel,
  useDiscoveryState,
} from "@/hooks/useDiscoveryStore";
import { hasClientNavigated } from "@/lib/nav-flag";
import type { DiscoveryLevel } from "@/types/discovery";

export const Route = createFileRoute("/discovery/level")({
  beforeLoad: () => {
    if (!hasClientNavigated()) throw redirect({ to: "/" });
  },
  head: () => ({
    meta: [
      { title: "Discovery Level — Discover Weekly" },
      { name: "description", content: "Choose how exploratory your Discover Weekly should be." },
    ],
  }),
  component: DiscoveryLevelPage,
});

function DiscoveryLevelPage() {
  const level = useDiscoveryLevel();
  const { weeklyPreference } = useDiscoveryState();
  const navigate = useNavigate();
  const order: DiscoveryLevel[] = ["familiar", "balanced", "exploratory"];
  const cfg = DISCOVERY_LEVELS[level];
  const [sheetOpen, setSheetOpen] = useState(false);

  const goGenerate = () => navigate({ to: "/discovery/generating", replace: true });

  return (
    <PhoneFrame>
      <div className="flex flex-col min-h-full pb-8">
        <header className="px-5 pt-4 pb-2 flex items-center justify-between">
          <Link to="/" className="p-1 -ml-1 text-foreground" aria-label="Close">
            <X className="size-6" />
          </Link>
          <span className="text-sm font-semibold text-muted-foreground">Discovery Control</span>
          <span className="size-6" />
        </header>

        <div className="px-5 pt-4">
          <h1 className="text-2xl font-bold text-foreground leading-tight">
            Choose your Discovery Level
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Control how exploratory this week's Discover Weekly should be.
          </p>
        </div>

        <div className="px-5 mt-7">
          <DiscoverySlider value={level} onChange={setDiscoveryLevel} />
        </div>

        <div className="px-5 mt-7 space-y-3">
          {order.map((id) => (
            <DiscoveryLevelCard
              key={id}
              config={DISCOVERY_LEVELS[id]}
              selected={level === id}
              onSelect={() => setDiscoveryLevel(id)}
            />
          ))}
        </div>

        <div className="px-5 mt-7">
          <div className="rounded-2xl border border-white/8 bg-card p-4">
            <PlaylistPreview tracks={cfg.preview} />
          </div>
        </div>

        <div className="flex-1" />

        <div className="sticky bottom-0 inset-x-0 px-5 pt-4 pb-6 bg-gradient-to-t from-background via-background to-transparent">
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="w-full h-13 py-4 rounded-full bg-primary text-primary-foreground font-bold text-[15px] hover:bg-[var(--spotify-green-hover)] active:scale-[0.98] transition-all shadow-[var(--shadow-green-glow)]"
          >
            Continue
          </button>
        </div>

        <RefineSheet
          open={sheetOpen}
          initialValue={weeklyPreference}
          onApply={(v) => {
            setWeeklyPreference(v);
            setSheetOpen(false);
            goGenerate();
          }}
          onSkip={() => {
            setWeeklyPreference("");
            setSheetOpen(false);
            goGenerate();
          }}
        />
      </div>
    </PhoneFrame>
  );
}
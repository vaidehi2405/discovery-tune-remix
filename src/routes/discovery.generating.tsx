import { useEffect, useMemo, useState } from "react";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/discovery/PhoneFrame";
import { Check, Loader2 } from "lucide-react";
import { hasClientNavigated } from "@/lib/nav-flag";
import {
  setGeneratedTracks,
  useDiscoveryLevel,
  useDiscoveryState,
} from "@/hooks/useDiscoveryStore";
import type { Track } from "@/types/discovery";

const GRADIENTS = [
  "linear-gradient(135deg,#064e3b,#34d399)",
  "linear-gradient(135deg,#1e3a8a,#60a5fa)",
  "linear-gradient(135deg,#4c1d95,#a855f7)",
  "linear-gradient(135deg,#7c2d12,#fb923c)",
  "linear-gradient(135deg,#831843,#f472b6)",
  "linear-gradient(135deg,#0c4a6e,#22d3ee)",
  "linear-gradient(135deg,#365314,#84cc16)",
  "linear-gradient(135deg,#581c87,#c084fc)",
  "linear-gradient(135deg,#7f1d1d,#ef4444)",
  "linear-gradient(135deg,#134e4a,#2dd4bf)",
];

function randomDuration() {
  const m = 2 + Math.floor(Math.random() * 3);
  const s = Math.floor(Math.random() * 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export const Route = createFileRoute("/discovery/generating")({
  beforeLoad: () => {
    if (!hasClientNavigated()) throw redirect({ to: "/" });
  },
  head: () => ({
    meta: [{ title: "Generating — Discover Weekly" }],
  }),
  component: GeneratingPage,
});

function GeneratingPage() {
  const navigate = useNavigate();
  const level = useDiscoveryLevel();
  const { weeklyPreference } = useDiscoveryState();
  const [progress, setProgress] = useState(0);

  const stages = useMemo(
    () => [
      { label: "Analyzing your listening history", until: 18 },
      { label: "Scanning 2.4M candidate tracks", until: 38 },
      { label: "Filtering tracks you've heard recently", until: 55 },
      { label: "Ranking by your taste profile", until: 75 },
      { label: "Balancing familiar & fresh picks", until: 90 },
      { label: "Finalizing your Discover Weekly", until: 100 },
    ],
    [],
  );

  useEffect(() => {
    const start = performance.now();
    const duration = 8000;
    let raf = 0;
    let done = false;
    let fetched = false;

    const fetchPromise = fetch("/api/recommendations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ discoveryLevel: level, weeklyPreference }),
    })
      .then((r) => r.json())
      .then((data: { tracks: Array<{ id: string; name: string; artist: string; album: string; image: string; reason: string }> }) => {
        const tracks: Track[] = (data?.tracks ?? []).map((t, i) => ({
          id: t.id || String(i + 1),
          title: t.name,
          artist: t.artist,
          album: t.album,
          image: t.image,
          reason: t.reason,
          duration: randomDuration(),
          coverGradient: GRADIENTS[i % GRADIENTS.length],
        }));
        setGeneratedTracks(tracks);
        fetched = true;
      })
      .catch(() => {
        setGeneratedTracks(null);
        fetched = true;
      });

    const maybeGo = () => {
      if (done && fetched) {
        setTimeout(() => navigate({ to: "/discovery/playlist", replace: true }), 250);
      }
    };

    const tick = (t: number) => {
      const p = Math.min(100, ((t - start) / duration) * 100);
      setProgress(p);
      if (p < 100) raf = requestAnimationFrame(tick);
      else {
        done = true;
        if (fetched) maybeGo();
        else fetchPromise.then(maybeGo);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [navigate, level, weeklyPreference]);


  const currentIdx = stages.findIndex((s) => progress < s.until);
  const activeIdx = currentIdx === -1 ? stages.length - 1 : currentIdx;

  return (
    <PhoneFrame>
      <div className="relative min-h-full overflow-hidden flex flex-col">
        {/* Animated background blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -left-20 size-80 rounded-full bg-primary/20 blur-3xl animate-pulse-slow" />
          <div
            className="absolute bottom-1/4 -right-20 size-80 rounded-full bg-purple-500/20 blur-3xl animate-pulse-slow"
            style={{ animationDelay: "1s" }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 rounded-full bg-emerald-400/10 blur-3xl animate-float" />
        </div>

        <div className="relative flex-1 flex flex-col items-center justify-center px-6 text-center gap-8 pt-10">
          <div>
            <h1 className="text-2xl font-bold text-foreground leading-tight">
              Building your mix
              <br />
              just for you
            </h1>
            <p className="text-sm text-muted-foreground mt-2">Crunching your taste profile in real time.</p>
          </div>

          <div className="relative flex items-center justify-center" style={{ width: 220, height: 220 }}>
            <span
              aria-hidden
              className="absolute inset-0 rounded-full bg-primary/30 blur-3xl"
              style={{ animation: "spotify-glow 1.6s ease-in-out infinite" }}
            />
            <span
              aria-hidden
              className="absolute rounded-full bg-primary/20 blur-2xl"
              style={{ width: 160, height: 160, animation: "spotify-glow 1.6s ease-in-out infinite" }}
            />
            <svg
              viewBox="0 0 168 168"
              className="relative size-28 text-primary drop-shadow-[0_0_24px_rgba(29,185,84,0.45)]"
              style={{ animation: "spotify-pulse 1.6s ease-in-out infinite", transformOrigin: "center" }}
              fill="currentColor"
              aria-label="Spotify"
            >
              <path d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738zm38.404 120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35-1.04-3.453.907-7.093 4.354-8.143 30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.001zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 015.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 012.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z" />
            </svg>
          </div>

          <div className="w-full max-w-[280px] space-y-2.5 text-left">
            {stages.map((s, i) => {
              const done = i < activeIdx;
              const active = i === activeIdx;
              return (
                <div
                  key={s.label}
                  className={
                    "flex items-center gap-2.5 text-[13px] transition-all " +
                    (active ? "text-foreground" : done ? "text-muted-foreground/80" : "text-muted-foreground/40")
                  }
                >
                  <span className="size-4 shrink-0 flex items-center justify-center">
                    {done ? (
                      <Check className="size-4 text-primary" />
                    ) : active ? (
                      <Loader2 className="size-3.5 text-primary animate-spin" />
                    ) : (
                      <span className="size-1.5 rounded-full bg-current opacity-60" />
                    )}
                  </span>
                  <span className={active ? "font-medium" : ""}>{s.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative pb-8 flex justify-center">
          <div className="text-muted-foreground text-xs font-semibold tracking-widest">SPOTIFY</div>
        </div>
      </div>
    </PhoneFrame>
  );
}

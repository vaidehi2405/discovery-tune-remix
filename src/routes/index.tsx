import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Search, Library, Home, Play, Plus, Sparkles, ChevronRight, Star } from "lucide-react";
import { PhoneFrame } from "@/components/discovery/PhoneFrame";
import { VaultSheet } from "@/components/discovery/VaultSheet";
import { markNavigated } from "@/lib/nav-flag";
import {
  useDiscoveryLevel,
  useHasGenerated,
  useVault,
} from "@/hooks/useDiscoveryStore";
import { DISCOVERY_LEVELS } from "@/services/discovery";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Spotify — Home" },
      { name: "description", content: "Discovery Control inside Discover Weekly." },
      { property: "og:title", content: "Spotify — Discovery Control" },
      { property: "og:description", content: "Tune how exploratory your Discover Weekly should be." },
    ],
  }),
  component: Index,
});

function Index() {
  // Once the homepage has mounted, any subsequent client-side navigation is
  // legitimate. A hard refresh on a deep route will not have this flag set
  // and will be redirected back here.
  useEffect(() => {
    markNavigated();
  }, []);
  const level = useDiscoveryLevel();
  const hasGenerated = useHasGenerated();
  const vault = useVault();
  const [vaultOpen, setVaultOpen] = useState(false);

  const levelLabel = DISCOVERY_LEVELS[level].label;
  const dwTarget = hasGenerated ? "/discovery/playlist" : "/discovery/level";

  const filters = ["All", "Music", "Following", "Podcasts"];
  const radios = [
    {
      title: "Arijit Singh Radio",
      subtitle: "Arijit Singh • Pritam • Atif Aslam • Armaan Malik",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&q=80",
    },
    {
      title: "Bollywood Love Radio",
      subtitle: "Arijit Singh • Jubin Nautiyal • Shreya Ghoshal",
      image: "https://images.unsplash.com/photo-1618005174828-9430c5e7b233?auto=format&fit=crop&w=500&q=80",
    },
    {
      title: "Late Night Indie Radio",
      subtitle: "Prateek Kuhad • Anuv Jain • When Chai Met Toast",
      image: "https://images.unsplash.com/photo-1618005156711-f254589d803d?auto=format&fit=crop&w=500&q=80",
    },
    {
      title: "90s Bollywood Radio",
      subtitle: "Udit Narayan • Kumar Sanu • Alka Yagnik • Lata Mangeshkar",
      image: "https://images.unsplash.com/photo-1618005164821-2e6526190bd0?auto=format&fit=crop&w=500&q=80",
    },
    {
      title: "Lo-fi India Radio",
      subtitle: "Lofi Fruits Music • Silk Road Sounds • Indian Chill",
      image: "https://images.unsplash.com/photo-1618005198143-e5283b519a7f?auto=format&fit=crop&w=500&q=80",
    },
  ];
  const albums = [
    { kind: "Single", title: "Channa Mereya", subtitle: "Arijit Singh", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=500&q=80" },
    { kind: "Single", title: "Kesariya", subtitle: "Arijit Singh", image: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=500&q=80" },
    { kind: "Single", title: "Raataan Lambiyan", subtitle: "Jubin Nautiyal", image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=500&q=80" },
    { kind: "Single", title: "Apna Bana Le", subtitle: "Arijit Singh", image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=500&q=80" },
    { kind: "Single", title: "Kaise Hua", subtitle: "Vishal Mishra", image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=500&q=80" },
    { kind: "Single", title: "Heeriye", subtitle: "Jasleen Royal, Arijit Singh", image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=500&q=80" },
    { kind: "Single", title: "Tum Hi Ho", subtitle: "Arijit Singh", image: "https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?auto=format&fit=crop&w=500&q=80" },
    { kind: "Single", title: "Baarishein", subtitle: "Anuv Jain", image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=500&q=80" },
    { kind: "Single", title: "Hawayein", subtitle: "Arijit Singh", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=500&q=80" },
  ];

  return (
    <PhoneFrame>
      <div className="flex flex-col min-h-full pb-40">
        {/* Header: avatar + filter pills */}
        <div className="px-4 pt-4 pb-3 flex items-center gap-2">
          <button
            aria-label="Profile"
            className="size-9 rounded-full shrink-0 flex items-center justify-center text-sm font-bold text-white"
            style={{ background: "linear-gradient(135deg,#ec4899,#f43f5e)" }}
          >
            V
          </button>
          <div className="flex gap-2 overflow-x-auto no-scrollbar -mr-4 pr-4">
            {filters.map((p, i) => (
              <button
                key={p}
                className={
                  "px-4 py-1.5 rounded-full text-[13px] font-semibold whitespace-nowrap transition-colors " +
                  (i === 1
                    ? "bg-primary text-primary-foreground"
                    : "bg-[#1f1f1f] text-foreground hover:bg-[#2a2a2a]")
                }
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Discover — NEW IMPROVED */}
        <section className="px-4 mt-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h2 className="text-[22px] font-extrabold tracking-tight text-foreground">Discover</h2>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/15 text-primary text-[10px] font-bold uppercase tracking-wider">
                <Sparkles className="size-3" />
                New · Improved
              </span>
            </div>
            <Link to={dwTarget} className="text-xs font-semibold text-muted-foreground flex items-center gap-0.5">
              See all <ChevronRight className="size-3.5" />
            </Link>
          </div>

          <Link
            to={dwTarget}
            className="group block relative rounded-2xl overflow-hidden active:scale-[0.99] transition-transform"
            style={{ background: "var(--gradient-discover)" }}
          >
            <div className="absolute -top-10 -right-10 size-40 rounded-full bg-white/15 blur-2xl" />
            <div className="absolute -bottom-12 -left-8 size-40 rounded-full bg-black/30 blur-2xl" />
            <div className="relative p-4 flex items-center gap-4">
              <div className="size-16 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center shrink-0 ring-1 ring-white/20">
                <Sparkles className="size-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/80">
                  {hasGenerated ? "Made for You" : "Discovery Control"}
                </p>
                <h3 className="text-[17px] font-extrabold text-white leading-tight mt-0.5">
                  Discover Weekly
                </h3>
                {hasGenerated ? (
                  <div className="mt-1 space-y-0.5">
                    <p className="text-[11px] text-white/90 font-semibold">
                      Discovery Level: {levelLabel}
                    </p>
                    <p className="text-[10.5px] text-white/70">Updated this Monday</p>
                  </div>
                ) : (
                  <p className="text-[11px] text-white/85 mt-1 line-clamp-2">
                    Pick how exploratory your week sounds — familiar, balanced, or out there.
                  </p>
                )}
              </div>
              <div className="size-11 rounded-full bg-primary flex items-center justify-center shadow-xl shrink-0 group-active:scale-95 transition">
                <Play className="size-5 text-primary-foreground fill-current ml-0.5" />
              </div>
            </div>
          </Link>

          {/* Discovery Vault entry */}
          <button
            type="button"
            onClick={() => setVaultOpen(true)}
            className="mt-3 w-full flex items-center gap-3 rounded-xl bg-[#1f1f1f] hover:bg-[#262626] active:scale-[0.99] transition p-3 text-left"
          >
            <span
              className="size-11 rounded-lg shrink-0 flex items-center justify-center shadow"
              style={{ background: "linear-gradient(135deg,#fbbf24,#7c2d12)" }}
            >
              <Star className="size-5 text-white fill-white" />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block text-[14px] font-bold text-foreground">Discovery Vault</span>
              <span className="block text-[11.5px] text-muted-foreground truncate">
                Songs you wanted to revisit · {vault.length} saved
              </span>
            </span>
            <ChevronRight className="size-4 text-muted-foreground" />
          </button>
        </section>

        {/* Popular radio */}
        <section className="mt-7">
          <h3 className="px-4 text-[20px] font-extrabold tracking-tight text-foreground mb-3">
            Popular radio
          </h3>
          <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-1">
            {radios.map((r) => (
              <div key={r.title} className="w-[170px] shrink-0">
                <div
                  className="relative aspect-square rounded-md overflow-hidden flex flex-col p-3"
                  style={{ backgroundImage: `url(${r.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
                >
                  <div className="flex items-center justify-between text-[10px] font-bold text-black/80">
                    <span className="size-4 rounded-full bg-black/80 flex items-center justify-center">
                      <span className="size-2 rounded-full bg-primary" />
                    </span>
                    <span className="tracking-widest">RADIO</span>
                  </div>
                  <div className="flex-1 flex items-center justify-center gap-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="size-10 rounded-full ring-2 ring-black/10"
                        style={{
                          background: `linear-gradient(135deg, hsl(${(i * 80 + 20) % 360} 50% 35%), hsl(${(i * 80 + 80) % 360} 50% 55%))`,
                          transform: i === 1 ? "scale(1.4)" : "scale(1)",
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-[20px] font-extrabold text-black leading-none truncate">
                    {r.title}
                  </p>
                </div>
                <p className="text-[12px] text-muted-foreground mt-2 line-clamp-2 leading-snug">
                  {r.subtitle}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Popular albums and singles */}
        <section className="mt-6">
          <h3 className="px-4 text-[20px] font-extrabold tracking-tight text-foreground mb-3">
            Popular albums and singles
          </h3>
          <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-1">
            {albums.map((a) => (
              <div key={a.title} className="w-[170px] shrink-0">
                <div
                  className="relative aspect-square rounded-md overflow-hidden shadow-lg"
                  style={{ backgroundImage: `url(${a.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
                >
                  <div className="absolute top-2 left-2 right-2 flex items-center justify-between text-[8px] font-bold text-white/80">
                    <span className="px-1 bg-red-600 rounded-sm">PG</span>
                    <span className="px-1 bg-black/40 rounded-sm">HD</span>
                  </div>
                  <div className="absolute bottom-3 left-0 right-0 text-center">
                    <p className="text-white font-black text-[18px] tracking-wide drop-shadow-md truncate px-2">
                      {a.title}
                    </p>
                  </div>
                </div>
                <p className="text-[12px] text-muted-foreground mt-2">{a.kind}</p>
                <p className="text-[13px] font-bold text-foreground line-clamp-2 leading-tight">
                  {a.title}
                </p>
                <p className="text-[12px] text-muted-foreground mt-0.5 truncate">{a.subtitle}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Session prompt */}
        <section className="px-4 mt-7">
          <p className="text-[13px] text-muted-foreground">Jump into a session based on your tastes</p>
          <h3 className="text-[22px] font-extrabold text-foreground mt-0.5">Start listening</h3>
        </section>

        {/* Now playing bar */}
        <div className="absolute bottom-[68px] inset-x-0 px-2 z-40">
          <div className="mx-auto rounded-lg bg-[#3f3327] flex items-center gap-3 p-2 shadow-2xl">
            <div
              className="size-10 rounded-md shrink-0 flex items-center justify-center text-[9px] font-bold text-white/80"
              style={{ backgroundImage: "url(https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=500&q=80)", backgroundSize: "cover", backgroundPosition: "center" }}
            >
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-foreground truncate">Channa Mereya</p>
              <p className="text-[11px] text-muted-foreground truncate">Arijit Singh</p>
            </div>
            <button className="text-foreground p-1" aria-label="Add">
              <Plus className="size-5" />
            </button>
            <button className="text-foreground p-1" aria-label="Play">
              <Play className="size-5 fill-current" />
            </button>
          </div>
        </div>

        {/* Bottom nav */}
        <nav className="absolute bottom-0 inset-x-0 bg-background/95 backdrop-blur z-40 pb-3">
          <div className="grid grid-cols-5 py-2">
            {[
              { icon: Home, label: "Home", active: true },
              { icon: Search, label: "Search" },
              { icon: Library, label: "Your Library", onClick: () => setVaultOpen(true) },
              { icon: () => <span className="text-[13px] font-black">●</span>, label: "Premium" },
              { icon: Plus, label: "Create" },
            ].map((tab) => {
              const Icon = tab.icon as React.ElementType;
              return (
                <button
                  key={tab.label}
                  onClick={(tab as { onClick?: () => void }).onClick}
                  className={
                    "flex flex-col items-center gap-1 transition-colors " +
                    (tab.active ? "text-foreground" : "text-muted-foreground")
                  }
                >
                  <Icon className="size-5" />
                  <span className="text-[10px] font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      <VaultSheet open={vaultOpen} onClose={() => setVaultOpen(false)} />
    </PhoneFrame>
  );
}

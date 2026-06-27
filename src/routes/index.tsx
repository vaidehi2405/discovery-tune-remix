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

      subtitle: "Arijit Singh • Pritam • Atif Aslam • Armaan Malik",
      image: "/radio image 1.png",
    },
    {

      subtitle: "Arijit Singh • Jubin Nautiyal • Shreya Ghoshal",
      image: "/radio image 2.png",
    },
    {

      subtitle: "Prateek Kuhad • Anuv Jain • When Chai Met Toast",
      image: "/radio image 3.png",
    },
    {

      subtitle: "Udit Narayan • Kumar Sanu • Alka Yagnik • Lata Mangeshkar",
      image: "/radio image 4.png",
    },

  ];
  const albums = [
    { kind: "Single", title: "Channa Mereya", subtitle: "Arijit Singh", image: "/channa mereya.jpg" },
    { kind: "Single", title: "Kesariya", subtitle: "Arijit Singh", image: "/kesariya.jpg" },
    { kind: "Single", title: "Raataan Lambiyan", subtitle: "Jubin Nautiyal", image: "/raata lambiya.jpg" },
    { kind: "Single", title: "Apna Bana Le", subtitle: "Arijit Singh", image: "/apna bana le.jpg" },
    { kind: "Single", title: "Kaise Hua", subtitle: "Vishal Mishra", image: "/kaise hua.jpg" },
    { kind: "Single", title: "Heeriye", subtitle: "Jasleen Royal, Arijit Singh", image: "/heeriye.jpg" },
    { kind: "Single", title: "Tum Hi Ho", subtitle: "Arijit Singh", image: "/tum hi ho.jpg" },
    { kind: "Single", title: "Baarishein", subtitle: "Anuv Jain", image: "/baarishien.jpg" },
    { kind: "Single", title: "Hawayein", subtitle: "Arijit Singh", image: "/hawayein.jpg" },
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
            style={{
              background: "radial-gradient(circle at 90% 50%, rgba(217, 122, 184, 0.3) 0%, transparent 60%), radial-gradient(circle at top right, rgba(217, 122, 184, 0.4) 0%, transparent 60%), linear-gradient(135deg, #0d1130 0%, #2f255e 35%, #4a3b87 65%, #8d5aae 85%, #d97ab8 100%)"
            }}
          >
            {/* Subtle Wave Graphics */}
            <svg
              className="absolute bottom-0 left-0 w-full h-[55%] pointer-events-none opacity-60"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0,224 C240,160 480,160 720,224 C960,288 1200,288 1440,224 L1440,320 L0,320 Z" fill="#2F255E" opacity="0.5" />
              <path d="M0,192 C180,256 360,256 540,192 C720,128 900,128 1080,192 C1260,256 1440,192 1440,192 L1440,320 L0,320 Z" fill="#4A3B87" opacity="0.4" />
              <path d="M0,256 C360,160 720,320 1080,224 C1260,176 1380,208 1440,224 L1440,320 L0,320 Z" fill="#8D5AAE" opacity="0.3" />
            </svg>

            <div className="relative p-4 flex items-center gap-4">
              <div className="size-16 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center shrink-0 ring-1 ring-white/20">
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
              <div key={r.image} className="w-[170px] shrink-0">
                <div
                  className="relative aspect-square rounded-md overflow-hidden flex flex-col p-3"
                  style={{ backgroundImage: `url('${r.image}')`, backgroundSize: "cover", backgroundPosition: "center" }}
                />
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
                  style={{ backgroundImage: `url('${a.image}')`, backgroundSize: "cover", backgroundPosition: "center" }}
                />
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
              style={{ backgroundImage: "url('/channa mereya.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
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

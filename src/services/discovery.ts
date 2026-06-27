import type { DiscoveryLevel, DiscoveryLevelConfig, FeedbackPayload, Track } from "@/types/discovery";

// Placeholder API surface. Replace with real backend calls.
// All functions are async to mirror network shape.

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const FAMILIAR_TRACKS: Track[] = [
  { id: "f1", title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", duration: "4:30", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=150&q=80" },
  { id: "f2", title: "Can't Stop the Feeling!", artist: "Justin Timberlake", duration: "3:56", image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&w=150&q=80" },
  { id: "f3", title: "Happy", artist: "Pharrell Williams", duration: "3:53", image: "https://images.unsplash.com/photo-1487180142328-0c4e37023af5?auto=format&fit=crop&w=150&q=80" },
  { id: "f4", title: "Shake It Off", artist: "Taylor Swift", duration: "3:39", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=150&q=80" },
  { id: "f5", title: "Sugar", artist: "Maroon 5", duration: "3:55", image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=150&q=80" },
];

const BALANCED_TRACKS: Track[] = [
  { id: "b1", title: "Everlong", artist: "Foo Fighters", duration: "4:10", image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=150&q=80" },
  { id: "b2", title: "Mr. Brightside", artist: "The Killers", duration: "3:42", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=150&q=80" },
  { id: "b3", title: "Get You", artist: "Daniel Caesar ft. Kali Uchis", duration: "4:38", image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=150&q=80" },
  { id: "b4", title: "Sunset Lover", artist: "Petit Biscuit", duration: "3:57", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=150&q=80" },
  { id: "b5", title: "The Less I Know The Better", artist: "Tame Impala", duration: "3:38", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=150&q=80" },
];

const EXPLORATORY_TRACKS: Track[] = [
  { id: "e1", title: "Bloom", artist: "Troye Sivan", duration: "3:42", image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=150&q=80" },
  { id: "e2", title: "Eastside", artist: "Benny Blanco, Halsey, Khalid", duration: "2:53", image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=150&q=80" },
  { id: "e3", title: "High Hopes", artist: "Panic! At The Disco", duration: "3:10", image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=150&q=80" },
  { id: "e4", title: "Glass Bloom", artist: "Hazel English", duration: "4:02", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80" },
  { id: "e5", title: "Neon Sigh", artist: "Yuno", duration: "2:54", image: "https://images.unsplash.com/photo-1618005174828-9430c5e7b233?auto=format&fit=crop&w=150&q=80" },
];

export const DISCOVERY_LEVELS: Record<DiscoveryLevel, DiscoveryLevelConfig> = {
  familiar: {
    id: "familiar",
    label: "Familiar",
    description: "Mostly artists and genres you already enjoy.",
    familiarPercent: 80,
    newPercent: 20,
    gradient: "var(--gradient-familiar)",
    preview: FAMILIAR_TRACKS.slice(0, 3),
  },
  balanced: {
    id: "balanced",
    label: "Balanced",
    description: "A mix of familiar favorites and fresh discoveries.",
    familiarPercent: 50,
    newPercent: 50,
    gradient: "var(--gradient-balanced)",
    preview: BALANCED_TRACKS.slice(0, 3),
  },
  exploratory: {
    id: "exploratory",
    label: "Exploratory",
    description: "Discover emerging artists and unexpected sounds.",
    familiarPercent: 20,
    newPercent: 80,
    gradient: "var(--gradient-exploratory)",
    preview: EXPLORATORY_TRACKS.slice(0, 3),
  },
};

export async function generatePlaylist(level: DiscoveryLevel): Promise<Track[]> {
  await sleep(300);
  if (level === "familiar") return FAMILIAR_TRACKS;
  if (level === "exploratory") return EXPLORATORY_TRACKS;
  return BALANCED_TRACKS;
}

export async function submitFeedback(_payload: FeedbackPayload): Promise<{ ok: true }> {
  await sleep(400);
  return { ok: true };
}

const ALL_TRACKS: Track[] = [
  ...FAMILIAR_TRACKS,
  ...BALANCED_TRACKS,
  ...EXPLORATORY_TRACKS,
];

export function getTrackById(id: string): Track | undefined {
  return ALL_TRACKS.find((t) => t.id === id);
}

export const USER_PLAYLISTS: { id: string; name: string; gradient: string }[] = [
  { id: "chill", name: "Chill Vibes", gradient: "linear-gradient(135deg,#0c4a6e,#38bdf8)" },
  { id: "road", name: "Road Trip", gradient: "linear-gradient(135deg,#7c2d12,#fb923c)" },
  { id: "gym", name: "Gym", gradient: "linear-gradient(135deg,#7f1d1d,#ef4444)" },
  { id: "focus", name: "Focus", gradient: "linear-gradient(135deg,#1e293b,#64748b)" },
];

export const LOADING_MESSAGES = [
  "Analyzing your taste…",
  "Finding hidden gems…",
  "Skipping songs you've heard too often…",
  "Balancing familiar and fresh…",
  "Building your Discover Weekly…",
  "Almost ready…",
];
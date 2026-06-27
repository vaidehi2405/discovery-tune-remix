import type { DiscoveryLevel, DiscoveryLevelConfig, FeedbackPayload, Track } from "@/types/discovery";

// Placeholder API surface. Replace with real backend calls.
// All functions are async to mirror network shape.

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const FAMILIAR_TRACKS: Track[] = [
  { id: "f1", title: "Cardigan", artist: "Taylor Swift", duration: "3:59", coverGradient: "linear-gradient(135deg,#1e3a8a,#60a5fa)" },
  { id: "f2", title: "About You", artist: "The 1975", duration: "5:28", coverGradient: "linear-gradient(135deg,#0c4a6e,#38bdf8)" },
  { id: "f3", title: "Daylight", artist: "Harry Styles", duration: "3:42", coverGradient: "linear-gradient(135deg,#1e40af,#93c5fd)" },
];

const BALANCED_TRACKS: Track[] = [
  { id: "b1", title: "Be Sweet", artist: "Japanese Breakfast", duration: "3:24", coverGradient: "linear-gradient(135deg,#064e3b,#34d399)" },
  { id: "b2", title: "Sunset Lover", artist: "Petit Biscuit", duration: "3:59", coverGradient: "linear-gradient(135deg,#065f46,#6ee7b7)" },
  { id: "b3", title: "The Less I Know The Better", artist: "Tame Impala", duration: "3:36", coverGradient: "linear-gradient(135deg,#14532d,#1DB954)" },
  { id: "b4", title: "Freaking Out the Neighborhood", artist: "Mac DeMarco", duration: "3:01", coverGradient: "linear-gradient(135deg,#166534,#86efac)" },
  { id: "b5", title: "Salt Away", artist: "Khruangbin", duration: "4:13", coverGradient: "linear-gradient(135deg,#052e16,#22c55e)" },
  { id: "b6", title: "Too Late", artist: "keshi", duration: "2:33", coverGradient: "linear-gradient(135deg,#14532d,#4ade80)" },
];

const EXPLORATORY_TRACKS: Track[] = [
  { id: "e1", title: "Neon Sigh", artist: "Yuno", duration: "2:54", coverGradient: "linear-gradient(135deg,#4c1d95,#a855f7)" },
  { id: "e2", title: "Vapor Dream", artist: "Mild High Club", duration: "3:18", coverGradient: "linear-gradient(135deg,#581c87,#c084fc)" },
  { id: "e3", title: "Glass Bloom", artist: "Hazel English", duration: "4:02", coverGradient: "linear-gradient(135deg,#3b0764,#d8b4fe)" },
];

export const DISCOVERY_LEVELS: Record<DiscoveryLevel, DiscoveryLevelConfig> = {
  familiar: {
    id: "familiar",
    label: "Familiar",
    description: "Mostly artists and genres you already enjoy.",
    familiarPercent: 80,
    newPercent: 20,
    gradient: "var(--gradient-familiar)",
    preview: FAMILIAR_TRACKS,
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
    preview: EXPLORATORY_TRACKS,
  },
};

export async function generatePlaylist(level: DiscoveryLevel): Promise<Track[]> {
  await sleep(300);
  if (level === "familiar") return [...FAMILIAR_TRACKS, ...BALANCED_TRACKS.slice(0, 3)];
  if (level === "exploratory") return [...EXPLORATORY_TRACKS, ...BALANCED_TRACKS.slice(3, 6)];
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
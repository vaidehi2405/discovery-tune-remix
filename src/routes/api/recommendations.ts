import { createFileRoute } from "@tanstack/react-router";
import type { DiscoveryLevel } from "@/types/discovery";

type ReqBody = {
  discoveryLevel: DiscoveryLevel;
  weeklyPreference: string;
};

type TrackOut = {
  id: string;
  name: string;
  artist: string;
  album: string;
  image: string;
  reason: string;
};

const FALLBACKS: Record<DiscoveryLevel, Array<Omit<TrackOut, "id" | "image" | "reason">>> = {
  familiar: [
    { name: "Cardigan", artist: "Taylor Swift", album: "folklore" },
    { name: "Daylight", artist: "Harry Styles", album: "Harry's House" },
    { name: "About You", artist: "The 1975", album: "Being Funny in a Foreign Language" },
    { name: "Cruel Summer", artist: "Taylor Swift", album: "Lover" },
    { name: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia" },
    { name: "Blinding Lights", artist: "The Weeknd", album: "After Hours" },
    { name: "Watermelon Sugar", artist: "Harry Styles", album: "Fine Line" },
    { name: "As It Was", artist: "Harry Styles", album: "Harry's House" },
    { name: "Anti-Hero", artist: "Taylor Swift", album: "Midnights" },
    { name: "Good 4 U", artist: "Olivia Rodrigo", album: "SOUR" },
  ],
  balanced: [
    { name: "Be Sweet", artist: "Japanese Breakfast", album: "Jubilee" },
    { name: "The Less I Know The Better", artist: "Tame Impala", album: "Currents" },
    { name: "Sunset Lover", artist: "Petit Biscuit", album: "Presence" },
    { name: "Salt Away", artist: "Khruangbin", album: "Mordechai" },
    { name: "Too Late", artist: "keshi", album: "GABRIEL" },
    { name: "Freaking Out the Neighborhood", artist: "Mac DeMarco", album: "Salad Days" },
    { name: "Pretty Girl", artist: "Clairo", album: "diary 001" },
    { name: "Redbone", artist: "Childish Gambino", album: "Awaken, My Love!" },
    { name: "Electric Feel", artist: "MGMT", album: "Oracular Spectacular" },
    { name: "Saturn", artist: "SZA", album: "SOS Deluxe" },
  ],
  exploratory: [
    { name: "Neon Sigh", artist: "Yuno", album: "Moodie" },
    { name: "Vapor Dream", artist: "Mild High Club", album: "Skiptracing" },
    { name: "Glass Bloom", artist: "Hazel English", album: "Wake UP!" },
    { name: "Velvet 4 Sale", artist: "Lana Del Rey", album: "Chemtrails Over the Country Club" },
    { name: "Marfa Lights", artist: "Drugdealer", album: "Hiding in Plain Sight" },
    { name: "Spring Fever", artist: "Wax Tailor", album: "By Any Beats Necessary" },
    { name: "Lost Soul", artist: "Bruno Major", album: "Columbo" },
    { name: "Hold On", artist: "Men I Trust", album: "Untourable Album" },
    { name: "On Hold", artist: "The xx", album: "I See You" },
    { name: "Inside Out", artist: "Spoon", album: "They Want My Soul" },
  ],
};

function fallback(level: DiscoveryLevel): { tracks: TrackOut[] } {
  return {
    tracks: FALLBACKS[level].map((t, i) => ({
      id: String(i + 1),
      ...t,
      image: `https://picsum.photos/seed/song-${i + 1}-${level}/300/300`,
      reason: "",
    })),
  };
}

async function callLLM(body: ReqBody): Promise<{ tracks: TrackOut[] } | null> {
  const key = process.env.GROQ_API_KEY;
  console.log("Groq API key status:", key ? "Defined" : "Undefined");
  if (!key) return null;
  const prompt = `You are powering a Spotify-style Discover Weekly prototype.

Generate exactly 10 real songs based on the user's weekly preference and selected Discovery Level.

Discovery Level: ${body.discoveryLevel}
Weekly Preference: ${body.weeklyPreference || "(none)"}

Rules:
- Return real songs only.
- Include song name, artist name, album name.
- Match the user's preference as closely as possible.
- If Discovery Level is Familiar, choose more popular and accessible tracks.
- If Discovery Level is Balanced, mix familiar and lesser-known tracks.
- If Discovery Level is Exploratory, choose more niche, emerging, or unexpected tracks.
- For each song, include a short "reason" (max 12 words) why it fits.
- Return valid JSON only. No prose. Shape:
{"tracks":[{"id":"1","name":"","artist":"","album":"","image":"","reason":""}]}`;

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
      }),
    });
    if (!res.ok) {
      console.error("Groq API response not OK:", res.status);
      return null;
    }
    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content) return null;
    const parsed = JSON.parse(content);
    const tracks = Array.isArray(parsed?.tracks) ? parsed.tracks : [];
    if (tracks.length === 0) return null;
    const normalized: TrackOut[] = tracks.slice(0, 10).map((t: Record<string, unknown>, i: number) => {
      const id = String(t.id ?? i + 1);
      return {
        id,
        name: String(t.name ?? "Untitled"),
        artist: String(t.artist ?? "Unknown"),
        album: String(t.album ?? ""),
        image: `https://picsum.photos/seed/song-${id}-${body.discoveryLevel}-${i}/300/300`,
        reason: String(t.reason ?? ""),
      };
    });
    return { tracks: normalized };
  } catch (error) {
    console.error("Groq API call caught error:", error);
    return null;
  }
}

export const Route = createFileRoute("/api/recommendations")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: ReqBody;
        try {
          body = await request.json();
        } catch {
          return Response.json(fallback("balanced"));
        }
        const level: DiscoveryLevel =
          body.discoveryLevel === "familiar" ||
          body.discoveryLevel === "exploratory" ||
          body.discoveryLevel === "balanced"
            ? body.discoveryLevel
            : "balanced";
        const result = await callLLM({ discoveryLevel: level, weeklyPreference: body.weeklyPreference ?? "" });
        return Response.json(result ?? fallback(level));
      },
    },
  },
});

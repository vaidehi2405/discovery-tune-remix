import { useEffect, useState } from "react";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Download, MoreHorizontal, Pause, Pencil, Play, Plus, Shuffle, Speaker } from "lucide-react";
import { PhoneFrame } from "@/components/discovery/PhoneFrame";
import { DiscoveryBadge } from "@/components/discovery/DiscoveryBadge";
import { PlaylistTrack } from "@/components/discovery/PlaylistTrack";
import { FeedbackModal } from "@/components/discovery/FeedbackModal";
import { SuccessCard } from "@/components/discovery/SuccessCard";
import { TrackActionsSheet } from "@/components/discovery/TrackActionsSheet";
import { AddToPlaylistSheet } from "@/components/discovery/AddToPlaylistSheet";
import { InPhoneToast } from "@/components/discovery/InPhoneToast";
import { CoachMark } from "@/components/discovery/CoachMark";
import {
  markGenerated,
  toggleVault,
  useDiscoveryLevel,
  useGeneratedTracks,
  useVault,
} from "@/hooks/useDiscoveryStore";
import { generatePlaylist, submitFeedback } from "@/services/discovery";
import { hasClientNavigated } from "@/lib/nav-flag";
import { useWalkthrough, walkthroughFinish, walkthroughSkip, walkthroughBack } from "@/lib/walkthrough";
import type { FeedbackPayload, Track } from "@/types/discovery";

export const Route = createFileRoute("/discovery/playlist")({
  beforeLoad: () => {
    if (!hasClientNavigated()) throw redirect({ to: "/" });
  },
  head: () => ({
    meta: [
      { title: "Discover Weekly" },
      { name: "description", content: "Your personalized Discover Weekly playlist." },
    ],
  }),
  loader: async (): Promise<{ tracks: Track[] }> => {
    const tracks = await generatePlaylist("balanced");
    return { tracks };
  },
  component: PlaylistPage,
});

function PlaylistPage() {
  const { tracks: fallbackTracks } = Route.useLoaderData() as { tracks: Track[] };
  const generated = useGeneratedTracks();
  const tracks = generated && generated.length > 0 ? generated : fallbackTracks;
  const level = useDiscoveryLevel();
  const vault = useVault();
  const navigate = useNavigate();
  const [playingId, setPlayingId] = useState<string>(tracks[0]?.id ?? "");

  const [dislikeTrack, setDislikeTrack] = useState<Track | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [moreTrack, setMoreTrack] = useState<Track | null>(null);
  const [addTrack, setAddTrack] = useState<Track | null>(null);
  const [likedIds, setLikedIds] = useState<Set<string>>(() => new Set());
  const [toast, setToast] = useState<string | null>(null);
  const [toastSub, setToastSub] = useState<string | null>(null);

  const wt = useWalkthrough();
  const isStep4 = wt.active && wt.step === 4;

  // Auto-open More menu for the first track during walkthrough step 4
  useEffect(() => {
    if (isStep4 && tracks.length > 0 && !moreTrack) {
      const timer = setTimeout(() => setMoreTrack(tracks[0]), 400);
      return () => clearTimeout(timer);
    }
  }, [isStep4, tracks, moreTrack]);

  // Mark generated once user reaches the playlist screen so subsequent
  // visits skip the level picker.
  useEffect(() => {
    markGenerated();
  }, []);

  const playing = tracks.find((t) => t.id === playingId) ?? tracks[0];

  const handleSubmitFeedback = async (payload: FeedbackPayload) => {
    await submitFeedback(payload);
    setDislikeTrack(null);
    setShowSuccess(true);
  };

  const handleSaveVault = (t: Track) => {
    const nowSaved = toggleVault(t.id);
    setMoreTrack(null);
    setToast(nowSaved ? "Saved to Discovery Vault" : "Removed from Discovery Vault");
    if (nowSaved) {
      setToastSub("For songs you want to revisit later.");
    } else {
      setToastSub(null);
    }
  };

  const handleAddToPlaylist = (name: string) => {
    setAddTrack(null);
    setToast(`Added to ${name}`);
  };

  const handleLike = (t: Track) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(t.id)) {
        next.delete(t.id);
        setToast("Removed from Liked Songs");
      } else {
        next.add(t.id);
        setToast("Added to Liked Songs");
      }
      return next;
    });
  };

  return (
    <PhoneFrame>
      <div className="flex flex-col min-h-full pb-32">
        {/* Top bar */}
        <header className="px-5 pt-4 pb-2 flex items-center justify-between">
          <button
            onClick={() => navigate({ to: "/" })}
            className="p-1 -ml-1 text-foreground"
            aria-label="Back"
          >
            <ArrowLeft className="size-6" />
          </button>
          <span className="text-sm font-semibold">Discover Weekly</span>
          <button className="p-1 -mr-1 text-foreground" aria-label="More">
            <MoreHorizontal className="size-6" />
          </button>
        </header>

        {/* Cover */}
        <div className="px-5 pt-6 flex justify-center">
          <div
            className="relative size-56 rounded-2xl shadow-2xl flex flex-col justify-end p-5 overflow-hidden"
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

            <div className="relative text-white z-10">
              <p className="text-[11px] font-semibold uppercase tracking-widest opacity-80">
                Made for You
              </p>
              <h1 className="text-2xl font-extrabold leading-none mt-1">
                Discover
                <br />
                Weekly
              </h1>
            </div>
          </div>
        </div>

        {/* Metadata */}
        <div className="px-5 mt-5">
          <p className="text-sm text-muted-foreground">Made for You</p>
          <p className="text-sm text-muted-foreground mt-1">Fresh picks, inspired by your taste.</p>
          <button
            type="button"
            onClick={() => navigate({ to: "/discovery/level" })}
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-white/[0.07] hover:bg-white/[0.10] active:scale-[0.98] transition px-3 py-1.5"
            aria-label="Edit discovery level"
          >
            <DiscoveryBadge level={level} size="sm" />
            <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-foreground/90">
              <Pencil className="size-3" />
              Edit
            </span>
          </button>
          <p className="text-xs text-muted-foreground mt-1">
            {tracks.length} songs · 3h 12m
          </p>
        </div>

        {/* Controls */}
        <div className="px-5 mt-4 flex items-center justify-between">
          <div className="flex items-center gap-5 text-muted-foreground">
            <button className="hover:text-foreground transition-colors" aria-label="Add">
              <Plus className="size-6" />
            </button>
            <button className="hover:text-foreground transition-colors" aria-label="Download">
              <Download className="size-6" />
            </button>
            <button className="hover:text-foreground transition-colors" aria-label="More">
              <MoreHorizontal className="size-6" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-primary" aria-label="Shuffle">
              <Shuffle className="size-5" />
            </button>
            <button
              className="size-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-xl active:scale-95 transition"
              aria-label="Play"
              onClick={() => setPlayingId(playing?.id ?? "")}
            >
              <Play className="size-5 fill-current ml-0.5" />
            </button>
          </div>
        </div>

        {/* Tracks */}
        <div className="px-3 mt-4">
          {tracks.map((t) => (
            <PlaylistTrack
              key={t.id}
              track={t}
              playing={t.id === playing?.id}
              saved={vault.includes(t.id)}
              liked={likedIds.has(t.id)}
              onLike={() => handleLike(t)}
              onMore={() => setMoreTrack(t)}
            />
          ))}
        </div>

        {/* Now playing bar */}
        {playing && (
          <div className="fixed md:absolute bottom-0 inset-x-0 px-3 pb-3">
            <div className="mx-auto max-w-[420px] rounded-lg bg-[#3a2b2b] flex items-center gap-3 p-2.5 shadow-2xl">
              <div
                className="size-10 rounded-md shrink-0 overflow-hidden bg-cover bg-center"
                style={
                  playing.image
                    ? { backgroundImage: `url(${playing.image})` }
                    : { background: playing.coverGradient }
                }
              />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-foreground truncate">{playing.title}</p>
                <p className="text-[11px] text-muted-foreground truncate">{playing.artist}</p>
              </div>
              <button className="text-foreground" aria-label="Devices">
                <Speaker className="size-4" />
              </button>
              <button className="text-foreground p-1" aria-label="Pause">
                <Pause className="size-5 fill-current" />
              </button>
            </div>
          </div>
        )}
      </div>

      <FeedbackModal
        open={dislikeTrack !== null}
        track={dislikeTrack}
        onClose={() => setDislikeTrack(null)}
        onSubmit={handleSubmitFeedback}
      />
      <TrackActionsSheet
        open={moreTrack !== null}
        track={moreTrack}
        saved={moreTrack ? vault.includes(moreTrack.id) : false}
        onClose={() => setMoreTrack(null)}
        onSave={() => moreTrack && handleSaveVault(moreTrack)}
        onAdd={() => {
          const t = moreTrack;
          setMoreTrack(null);
          setAddTrack(t);
        }}
        onDislike={() => {
          const t = moreTrack;
          setMoreTrack(null);
          setDislikeTrack(t);
        }}
      />
      <AddToPlaylistSheet
        open={addTrack !== null}
        track={addTrack}
        onClose={() => setAddTrack(null)}
        onSelect={handleAddToPlaylist}
      />
      <InPhoneToast message={toast} subtext={toastSub} onDone={() => { setToast(null); setToastSub(null); }} />
      {showSuccess && (
        <SuccessCard level={level} onContinue={() => setShowSuccess(false)} />
      )}

      {/* Walkthrough Step 4/4 */}
      <CoachMark
        show={isStep4}
        step={4}
        totalSteps={4}
        title="Shape future recommendations"
        body="Like, save to Vault, add to playlist, or dislike — each action teaches Spotify what worked and what missed."
        cta="Finish"
        onNext={() => { setMoreTrack(null); walkthroughFinish(); }}
        onSkip={() => { setMoreTrack(null); walkthroughSkip(); }}
        onBack={() => { setMoreTrack(null); walkthroughBack(); navigate({ to: "/discovery/level" }); }}
        position="above"
      />
    </PhoneFrame>
  );
}
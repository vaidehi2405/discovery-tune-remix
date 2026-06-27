import { Plus, Search } from "lucide-react";
import { BottomSheet } from "./BottomSheet";
import { USER_PLAYLISTS } from "@/services/discovery";
import type { Track } from "@/types/discovery";

export function AddToPlaylistSheet({
  track,
  open,
  onClose,
  onSelect,
}: {
  track: Track | null;
  open: boolean;
  onClose: () => void;
  onSelect: (playlistName: string) => void;
}) {
  return (
    <BottomSheet open={open} onClose={onClose} heightClass="max-h-[72%]">
      <div className="px-5 pt-1 pb-2 shrink-0">
        <h2 className="text-[18px] font-extrabold text-foreground tracking-tight">Add to playlist</h2>
        {track && (
          <p className="text-[12px] text-muted-foreground mt-0.5 truncate">
            {track.title} · {track.artist}
          </p>
        )}
      </div>
      <div className="px-5 pb-2 shrink-0">
        <div className="flex items-center gap-2 rounded-lg bg-white/[0.06] px-3 py-2">
          <Search className="size-4 text-muted-foreground" />
          <span className="text-[13px] text-muted-foreground">Find a playlist</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar px-3 pb-4">
        <button
          type="button"
          onClick={() => onSelect("New Playlist")}
          className="w-full flex items-center gap-3 px-2 py-2 rounded-lg active:bg-white/[0.04] transition-colors"
        >
          <span className="size-12 rounded-md shrink-0 bg-white/[0.08] flex items-center justify-center">
            <Plus className="size-5 text-foreground" />
          </span>
          <span className="text-[15px] font-semibold text-foreground">New playlist</span>
        </button>
        {USER_PLAYLISTS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => onSelect(p.name)}
            className="w-full flex items-center gap-3 px-2 py-2 rounded-lg active:bg-white/[0.04] transition-colors"
          >
            <span
              className="size-12 rounded-md shrink-0 shadow"
              style={{ background: p.gradient }}
            />
            <span className="min-w-0 text-left">
              <span className="block text-[15px] font-semibold text-foreground truncate">
                {p.name}
              </span>
              <span className="block text-[12px] text-muted-foreground">Playlist</span>
            </span>
          </button>
        ))}
      </div>
    </BottomSheet>
  );
}
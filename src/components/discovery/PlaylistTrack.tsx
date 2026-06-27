import { Heart, MoreHorizontal, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Track } from "@/types/discovery";

export function PlaylistTrack({
  track,
  playing,
  saved,
  liked,
  onMore,
  onLike,
}: {
  track: Track;
  playing?: boolean;
  saved?: boolean;
  liked?: boolean;
  onMore: () => void;
  onLike: () => void;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-2 py-2 rounded-lg transition-colors group",
        playing ? "bg-white/5" : "hover:bg-white/5",
      )}
    >
      <div
        className="size-12 rounded-md shrink-0 shadow relative overflow-hidden"
        style={track.image ? undefined : { background: track.coverGradient }}
      >
        {track.image && (
          <img
            src={track.image}
            alt=""
            loading="lazy"
            className="absolute inset-0 size-full object-cover"
          />
        )}
        {saved && (
          <span className="absolute -top-1 -right-1 size-4 rounded-full bg-primary flex items-center justify-center shadow ring-2 ring-background z-10">
            <Star className="size-2.5 text-primary-foreground fill-current" />
          </span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "text-[15px] font-medium truncate",
            playing ? "text-primary" : "text-foreground",
          )}
        >
          {track.title}
        </p>
        <p className="text-[13px] text-muted-foreground truncate">
          {track.artist}
          {track.album ? ` • ${track.album}` : ""}
        </p>
      </div>
      <button
        type="button"
        onClick={onLike}
        aria-label={liked ? `Unlike ${track.title}` : `Like ${track.title}`}
        className={cn(
          "p-2 rounded-full transition-colors",
          liked
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground hover:bg-white/10",
        )}
      >
        <Heart className={cn("size-4", liked && "fill-current")} />
      </button>
      <button
        type="button"
        onClick={onMore}
        aria-label={`More options for ${track.title}`}
        className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
      >
        <MoreHorizontal className="size-5" />
      </button>
    </div>
  );
}
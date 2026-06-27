import { Music2, Star, Plus, ThumbsDown } from "lucide-react";
import { BottomSheet } from "./BottomSheet";
import { cn } from "@/lib/utils";
import type { Track } from "@/types/discovery";

export function TrackActionsSheet({
  track,
  open,
  saved,
  onClose,
  onSave,
  onAdd,
  onDislike,
}: {
  track: Track | null;
  open: boolean;
  saved: boolean;
  onClose: () => void;
  onSave: () => void;
  onAdd: () => void;
  onDislike: () => void;
}) {
  if (!track) return null;

  const Row = ({
    icon,
    label,
    sub,
    onClick,
    active,
  }: {
    icon: React.ReactNode;
    label: string;
    sub?: string;
    onClick: () => void;
    active?: boolean;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className="w-full min-h-14 flex items-center gap-4 px-5 rounded-lg text-left active:bg-white/[0.04] transition-colors"
    >
      <span className={cn("size-6 flex items-center justify-center", active ? "text-primary" : "text-foreground/90")}>
        {icon}
      </span>
      <span className="flex-1 min-w-0">
        <span className={cn("block text-[15px]", active ? "text-primary font-semibold" : "text-foreground")}>
          {label}
        </span>
        {sub && <span className="block text-[12px] text-muted-foreground">{sub}</span>}
      </span>
    </button>
  );

  return (
    <BottomSheet open={open} onClose={onClose} heightClass="max-h-[58%]">
      <div className="px-5 pt-1 pb-3 shrink-0 flex items-center gap-3">
        <div
          className="size-12 rounded-md shrink-0 flex items-center justify-center shadow"
          style={{ background: track.coverGradient }}
        >
          <Music2 className="size-4 text-white/85" />
        </div>
        <div className="min-w-0">
          <p className="text-[15px] font-semibold text-foreground truncate">{track.title}</p>
          <p className="text-[12px] text-muted-foreground truncate">{track.artist}</p>
        </div>
      </div>
      <div className="border-t border-white/[0.06]" />
      <div className="py-2">
        <Row
          icon={<Star className={cn("size-5", saved && "fill-current")} strokeWidth={2} />}
          label={saved ? "Saved to Discovery Vault" : "Save to Discovery Vault"}
          sub="Revisit later without liking it"
          onClick={onSave}
          active={saved}
        />
        <Row
          icon={<Plus className="size-5" />}
          label="Add to playlist"
          onClick={onAdd}
        />
        <Row
          icon={<ThumbsDown className="size-5" />}
          label="Don't recommend this song"
          sub="Tell us why so we can do better"
          onClick={onDislike}
        />
      </div>
    </BottomSheet>
  );
}
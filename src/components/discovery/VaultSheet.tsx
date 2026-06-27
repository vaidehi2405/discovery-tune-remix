import { Star, Music2 } from "lucide-react";
import { BottomSheet } from "./BottomSheet";
import { useVault } from "@/hooks/useDiscoveryStore";
import { getTrackById } from "@/services/discovery";

export function VaultSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const vault = useVault();
  const tracks = vault.map(getTrackById).filter(Boolean);

  return (
    <BottomSheet open={open} onClose={onClose} heightClass="max-h-[78%]">
      <div className="px-5 pt-1 pb-3 shrink-0 flex items-center gap-3">
        <div
          className="size-14 rounded-xl shrink-0 flex items-center justify-center shadow"
          style={{ background: "linear-gradient(135deg,#fbbf24,#7c2d12)" }}
        >
          <Star className="size-6 text-white fill-white" />
        </div>
        <div className="min-w-0">
          <h2 className="text-[18px] font-extrabold text-foreground leading-tight">
            Discovery Vault
          </h2>
          <p className="text-[12px] text-muted-foreground truncate">
            Songs you wanted to revisit · {tracks.length} {tracks.length === 1 ? "song" : "songs"}
          </p>
        </div>
      </div>
      <div className="border-t border-white/[0.06]" />
      <div className="flex-1 overflow-y-auto no-scrollbar px-3 py-2">
        {tracks.length === 0 ? (
          <div className="px-3 py-10 text-center">
            <p className="text-[14px] font-semibold text-foreground">Nothing saved yet</p>
            <p className="text-[12px] text-muted-foreground mt-1 leading-snug">
              Tap the ⋯ on any song in Discover Weekly and choose
              <br />
              <span className="text-foreground/80">Save to Discovery Vault</span>.
            </p>
          </div>
        ) : (
          tracks.map((t) => (
            <div
              key={t!.id}
              className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <div
                className="size-11 rounded-md shrink-0 flex items-center justify-center shadow"
                style={{ background: t!.coverGradient }}
              >
                <Music2 className="size-4 text-white/85" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-medium text-foreground truncate">{t!.title}</p>
                <p className="text-[12px] text-muted-foreground truncate">{t!.artist}</p>
              </div>
              <Star className="size-4 text-primary fill-primary shrink-0" />
            </div>
          ))
        )}
      </div>
    </BottomSheet>
  );
}
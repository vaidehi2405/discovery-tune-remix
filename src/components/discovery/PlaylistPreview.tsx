import type { Track } from "@/types/discovery";

export function PlaylistPreview({ tracks }: { tracks: Track[] }) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Playlist preview
      </p>
      <div className="grid grid-cols-3 gap-3">
        {tracks.map((t) => (
          <div key={t.id} className="space-y-2 animate-fade-up">
            <div
              className="aspect-square rounded-lg shadow-lg"
              style={
                t.image
                  ? { backgroundImage: `url('${t.image}')`, backgroundSize: "cover", backgroundPosition: "center" }
                  : { background: t.coverGradient }
              }
            />
            <div className="space-y-0.5 min-w-0">
              <p className="text-xs font-medium text-foreground truncate">{t.title}</p>
              <p className="text-[11px] text-muted-foreground truncate">{t.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
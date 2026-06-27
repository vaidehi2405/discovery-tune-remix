import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const PHONE_W = 390;
const PHONE_H = 844;

/**
 * Renders the app inside a realistic iPhone (Dynamic Island) frame.
 * The device is uniformly scaled so the whole phone is always visible
 * and centered, both on mobile and desktop. Internal content scrolls
 * within the phone's viewport; the page itself does not scroll.
 */
export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const compute = () => {
      const padding = window.innerWidth < 640 ? 16 : 48;
      const sw = (window.innerWidth - padding * 2) / PHONE_W;
      const sh = (window.innerHeight - padding * 2) / PHONE_H;
      setScale(Math.min(sw, sh, 1.15));
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return (
    <div
      className="fixed inset-0 overflow-hidden flex items-center justify-center bg-white"
    >

      <div
        style={{
          width: PHONE_W,
          height: PHONE_H,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
        className="relative shrink-0"
      >
        {/* Outer titanium bezel */}
        <div
          className="absolute inset-0 rounded-[55px] shadow-2xl"
          style={{
            background:
              "linear-gradient(145deg, #2a2a2c 0%, #1a1a1c 40%, #3a3a3c 100%)",
            boxShadow:
              "0 50px 100px -20px rgba(0,0,0,0.8), 0 30px 60px -30px rgba(0,0,0,0.9), inset 0 0 0 1px rgba(255,255,255,0.06)",
          }}
        />
        {/* Inner bezel ring */}
        <div className="absolute inset-[3px] rounded-[52px] bg-black" />

        {/* Side buttons */}
        <div className="absolute -left-[2px] top-[110px] w-[3px] h-[32px] rounded-l-sm bg-[#3a3a3c]" />
        <div className="absolute -left-[2px] top-[170px] w-[3px] h-[60px] rounded-l-sm bg-[#3a3a3c]" />
        <div className="absolute -left-[2px] top-[245px] w-[3px] h-[60px] rounded-l-sm bg-[#3a3a3c]" />
        <div className="absolute -right-[2px] top-[200px] w-[3px] h-[100px] rounded-r-sm bg-[#3a3a3c]" />

        {/* Screen */}
        <div
          className={cn(
            "absolute inset-[12px] rounded-[44px] overflow-hidden bg-background",
            className,
          )}
        >
          {/* Status bar */}
          <div className="absolute top-0 inset-x-0 h-[54px] z-50 pointer-events-none flex items-center justify-between px-8 text-[15px] font-semibold text-foreground">
            <span className="tabular-nums">9:41</span>
            <span className="flex items-center gap-1.5">
              {/* signal */}
              <svg width="18" height="11" viewBox="0 0 18 11" fill="currentColor">
                <rect x="0" y="7" width="3" height="4" rx="0.5" />
                <rect x="5" y="5" width="3" height="6" rx="0.5" />
                <rect x="10" y="2" width="3" height="9" rx="0.5" />
                <rect x="15" y="0" width="3" height="11" rx="0.5" />
              </svg>
              {/* wifi */}
              <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor">
                <path d="M8 10.5a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4zM3.4 6.2a6.5 6.5 0 019.2 0l1.1-1.1a8 8 0 00-11.4 0l1.1 1.1zM0 2.8a11 11 0 0116 0L14.9 3.9a9.5 9.5 0 00-13.8 0L0 2.8z" />
              </svg>
              {/* battery */}
              <span className="relative inline-block w-[26px] h-[12px] rounded-[3px] border border-current opacity-90">
                <span className="absolute inset-[1.5px] rounded-[1.5px] bg-current" />
                <span className="absolute -right-[3px] top-[3px] w-[1.5px] h-[6px] rounded-r bg-current" />
              </span>
            </span>
          </div>

          {/* Dynamic Island */}
          <div className="absolute top-[11px] left-1/2 -translate-x-1/2 w-[122px] h-[37px] rounded-full bg-black z-[60] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]" />

          {/* Scrollable content (not positioned, so consumer's `absolute` attaches to the screen) */}
          <div className="h-full pt-[54px] overflow-y-auto overflow-x-hidden no-scrollbar">
            {children}
          </div>

          {/* Home indicator */}
          <div className="absolute bottom-[6px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] rounded-full bg-white/90 z-[60] pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function InPhoneToast({
  message,
  subtext,
  onDone,
  duration = 2000,
}: {
  message: string | null;
  subtext?: string | null;
  onDone: () => void;
  duration?: number;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!message) return;
    setVisible(true);
    const showTime = subtext ? duration + 800 : duration;
    const out = setTimeout(() => setVisible(false), showTime - 220);
    const done = setTimeout(onDone, showTime);
    return () => {
      clearTimeout(out);
      clearTimeout(done);
    };
  }, [message, subtext, duration, onDone]);

  if (!message) return null;

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-24 z-[70] flex justify-center px-4">
      <div
        className={cn(
          "px-4 py-2.5 bg-white text-black text-[13px] font-semibold shadow-2xl text-center",
          subtext ? "rounded-xl" : "rounded-full",
          "transition-all duration-200 ease-out",
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
        )}
      >
        {message}
        {subtext && (
          <p className="text-[11px] font-normal text-black/60 mt-0.5">{subtext}</p>
        )}
      </div>
    </div>
  );
}
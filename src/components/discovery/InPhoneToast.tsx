import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function InPhoneToast({
  message,
  onDone,
  duration = 2000,
}: {
  message: string | null;
  onDone: () => void;
  duration?: number;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!message) return;
    setVisible(true);
    const out = setTimeout(() => setVisible(false), duration - 220);
    const done = setTimeout(onDone, duration);
    return () => {
      clearTimeout(out);
      clearTimeout(done);
    };
  }, [message, duration, onDone]);

  if (!message) return null;

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-24 z-[70] flex justify-center px-4">
      <div
        className={cn(
          "px-4 py-2.5 rounded-full bg-white text-black text-[13px] font-semibold shadow-2xl",
          "transition-all duration-200 ease-out",
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
        )}
      >
        {message}
      </div>
    </div>
  );
}
import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function BottomSheet({
  open,
  onClose,
  children,
  heightClass = "max-h-[75%]",
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  heightClass?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    } else if (mounted) {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(t);
    }
  }, [open, mounted]);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 z-50">
      <button
        aria-label="Close"
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-black/65 backdrop-blur-[2px] transition-opacity duration-300",
          visible ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "absolute inset-x-0 bottom-0 bg-[#1c1c1c] rounded-t-[24px] shadow-[0_-20px_50px_-10px_rgba(0,0,0,0.6)]",
          "flex flex-col will-change-transform",
          "transition-transform duration-[320ms]",
          heightClass,
          visible ? "translate-y-0" : "translate-y-full",
        )}
        style={{
          transitionTimingFunction: visible
            ? "cubic-bezier(0.22, 1, 0.36, 1)"
            : "cubic-bezier(0.4, 0, 1, 1)",
        }}
      >
        <div className="flex justify-center pt-2.5 pb-1 shrink-0">
          <div className="h-1 w-9 rounded-full bg-white/25" />
        </div>
        {children}
      </div>
    </div>
  );
}
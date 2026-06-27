import { useEffect, useState } from "react";

export function LoadingMessage({ messages, intervalMs = 1200 }: { messages: string[]; intervalMs?: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % messages.length), intervalMs);
    return () => clearInterval(id);
  }, [messages.length, intervalMs]);
  return (
    <div className="h-6 relative overflow-hidden">
      <p
        key={i}
        className="absolute inset-x-0 text-sm text-muted-foreground text-center animate-fade-up"
      >
        {messages[i]}
      </p>
    </div>
  );
}
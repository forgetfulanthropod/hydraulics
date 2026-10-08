import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { BRAINS } from "@/data/brains";

export function BrainModal({ partId, onClose }: { partId: string; onClose: () => void }) {
  const brain = BRAINS[partId];
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  if (!brain) return null;

  return (
    <div className="fixed inset-0 z-50 flex bg-black/70" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="brain-title"
        className="flex h-full w-full min-w-0 flex-col bg-bg"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-line px-4 py-3">
          <div className="min-w-0">
            <p className="text-xs tracking-widest text-amber uppercase">Types</p>
            <h2 id="brain-title" className="font-display text-2xl tracking-wide text-fg">
              {brain.title}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center border border-line text-fg"
            aria-label="Close"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
          <p className="text-sm leading-relaxed text-muted">{brain.note}</p>
          <ul className="mt-4 flex flex-col gap-3">
            {brain.types.map((row) => (
              <li key={row.type} className="border border-line bg-surface px-3 py-3">
                <p className="text-sm font-medium text-fg">{row.type}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{row.use}</p>
                <p className="mt-3 text-xs tracking-widest text-amber uppercase">Rating range</p>
                <p className="mt-1 text-sm leading-relaxed text-fg">{row.range}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

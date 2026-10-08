import { createFileRoute } from "@tanstack/react-router";
import { HISTORY } from "@/data/history";

export const Route = createFileRoute("/history")({ component: HistoryPage });

function HistoryPage() {
  return (
    <main className="px-4 py-5 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-2xl tracking-wide text-fg">History of hydraulics</h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
          From a sentence about pressure to a hose on an excavator. Twelve stops. The circuit on the front page is the 1990s one.
        </p>
        <ol className="mt-6 border-l border-line">
          {HISTORY.map((beat) => (
            <li key={beat.year} className="py-4 pl-5">
              <p className="font-display text-xl leading-none text-amber">{beat.year}</p>
              <h2 className="mt-2 text-base font-semibold text-fg">{beat.title}</h2>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted">{beat.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}

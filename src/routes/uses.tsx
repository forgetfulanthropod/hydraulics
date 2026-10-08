import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { USES } from "@/data/uses";

const useCount = USES.reduce((sum, group) => sum + group.items.length, 0);

export const Route = createFileRoute("/uses")({ component: UsesPage });

function UsesPage() {
  const [group, setGroup] = useState(USES[0].id);
  const [query, setQuery] = useState("");
  const active = USES.find((item) => item.id === group) ?? USES[0];
  const q = query.trim().toLowerCase();

  const shown = useMemo(() => {
    const source = q ? USES : [active];
    let n = q ? 0 : USES.slice(0, USES.indexOf(active)).reduce((sum, item) => sum + item.items.length, 0);
    return source.flatMap((section) => {
      const items = section.items
        .map((item) => {
          n += 1;
          return { ...item, n, section: section.title };
        })
        .filter((item) => !q || `${item.title} ${item.line} ${item.section}`.toLowerCase().includes(q));
      return items;
    });
  }, [active, q]);

  return (
    <main className="px-4 py-5 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-2xl tracking-wide text-fg">{useCount} modern use cases</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          The same circuit, out in the world. A pump, a valve, and something that has to move. {useCount} places that still choose oil.
        </p>
        <label className="mt-4 block">
          <span className="sr-only">Search use cases</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search the list"
            className="min-h-11 w-full border border-line bg-surface px-3 text-sm text-fg outline-none placeholder:text-muted focus:border-amber"
          />
        </label>
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {USES.map((item) => {
            const on = !q && item.id === active.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={on}
                onClick={() => {
                  setQuery("");
                  setGroup(item.id);
                }}
                className={`min-h-11 shrink-0 border px-3 text-sm ${
                  on ? "border-amber bg-amber text-amber-ink" : "border-line text-fg"
                }`}
              >
                {item.title}
              </button>
            );
          })}
        </div>
        {!q && <p className="mt-4 text-sm text-muted">{active.note}</p>}
        <ol className="mt-3 flex flex-col gap-2">
          {shown.map((item) => (
            <li key={`${item.section}-${item.title}`} className="border border-line bg-surface px-3 py-3">
              <p className="text-sm font-medium text-fg">
                <span className="font-display mr-2 text-amber">{String(item.n).padStart(3, "0")}</span>
                {item.title}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{item.line}</p>
              {q && <p className="mt-1 text-xs tracking-wide text-amber uppercase">{item.section}</p>}
            </li>
          ))}
        </ol>
        {shown.length === 0 && <p className="mt-4 text-sm text-muted">Nothing in the list matches that.</p>}
      </div>
    </main>
  );
}

import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { USES } from "@/data/uses";

const useCount = USES.reduce((sum, group) => sum + group.items.length, 0);

const NAV = [
  { to: "/faults", label: "Ten common faults" },
  { to: "/uses", label: `${useCount} modern use cases` },
  { to: "/history", label: "History of hydraulics" },
  { to: "/quiz", label: "Quiz" },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (state) => state.location.pathname });

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <div className="h-1 bg-amber" />
      <header className="px-4 pt-4 pb-3 lg:px-8">
        <div className="flex items-baseline justify-between gap-4">
          <Link to="/" className="font-display text-3xl leading-none tracking-wide text-fg">
            HYDRAULICS
          </Link>
          <p className="text-xs tracking-widest text-amber uppercase">Fluid power</p>
        </div>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
          The circuit first. Then the failures, the machines, and where it came from.
        </p>
      </header>
      <nav aria-label="Sections" className="mode-bar sticky z-30 border-y border-line bg-bg">
        <div className="flex gap-2 overflow-x-auto px-4 py-3 lg:px-8">
          {NAV.map((item) => {
            const on = path === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={on ? "page" : undefined}
                className={`inline-flex min-h-11 shrink-0 items-center border px-3 text-sm font-medium ${
                  on ? "border-amber bg-raised text-fg" : "border-line bg-surface text-fg"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
      {children}
    </div>
  );
}

import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Ban,
  Check,
  CircleDot,
  CircleOff,
  Copy,
  Filter,
  Gauge,
  MoveRight,
  RotateCcw,
  Thermometer,
} from "lucide-react";
import {
  isValidPath,
  modes,
  pathTo,
  type FaultNode,
  type Kind,
  type Mode,
  type ModeIcon,
} from "@/data/modes";
import { CircuitMap } from "@/components/schematic";

const STORAGE_KEY = "ten-faults-v2";
const VIDEO = "https://www.youtube.com/watch?v=3ewhga8iHak";

const ICONS: Record<ModeIcon, typeof Gauge> = {
  gauge: Gauge,
  retract: ArrowLeft,
  extend: ArrowRight,
  dead: Ban,
  gland: CircleDot,
  slow: Filter,
  down: ArrowDown,
  forward: MoveRight,
  nopressure: CircleOff,
  hot: Thermometer,
};

function kicker(kind: Kind) {
  if (kind === "fault") return "Fault";
  if (kind === "ruleout") return "Rule out";
  return "Check";
}

function kickerClass(kind: Kind) {
  if (kind === "fault") return "text-oxide";
  if (kind === "ruleout") return "text-muted";
  return "text-amber";
}

export function FaultApp() {
  const [modeId, setModeId] = useState(modes[0].id);
  const [path, setPath] = useState<string[]>([modes[0].root]);
  const [walked, setWalked] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [copied, setCopied] = useState(false);

  const mode = modes.find((item) => item.id === modeId) ?? modes[0];
  const activePath = isValidPath(mode, path) ? path : [mode.root];
  const tip = mode.nodes[activePath[activePath.length - 1]];

  useEffect(() => {
    try {
      const query = new URLSearchParams(window.location.search).get("m");
      const queried = modes.find((item) => item.id === query);
      const raw = localStorage.getItem(STORAGE_KEY);
      if (queried) {
        setModeId(queried.id);
        setPath([queried.root]);
      }
      if (raw) {
        const saved = JSON.parse(raw) as {
          modeId?: string;
          path?: string[];
          walked?: string[];
        };
        if (!queried) {
          const nextMode = modes.find((item) => item.id === saved.modeId) ?? modes[0];
          const nextPath =
            Array.isArray(saved.path) && isValidPath(nextMode, saved.path)
              ? saved.path
              : [nextMode.root];
          setModeId(nextMode.id);
          setPath(nextPath);
        }
        if (Array.isArray(saved.walked)) {
          setWalked(saved.walked.filter((id) => modes.some((item) => item.id === id)));
        }
      }
    } catch {
      /* keep defaults */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ modeId, path, walked }));
  }, [modeId, path, walked, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    if (tip.kind === "ask") return;
    setWalked((prev) => (prev.includes(mode.id) ? prev : [...prev, mode.id]));
  }, [hydrated, tip, mode.id]);

  function chooseMode(next: Mode) {
    setCopied(false);
    setModeId(next.id);
    setPath([next.root]);
  }

  function openFromCircuit(id: string) {
    const next = modes.find((item) => item.id === id);
    if (!next || next.id === mode.id) return;
    chooseMode(next);
    requestAnimationFrame(() => {
      document.getElementById("fault-tree")?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    });
  }

  function pick(id: string) {
    setCopied(false);
    const next = pathTo(mode, id);
    setPath(next);
    requestAnimationFrame(() => {
      document.getElementById(`node-${id}`)?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    });
  }

  async function copyFinding() {
    const lines = [
      `Ten Faults · ${mode.n} ${mode.title}`,
      ...activePath.map((id, index) => {
        const node = mode.nodes[id];
        return `${index + 1}. ${node.title}`;
      }),
    ];
    if (tip.action) lines.push("", tip.action);
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div>
      <header className="px-4 pt-4 pb-4 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl tracking-wide text-fg">Ten common faults</h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
              Pick the symptom. Each branch ends at the part you change.
            </p>
          </div>
          <p className="shrink-0 font-display text-2xl leading-none text-amber">
            {walked.length}
            <span className="text-muted">/10</span>
          </p>
        </div>
      </header>

      <div className="lg:flex lg:items-start">
        <nav
          aria-label="Failure modes"
          className="mode-bar-under sticky z-20 border-y border-line bg-bg lg:max-h-dvh lg:w-72 lg:shrink-0 lg:overflow-y-auto lg:border-y-0 lg:border-r"
        >
          <div className="flex gap-2 overflow-x-auto px-4 py-3 lg:flex-col lg:overflow-visible lg:px-3 lg:py-4">
          {modes.map((item) => {
            const active = item.id === mode.id;
            const done = walked.includes(item.id);
            const Icon = ICONS[item.icon];
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                onClick={() => chooseMode(item)}
                className={`flex min-h-11 shrink-0 snap-start items-center gap-3 border px-3 py-2 text-left motion-safe:transition-colors lg:w-full ${
                  active
                    ? "border-amber bg-raised"
                    : "border-line bg-surface hover:border-amber lg:border-transparent"
                }`}
              >
                <span className="font-display w-7 text-xl leading-none text-amber">{item.n}</span>
                <span className="min-w-0">
                  <span className="flex items-center gap-1.5 text-sm font-medium text-fg">
                    <Icon className="size-3.5 shrink-0 text-amber lg:hidden" aria-hidden />
                    {item.short}
                    {done && <span className="size-1.5 bg-amber" aria-label="Traced" />}
                  </span>
                  <span className="mt-0.5 hidden truncate text-xs text-muted lg:block">
                    {item.given}
                  </span>
                </span>
              </button>
            );
          })}
          </div>
        </nav>

        <main className="min-w-0 flex-1 px-4 py-5 lg:px-8 lg:py-6">
          <div className="mx-auto max-w-2xl">
            <ModeHead
              mode={mode}
              path={activePath}
              onPick={pick}
              onRestart={() => pick(mode.root)}
            />
            <CircuitMap modeId={mode.id} onOpenMode={openFromCircuit} />
            <div id="fault-tree" className="mt-5">
              <NodeCard
                node={mode.nodes[mode.root]}
                tip={tip.id === mode.root}
                onPath
                onPick={() => pick(mode.root)}
                copied={copied && tip.id === mode.root}
                onCopy={copyFinding}
              />
              <Branches
                mode={mode}
                parentId={mode.root}
                path={activePath}
                copied={copied}
                onPick={pick}
                onCopy={copyFinding}
              />
            </div>
            <footer className="mt-10 border-t border-line pt-4 text-xs leading-relaxed text-muted">
              <p>
                Branches follow Electrical Lad’s public video,{" "}
                <a
                  className="text-amber underline decoration-amber/40 underline-offset-2"
                  href={VIDEO}
                  target="_blank"
                  rel="noreferrer"
                >
                  Stop Guessing! 30 Years of Hydraulic Troubleshooting
                </a>
                . Chapter time is marked on each fault. This is a field tree, not an OEM
                procedure.
              </p>
              <p className="mt-2">
                Lock out, tag out, and bleed pressure before you crack a fitting, pull a valve, or
                change a filter.
              </p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}

function ModeHead({
  mode,
  path,
  onPick,
  onRestart,
}: {
  mode: Mode;
  path: string[];
  onPick: (id: string) => void;
  onRestart: () => void;
}) {
  const Icon = ICONS[mode.icon];
  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <div className="grid size-12 shrink-0 place-items-center border border-line bg-surface text-amber">
            <Icon className="size-5" aria-hidden />
          </div>
          <div className="min-w-0">
            <p className="font-display text-sm tracking-widest text-amber">
              FAULT {mode.n}
              <span className="text-muted"> · {mode.mark}</span>
            </p>
            <h1 className="mt-1 text-2xl font-semibold leading-tight text-fg">{mode.title}</h1>
          </div>
        </div>
        <button
          type="button"
          onClick={onRestart}
          disabled={path.length < 2}
          className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start border border-line px-3 text-sm text-fg disabled:opacity-40"
        >
          <RotateCcw className="size-4" aria-hidden />
          Restart
        </button>
      </div>
      <p className="mt-3 text-sm text-muted">{mode.given}</p>
      {path.length > 1 && (
        <ol className="mt-4 flex flex-col gap-1 border border-line bg-surface px-3 py-3">
          {path.map((id, index) => {
            const node = mode.nodes[id];
            const last = index === path.length - 1;
            return (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => onPick(id)}
                  className={`flex w-full min-h-11 items-center gap-3 text-left text-sm ${
                    last ? "text-fg" : "text-muted"
                  }`}
                >
                  <span className="font-display w-6 text-amber">{String(index + 1).padStart(2, "0")}</span>
                  <span className={last ? "font-medium" : ""}>{node.title}</span>
                </button>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}

function Branches({
  mode,
  parentId,
  path,
  copied,
  onPick,
  onCopy,
}: {
  mode: Mode;
  parentId: string;
  path: string[];
  copied: boolean;
  onPick: (id: string) => void;
  onCopy: () => void;
}) {
  const parent = mode.nodes[parentId];
  if (!parent?.branches?.length) return null;
  const stemLit = path.includes(parentId) && path[path.length - 1] !== parentId;
  return (
    <ul className={`mt-0 ml-2 flex flex-col gap-4 border-l-2 pt-3 ${stemLit ? "border-amber" : "border-line"}`}>
      {parent.branches.map((branch) => {
        const lit = path.includes(branch.to);
        const child = mode.nodes[branch.to];
        return (
          <li key={branch.to}>
            <div className="flex items-center">
              <span className={`h-0.5 w-4 shrink-0 ${lit ? "bg-amber" : "bg-line"}`} aria-hidden />
              <button
                type="button"
                aria-pressed={lit}
                onClick={() => onPick(branch.to)}
                className={`flex min-h-11 min-w-0 flex-1 items-center px-3 py-2 text-left text-sm font-medium motion-safe:transition-colors ${
                  lit
                    ? "bg-amber text-amber-ink"
                    : "border border-line bg-surface text-fg hover:border-amber"
                }`}
              >
                {branch.label}
              </button>
            </div>
            <div className="mt-2 pl-4">
              <NodeCard
                node={child}
                tip={path[path.length - 1] === child.id}
                onPath={lit}
                onPick={() => onPick(child.id)}
                copied={copied && path[path.length - 1] === child.id}
                onCopy={onCopy}
              />
              <Branches
                mode={mode}
                parentId={child.id}
                path={path}
                copied={copied}
                onPick={onPick}
                onCopy={onCopy}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function NodeCard({
  node,
  tip,
  onPath,
  onPick,
  copied,
  onCopy,
}: {
  node: FaultNode;
  tip: boolean;
  onPath: boolean;
  onPick: () => void;
  copied: boolean;
  onCopy: () => void;
}) {
  const border = tip ? "border-amber bg-raised" : onPath ? "border-amber/50 bg-surface" : "border-line bg-surface";
  return (
    <article id={`node-${node.id}`} className={`scroll-mt-24 border ${border}`}>
      <button
        type="button"
        onClick={onPick}
        aria-current={tip ? "step" : undefined}
        className="w-full px-4 py-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
      >
        <p className={`font-display text-sm tracking-widest ${kickerClass(node.kind)}`}>
          {kicker(node.kind)}
          {tip ? " · ON THIS TRACE" : ""}
        </p>
        <h2 className="mt-1 text-base font-semibold leading-snug text-fg">{node.title}</h2>
        <p className="mt-1 text-sm leading-relaxed text-muted">{node.body}</p>
        {node.action && (
          <p className="mt-3 border-t border-line pt-3 text-sm leading-relaxed text-fg">
            <span className={`font-semibold ${node.kind === "ruleout" ? "text-muted" : "text-amber"}`}>
              {node.kind === "ruleout" ? "Instead. " : "Do this. "}
            </span>
            {node.action}
          </p>
        )}
      </button>
      {tip && node.action && (
        <div className="px-4 pb-3">
          <button
            type="button"
            onClick={onCopy}
            className="inline-flex min-h-11 items-center gap-2 border border-line px-3 text-sm text-fg"
          >
            {copied ? <Check className="size-4 text-amber" aria-hidden /> : <Copy className="size-4" aria-hidden />}
            {copied ? "Copied" : "Copy finding"}
          </button>
        </div>
      )}
    </article>
  );
}

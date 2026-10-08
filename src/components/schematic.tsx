import { useEffect, useState, type ReactNode } from "react";
import { Brain } from "lucide-react";
import { CARE } from "@/data/maintain";
import { modes } from "@/data/modes";
import { BrainModal } from "@/components/brain-modal";

const W = 860;
const H = 640;

const DIM = "#5e584e";
const AMBER = "#e6a317";
const OXIDE = "#d4653a";
const QUIET = "#8a8174";

type Part = {
  id: string;
  label: string;
  tip: string;
  modes: string[];
  x: number;
  y: number;
  w: number;
  h: number;
  lx: number;
  ly: number;
};

const PARTS: Part[] = [
  {
    id: "fuse",
    label: "Fuse",
    tip: "Incoming fuse on the PLC output card. If a new fuse blows again, the card is taking it out.",
    modes: ["dead"],
    x: 44,
    y: 16,
    w: 40,
    h: 52,
    lx: 92,
    ly: 28,
  },
  {
    id: "plc",
    label: "PLC card",
    tip: "About 99% of a cylinder that will not move either way is electrical. Start at this card, not at the pump.",
    modes: ["dead"],
    x: 24,
    y: 88,
    w: 108,
    h: 188,
    lx: 28,
    ly: 284,
  },
  {
    id: "coil-a",
    label: "Coil A",
    tip: "Retract solenoid. A blown fuse means the coil is shorted. If a hand shift brings the rod back, the coil is open.",
    modes: ["no-retract"],
    x: 158,
    y: 156,
    w: 52,
    h: 58,
    lx: 154,
    ly: 136,
  },
  {
    id: "dcv",
    label: "Directional valve",
    tip: "Leaks to tank when the pressure switch never makes. Bypasses when a hand shift still will not move the rod. Stuck in center on dirty oil. Leaks in center when a horizontal load walks out.",
    modes: ["switch", "no-retract", "no-extend", "dead", "gland", "drift-forward"],
    x: 224,
    y: 144,
    w: 156,
    h: 72,
    lx: 236,
    ly: 98,
  },
  {
    id: "coil-b",
    label: "Coil B",
    tip: "Extend solenoid. A blown fuse means a shorted coil. A hand shift that extends the rod means the coil is open.",
    modes: ["no-extend"],
    x: 386,
    y: 156,
    w: 52,
    h: 58,
    lx: 444,
    ly: 172,
  },
  {
    id: "counterbalance",
    label: "Counterbalance",
    tip: "Set above the design pressure, this holds the cylinder and it will not extend. Set it back to the design value.",
    modes: ["no-extend"],
    x: 548,
    y: 48,
    w: 64,
    h: 56,
    lx: 430,
    ly: 28,
  },
  {
    id: "flow",
    label: "Flow control",
    tip: "Rod-side restriction. Turned down too far, it spikes pressure against the counterbalance and ruins the packing. Fit a proportional valve and take this restriction out.",
    modes: ["gland"],
    x: 456,
    y: 286,
    w: 72,
    h: 48,
    lx: 448,
    ly: 338,
  },
  {
    id: "check",
    label: "Check",
    tip: "Load-holding check on the rod end. Look for an external leak before this check. No leak means the piston seal is bypassing oil to the blind end.",
    modes: ["drift-down"],
    x: 588,
    y: 280,
    w: 60,
    h: 52,
    lx: 592,
    ly: 338,
  },
  {
    id: "cylinder",
    label: "Cylinder",
    tip: "The packing gland is where the rod leaves the barrel. The piston seal is the drift fault. Rarely the piston separates from the rod and the rod stays still.",
    modes: ["no-retract", "gland", "drift-down", "drift-forward"],
    x: 696,
    y: 28,
    w: 80,
    h: 250,
    lx: 786,
    ly: 36,
  },
  {
    id: "pswitch",
    label: "Switch",
    tip: "Run the cycle. If the gauge is already at the set pressure, replace the switch. If the gauge stays low, the directional valve is leaking to tank. A piston leak would also make the cylinder drift.",
    modes: ["switch"],
    x: 600,
    y: 360,
    w: 72,
    h: 52,
    lx: 674,
    ly: 374,
  },
  {
    id: "pfilter",
    label: "P filter",
    tip: "A clogged pressure filter slows the oil while the gauge still shows system pressure. Replace it when the indicator says dirty.",
    modes: ["slow"],
    x: 536,
    y: 400,
    w: 48,
    h: 52,
    lx: 590,
    ly: 416,
  },
  {
    id: "relief",
    label: "Relief",
    tip: "No foam in the tank: replace the relief and test. If pressure still misses the set level, replace the pump.",
    modes: ["no-pressure"],
    x: 392,
    y: 430,
    w: 60,
    h: 52,
    lx: 396,
    ly: 412,
  },
  {
    id: "rfilter",
    label: "R filter",
    tip: "A clogged return filter slows the cylinder the same way. Replace whichever filter the indicator marks dirty.",
    modes: ["slow"],
    x: 176,
    y: 442,
    w: 48,
    h: 48,
    lx: 168,
    ly: 498,
  },
  {
    id: "cooler",
    label: "Cooler",
    tip: "Return-line heat exchanger. Plate packs load up with scale and blocked water. Tube bundles collect mineral deposits.",
    modes: ["hot"],
    x: 96,
    y: 440,
    w: 48,
    h: 52,
    lx: 92,
    ly: 498,
  },
  {
    id: "water",
    label: "Water valve",
    tip: "Temperature-activated water valve. If it stays shut, the exchanger never gets cooling water. On a kidney loop, prove that pump is moving flow, then check this valve and the exchanger.",
    modes: ["hot"],
    x: 92,
    y: 368,
    w: 56,
    h: 36,
    lx: 154,
    ly: 376,
  },
  {
    id: "strainer",
    label: "Strainer",
    tip: "Foam in the tank means the pump is pulling air. Clean or replace the suction strainer before you condemn the pump.",
    modes: ["no-pressure"],
    x: 448,
    y: 548,
    w: 48,
    h: 48,
    lx: 432,
    ly: 604,
  },
  {
    id: "pump",
    label: "Pump",
    tip: "The strainer is clear and the tank still foams, or a new relief still will not reach the set pressure. Replace the pump and realign it.",
    modes: ["no-pressure"],
    x: 528,
    y: 532,
    w: 52,
    h: 52,
    lx: 530,
    ly: 604,
  },
  {
    id: "motor",
    label: "Motor",
    tip: "Turns the pump. If you replace the pump, realign this coupling. A crooked motor pulls air past the new seal and the tank foams again.",
    modes: ["no-pressure"],
    x: 630,
    y: 534,
    w: 48,
    h: 48,
    lx: 628,
    ly: 604,
  },
];

const PRIMARY: Record<string, string> = {
  switch: "pswitch",
  "no-retract": "coil-a",
  "no-extend": "coil-b",
  dead: "fuse",
  gland: "flow",
  slow: "pfilter",
  "drift-down": "check",
  "drift-forward": "dcv",
  "no-pressure": "relief",
  hot: "cooler",
};

export function CircuitMap({
  modeId = "",
  onOpenMode,
  study = false,
}: {
  modeId?: string;
  onOpenMode: (id: string) => void;
  study?: boolean;
}) {
  const [labels, setLabels] = useState(true);
  const [selected, setSelected] = useState(study ? "pump" : (PRIMARY[modeId] ?? "pswitch"));
  const [brainId, setBrainId] = useState<string | null>(null);

  useEffect(() => {
    if (study) return;
    setSelected(PRIMARY[modeId] ?? "pswitch");
  }, [modeId, study]);

  const lit = study
    ? new Set<string>()
    : new Set(PARTS.filter((part) => part.modes.includes(modeId)).map((part) => part.id));
  const part = PARTS.find((item) => item.id === selected) ?? PARTS[0];
  const care = CARE[part.id];

  return (
    <section className={study ? "border border-line bg-surface" : "mt-5 border border-line bg-surface"} aria-label="Circuit diagram">
      <div className="flex items-center justify-between gap-3 border-b border-line px-3 py-2">
        <p className="text-xs tracking-wide text-muted uppercase">
          Circuit <span className="text-amber">{study ? "· tap a part" : "· parts he circles"}</span>
        </p>
        <button
          type="button"
          aria-pressed={labels}
          onClick={() => setLabels((value) => !value)}
          className={`min-h-9 shrink-0 border px-3 text-xs font-medium ${
            labels ? "border-amber bg-amber text-amber-ink" : "border-line text-muted"
          }`}
        >
          Labels {labels ? "on" : "off"}
        </button>
      </div>

      <div className="relative">
        <Schematic lit={lit} hot={selected} />
        <div className="absolute inset-0">
          {PARTS.map((item) => {
            const on = lit.has(item.id);
            const isSel = item.id === selected;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={isSel}
                aria-label={`${item.label}. ${item.tip}`}
                onClick={() => setSelected(item.id)}
                className={`absolute ${isSel ? "ring-2 ring-oxide" : on ? "ring-1 ring-amber/80" : ""}`}
                style={{
                  left: `${(item.x / W) * 100}%`,
                  top: `${(item.y / H) * 100}%`,
                  width: `${(item.w / W) * 100}%`,
                  height: `${(item.h / H) * 100}%`,
                }}
              />
            );
          })}
          {labels &&
            PARTS.map((item) => (
              <span
                key={`${item.id}-label`}
                className="pointer-events-none absolute flex items-center gap-0.5"
                style={{ left: `${(item.lx / W) * 100}%`, top: `${(item.ly / H) * 100}%` }}
              >
                <span
                  className={`text-[10px] leading-none font-medium whitespace-nowrap sm:text-[11px] ${
                    item.id === selected || lit.has(item.id) ? "text-amber" : "text-muted"
                  }`}
                >
                  {item.label}
                </span>
                <button
                  type="button"
                  aria-label={`Types and ratings for ${item.label}`}
                  onClick={() => {
                    setSelected(item.id);
                    setBrainId(item.id);
                  }}
                  className="pointer-events-auto inline-flex size-6 items-center justify-center text-amber"
                >
                  <Brain className="size-3.5" aria-hidden />
                </button>
              </span>
            ))}
        </div>
      </div>

      {study && (
        <div className="flex gap-2 overflow-x-auto border-t border-line px-3 py-3">
          {PARTS.map((item) => {
            const on = item.id === selected;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={on}
                onClick={() => setSelected(item.id)}
                className={`min-h-11 shrink-0 border px-3 text-sm ${
                  on ? "border-amber bg-amber text-amber-ink" : "border-line text-fg"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}

      <div className="border-t border-line px-3 py-3" aria-live="polite">
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm font-medium text-fg">{part.label}</p>
          <button
            type="button"
            onClick={() => setBrainId(part.id)}
            className="inline-flex min-h-11 shrink-0 items-center gap-1.5 border border-line px-3 text-sm text-fg"
          >
            <Brain className="size-4 text-amber" aria-hidden />
            Types
          </button>
        </div>
        <p className="mt-1 text-sm leading-relaxed text-muted">{study && care ? care.job : part.tip}</p>
        {study && care && (
          <ul className="mt-3 flex flex-col gap-2">
            {care.tasks.map((task) => (
              <li key={task} className="border border-line bg-bg px-3 py-2 text-sm leading-relaxed text-fg">
                {task}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-3 flex flex-wrap gap-2">
          {part.modes.map((id) => {
            const mode = modes.find((item) => item.id === id);
            if (!mode) return null;
            const current = id === modeId;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onOpenMode(id)}
                className={`min-h-9 border px-2.5 text-left text-xs font-medium ${
                  current ? "border-amber bg-amber text-amber-ink" : "border-line text-fg hover:border-amber"
                }`}
              >
                {study ? `Fault ${mode.n} · ${mode.short}` : `${mode.n} ${mode.short}`}
              </button>
            );
          })}
        </div>
      </div>
      {brainId && <BrainModal partId={brainId} onClose={() => setBrainId(null)} />}
    </section>
  );
}

function ink(id: string, lit: Set<string>, hot: string) {
  if (hot === id) return OXIDE;
  if (lit.has(id)) return AMBER;
  return QUIET;
}

function Schematic({ lit, hot }: { lit: Set<string>; hot: string }) {
  const c = (id: string) => ink(id, lit, hot);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" aria-hidden>
      <g stroke="#2c2822" strokeWidth="1">
        {Array.from({ length: 18 }, (_, i) => (
          <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2={H} />
        ))}
        {Array.from({ length: 14 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 48} x2={W} y2={i * 48} />
        ))}
      </g>

      <g fill="none" stroke={DIM} strokeWidth="1.7" strokeLinejoin="round">
        <path d="M64 68 V96" />
        <path d="M132 160 H158" />
        <path d="M132 132 H400 V156" />
        {/* cap: valve A, counterbalance, cylinder blind end */}
        <path d="M346 144 V76 H548" />
        <path d="M612 76 H708" />
        {/* rod: valve B, under the stack, flow, check, rod port */}
        <path d="M258 150 H214 V310 H456" />
        <path d="M528 310 H588" />
        <path d="M648 310 V196 H708" />
        <path d="M560 532 V458" />
        <path d="M560 458 H452" />
        <path d="M560 458 V446" />
        <path d="M560 406 V360 H620" />
        <path d="M560 360 V300 H302 V216" />
        <path d="M428 478 V520" />
        <path d="M258 202 V300" />
        <path d="M258 300 Q274 310 258 320" />
        <path d="M258 320 V466 H220" />
        <path d="M180 466 H142" />
        <path d="M120 488 V530 H360" />
        <path d="M476 572 H528" />
        <path d="M582 558 H630" />
        <path d="M120 404 V444" strokeDasharray="4 3" />
        <path d="M148 386 H210" strokeDasharray="4 3" />
      </g>

      <Symbol color={c("fuse")}>
        <rect x="52" y="28" width="24" height="16" />
        <line x1="64" y1="16" x2="64" y2="28" />
        <line x1="64" y1="44" x2="64" y2="68" />
      </Symbol>

      <Symbol color={c("plc")}>
        <rect x="32" y="96" width="100" height="168" />
        <text x="82" y="116" textAnchor="middle" fill="currentColor" stroke="none" fontSize="12">
          OUT
        </text>
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x="110" y={132 + i * 24} width="12" height="10" />
        ))}
      </Symbol>

      <Symbol color={c("coil-a")}>
        <rect x="158" y="164" width="44" height="32" />
        <path d="M166 188 L194 172" />
        <text x="180" y="212" textAnchor="middle" fill="currentColor" stroke="none" fontSize="12">
          A
        </text>
      </Symbol>

      <Symbol color={c("dcv")}>
        <rect x="232" y="150" width="44" height="52" />
        <rect x="276" y="150" width="44" height="52" />
        <rect x="320" y="150" width="44" height="52" />
        <path d="M242 190 L266 162" />
        <path d="M254 190 L266 174" />
        <path d="M330 162 L354 190" />
        <path d="M342 174 L354 190" />
        <path d="M286 164 H310 M286 188 H310" />
      </Symbol>

      <Symbol color={c("coil-b")}>
        <rect x="390" y="164" width="44" height="32" />
        <path d="M398 188 L426 172" />
        <text x="412" y="212" textAnchor="middle" fill="currentColor" stroke="none" fontSize="12">
          B
        </text>
      </Symbol>

      <Symbol color={c("counterbalance")}>
        <rect x="548" y="52" width="64" height="48" />
        <path d="M560 88 L596 64" />
        <path d="M596 64 V52 M588 58 H604" />
      </Symbol>

      <Symbol color={c("flow")}>
        <path d="M468 298 Q492 316 516 298" />
        <path d="M468 322 Q492 304 516 322" />
        <path d="M476 290 L512 330" />
      </Symbol>

      <Symbol color={c("check")}>
        <path d="M598 318 L618 286 L638 318" />
        <path d="M606 280 H630" />
      </Symbol>

      <Symbol color={c("cylinder")}>
        <rect x="708" y="40" width="60" height="188" />
        <line x1="708" y1="120" x2="768" y2="120" />
        <line x1="738" y1="120" x2="738" y2="262" strokeWidth="5" />
        <line x1="720" y1="220" x2="756" y2="220" />
        <line x1="724" y1="226" x2="752" y2="226" />
      </Symbol>

      <Symbol color={c("pswitch")}>
        <circle cx="636" cy="386" r="16" />
        <path d="M636 386 L646 376" />
        <rect x="608" y="374" width="16" height="14" />
      </Symbol>

      <Diamond cx={560} cy={426} color={c("pfilter")} />
      <Diamond cx={200} cy={466} color={c("rfilter")} />

      <Symbol color={c("relief")}>
        <rect x="404" y="438" width="48" height="40" />
        <path d="M414 468 L440 448" />
        <path d="M440 448 V436 M432 442 H448" />
      </Symbol>

      <g fill="none" stroke={DIM} strokeWidth="1.7">
        <path d="M360 520 H800 V590 H360 Z" />
        <path d="M376 556 Q410 544 444 556 T512 556 T580 556 T648 556 T716 556 T784 556" />
      </g>

      <Diamond cx={472} cy={572} color={c("strainer")} dashed />

      <Symbol color={c("pump")}>
        <circle cx="554" cy="558" r="22" />
        <path d="M544 568 L554 542 L564 568 Z" fill="currentColor" stroke="none" />
      </Symbol>

      <Symbol color={c("motor")}>
        <circle cx="654" cy="558" r="22" />
        <text x="654" y="563" textAnchor="middle" fill="currentColor" stroke="none" fontSize="14">
          M
        </text>
      </Symbol>

      <Symbol color={c("cooler")}>
        <circle cx="120" cy="466" r="22" />
        <path d="M110 476 Q120 454 130 476" />
        <path d="M110 456 Q120 478 130 456" />
      </Symbol>

      <Symbol color={c("water")} dashed>
        <rect x="100" y="376" width="40" height="22" />
        <path d="M106 387 H134" />
      </Symbol>
    </svg>
  );
}

function Symbol({
  color,
  dashed,
  children,
}: {
  color: string;
  dashed?: boolean;
  children: ReactNode;
}) {
  return (
    <g fill="none" stroke={color} strokeWidth="1.8" color={color} strokeDasharray={dashed ? "4 3" : undefined}>
      {children}
    </g>
  );
}

function Diamond({
  cx,
  cy,
  color,
  dashed,
}: {
  cx: number;
  cy: number;
  color: string;
  dashed?: boolean;
}) {
  return (
    <g fill="none" stroke={color} strokeWidth="1.8">
      <path d={`M${cx} ${cy - 20} L${cx + 20} ${cy} L${cx} ${cy + 20} L${cx - 20} ${cy} Z`} />
      <line x1={cx - 12} y1={cy + 6} x2={cx + 12} y2={cy - 6} strokeDasharray={dashed ? "3 2" : undefined} />
    </g>
  );
}

export type Kind = "ask" | "fault" | "ruleout";

export type Branch = {
  label: string;
  to: string;
};

export type FaultNode = {
  id: string;
  kind: Kind;
  title: string;
  body: string;
  action?: string;
  branches?: Branch[];
};

export type ModeIcon =
  | "gauge"
  | "retract"
  | "extend"
  | "dead"
  | "gland"
  | "slow"
  | "down"
  | "forward"
  | "nopressure"
  | "hot";

export type Mode = {
  id: string;
  n: string;
  short: string;
  title: string;
  given: string;
  mark: string;
  icon: ModeIcon;
  root: string;
  nodes: Record<string, FaultNode>;
};

const switchMode: Mode = {
  id: "switch",
  n: "01",
  short: "Switch won't activate at set pressure",
  title: "Pressure switch does not activate at set pressure",
  given: "Presses and molding machines. Set pressure completes the cycle",
  mark: "0:57",
  icon: "gauge",
  root: "s-ask",
  nodes: {
    "s-ask": {
      id: "s-ask",
      kind: "ask",
      title: "Run the cycle. What does the gauge show?",
      body: "Reaching the set pressure is what finishes the cycle. Watch the gauge while it runs.",
      branches: [
        { label: "Gauge shows the set pressure", to: "s-switch" },
        { label: "Gauge shows lower pressure", to: "s-valve" },
      ],
    },
    "s-switch": {
      id: "s-switch",
      kind: "fault",
      title: "Pressure switch",
      body: "The gauge is at the set pressure and the switch still does not activate.",
      action: "Replace the pressure switch.",
    },
    "s-valve": {
      id: "s-valve",
      kind: "fault",
      title: "Directional valve leaking to tank",
      body: "The valve leaks to tank when it shifts, so pressure never reaches the switch. Do not call this a piston-seal leak. A piston leak would also make the cylinder drift.",
      action: "Replace the directional valve.",
    },
  },
};

const noRetract: Mode = {
  id: "no-retract",
  n: "02",
  short: "Extends, won't retract",
  title: "Cylinder extends, does not retract",
  given: "System pressure is present",
  mark: "1:58",
  icon: "retract",
  root: "r-ask",
  nodes: {
    "r-ask": {
      id: "r-ask",
      kind: "ask",
      title: "Check solenoid power and the fuse.",
      body: "System pressure is already up. Start at the retract coil.",
      branches: [
        { label: "Fuse is blown", to: "r-short" },
        { label: "Fuse is good", to: "r-manual" },
      ],
    },
    "r-short": {
      id: "r-short",
      kind: "fault",
      title: "Shorted coil",
      body: "A blown fuse means the coil shorted.",
      action: "Replace the fuse and the coil.",
    },
    "r-manual": {
      id: "r-manual",
      kind: "ask",
      title: "Manually shift the directional valve.",
      body: "Move the spool by hand and watch the rod.",
      branches: [
        { label: "Cylinder retracts", to: "r-open" },
        { label: "Cylinder still does not retract", to: "r-next" },
      ],
    },
    "r-open": {
      id: "r-open",
      kind: "fault",
      title: "Open coil",
      body: "The valve shifts by hand and the rod comes back. The coil is open.",
      action: "Replace the solenoid.",
    },
    "r-next": {
      id: "r-next",
      kind: "ask",
      title: "Valve first. Cylinder only if that fails.",
      body: "The valve may be bypassing oil to tank. Rarely, the piston has separated from the rod: the piston moves and the rod stays still.",
      branches: [
        { label: "Replace the directional valve", to: "r-valve" },
        { label: "Valve replaced, rod still dead", to: "r-split" },
      ],
    },
    "r-valve": {
      id: "r-valve",
      kind: "fault",
      title: "Directional valve bypassing to tank",
      body: "Oil dumps across the valve, so the cylinder never gets a solid retract.",
      action: "Replace the directional valve. If the rod still does not move, replace the cylinder.",
    },
    "r-split": {
      id: "r-split",
      kind: "fault",
      title: "Piston separated from the rod",
      body: "The piston can move and the rod stays put, so it looks like nothing happened.",
      action: "Replace the cylinder.",
    },
  },
};

const noExtend: Mode = {
  id: "no-extend",
  n: "03",
  short: "Retracted, won't extend",
  title: "Cylinder retracted, fails to extend",
  given: "System pressure is present",
  mark: "3:19",
  icon: "extend",
  root: "e-ask",
  nodes: {
    "e-ask": {
      id: "e-ask",
      kind: "ask",
      title: "Check coil B power and the fuse.",
      body: "System pressure is already up. Start at the extend coil.",
      branches: [
        { label: "Fuse is blown", to: "e-short" },
        { label: "Fuse is good", to: "e-manual" },
      ],
    },
    "e-short": {
      id: "e-short",
      kind: "fault",
      title: "Shorted coil",
      body: "A blown fuse means coil B shorted.",
      action: "Replace the fuse and the coil.",
    },
    "e-manual": {
      id: "e-manual",
      kind: "ask",
      title: "Manually shift the directional valve.",
      body: "Move the spool by hand and watch the rod.",
      branches: [
        { label: "Cylinder extends", to: "e-open" },
        { label: "Cylinder does not extend", to: "e-hold" },
      ],
    },
    "e-open": {
      id: "e-open",
      kind: "fault",
      title: "Open coil",
      body: "The valve shifts by hand and the rod goes out. The coil is open.",
      action: "Replace the solenoid.",
    },
    "e-hold": {
      id: "e-hold",
      kind: "ask",
      title: "Does the counterbalance gauge match the design value?",
      body: "Set too high, the counterbalance holds the cylinder retracted.",
      branches: [
        { label: "Set higher than design", to: "e-cb" },
        { label: "Matches design, still dead", to: "e-valve" },
      ],
    },
    "e-cb": {
      id: "e-cb",
      kind: "fault",
      title: "Counterbalance set too high",
      body: "The gauge is above the design pressure, so the cylinder will not extend.",
      action: "Set the counterbalance back to the design value.",
    },
    "e-valve": {
      id: "e-valve",
      kind: "fault",
      title: "Directional valve bypassing to tank",
      body: "Counterbalance is at the design value and a hand shift still will not extend the rod.",
      action: "Replace the directional valve.",
    },
  },
};

const dead: Mode = {
  id: "dead",
  n: "04",
  short: "Won't extend or retract",
  title: "Cylinder does not extend or retract",
  given: "System pressure is present. About 99% electrical",
  mark: "4:33",
  icon: "dead",
  root: "d-ask",
  nodes: {
    "d-ask": {
      id: "d-ask",
      kind: "ask",
      title: "Check the incoming fuse on the PLC output card.",
      body: "About 99% of the time this is electrical. Pressure is already up.",
      branches: [
        { label: "Fuse blows repeatedly", to: "d-card" },
        { label: "Fuse is fine", to: "d-dirt" },
      ],
    },
    "d-card": {
      id: "d-card",
      kind: "fault",
      title: "PLC output card",
      body: "The fuse opens again because the output card is taking it out.",
      action: "Replace the PLC output card.",
    },
    "d-dirt": {
      id: "d-dirt",
      kind: "fault",
      title: "Spool stuck in center",
      body: "Contaminated oil can hang the valve spool in center so it will not shift either way.",
      action: "Replace the valve, the oil, and the filters.",
    },
  },
};

const gland: Mode = {
  id: "gland",
  n: "05",
  short: "Packing gland keeps failing",
  title: "Chronic packing gland failure",
  given: "The gland fails again after it is repacked",
  mark: "5:27",
  icon: "gland",
  root: "g-ask",
  nodes: {
    "g-ask": {
      id: "g-ask",
      kind: "ask",
      title: "Are the guide rods or gibbs worn or out of line?",
      body: "A rod that travels at an angle loads the packing every stroke.",
      branches: [
        { label: "Worn or misaligned", to: "g-guides" },
        { label: "Guides are true", to: "g-spike" },
      ],
    },
    "g-guides": {
      id: "g-guides",
      kind: "fault",
      title: "Guide rods or gibbs",
      body: "The rod extends and retracts at an angle and stresses the packing.",
      action: "Align or replace the guide rods.",
    },
    "g-spike": {
      id: "g-spike",
      kind: "fault",
      title: "Rod-side flow control over-restricted",
      body: "On an overhung load, a flow control turned down too far spikes pressure against the counterbalance when the valve shifts.",
      action: "Replace the directional valve with a proportional valve and remove the restrictive flow control.",
    },
  },
};

const slow: Mode = {
  id: "slow",
  n: "06",
  short: "Extends or retracts too slow",
  title: "Cylinder extends or retracts too slowly",
  given: "System pressure is present",
  mark: "6:59",
  icon: "slow",
  root: "sl-ask",
  nodes: {
    "sl-ask": {
      id: "sl-ask",
      kind: "ask",
      title: "Which filter is dirty?",
      body: "A clogged filter slows the oil. Read the contamination indicator or switch.",
      branches: [
        { label: "Pressure filter", to: "sl-p" },
        { label: "Return filter", to: "sl-r" },
        { label: "Both", to: "sl-both" },
      ],
    },
    "sl-p": {
      id: "sl-p",
      kind: "fault",
      title: "Clogged pressure filter",
      body: "The pressure-line element is loaded, so the cylinder starves for flow.",
      action: "Replace the pressure filter.",
    },
    "sl-r": {
      id: "sl-r",
      kind: "fault",
      title: "Clogged return filter",
      body: "The return element is loaded, so the cylinder slows down.",
      action: "Replace the return filter.",
    },
    "sl-both": {
      id: "sl-both",
      kind: "fault",
      title: "Both filters clogged",
      body: "Pressure and return indicators are both showing contamination.",
      action: "Replace both filters.",
    },
  },
};

const driftDown: Mode = {
  id: "drift-down",
  n: "07",
  short: "Overhung load drifts down",
  title: "Overhung load drifts down",
  given: "System pressure is present",
  mark: "7:35",
  icon: "down",
  root: "dd-ask",
  nodes: {
    "dd-ask": {
      id: "dd-ask",
      kind: "ask",
      title: "External leak on the rod end, before the check valve?",
      body: "Look at the rod-end line ahead of the load-holding check.",
      branches: [
        { label: "Yes, it leaks there", to: "dd-leak" },
        { label: "No external leak", to: "dd-seal" },
      ],
    },
    "dd-leak": {
      id: "dd-leak",
      kind: "fault",
      title: "Leak before the check valve",
      body: "Oil leaving the rod end ahead of the check lets the overhung load settle.",
      action: "Fix that leak.",
    },
    "dd-seal": {
      id: "dd-seal",
      kind: "fault",
      title: "Worn piston seal",
      body: "No external leak. The piston seal is bypassing oil to the blind end.",
      action: "Replace the cylinder.",
    },
  },
};

const driftForward: Mode = {
  id: "drift-forward",
  n: "08",
  short: "Horizontal load drifts forward",
  title: "Cylinder drifts forward",
  given: "Horizontal load",
  mark: "7:59",
  icon: "forward",
  root: "df-ask",
  nodes: {
    "df-ask": {
      id: "df-ask",
      kind: "ask",
      title: "Is the center-block directional valve leaking internally?",
      body: "Internal leak feeds both the blind end and the rod end. The area difference creates a force that walks the cylinder out.",
      branches: [
        { label: "Valve leaks in center", to: "df-valve" },
        { label: "Valve is fine", to: "df-piston" },
      ],
    },
    "df-valve": {
      id: "df-valve",
      kind: "fault",
      title: "Center-block valve leaking",
      body: "Oil reaches both ends while the valve is centered. The larger blind end wins.",
      action: "Replace the directional valve.",
    },
    "df-piston": {
      id: "df-piston",
      kind: "fault",
      title: "Piston seal, rod side to cap side",
      body: "The valve holds. Oil still leaks past the piston from the rod side to the cap side.",
      action: "Replace the cylinder.",
    },
  },
};

const noPressure: Mode = {
  id: "no-pressure",
  n: "09",
  short: "No system pressure",
  title: "No system pressure",
  given: "Motor is running",
  mark: "8:43",
  icon: "nopressure",
  root: "np-ask",
  nodes: {
    "np-ask": {
      id: "np-ask",
      kind: "ask",
      title: "Is the tank foaming?",
      body: "Foam means the pump is sucking air: a clogged suction strainer or a bad pump seal.",
      branches: [
        { label: "Foam in the tank", to: "np-foam" },
        { label: "No foam", to: "np-relief" },
      ],
    },
    "np-foam": {
      id: "np-foam",
      kind: "ask",
      title: "Clean or replace the suction strainer. Does pressure come back?",
      body: "Give the pump a clear suction line, then read the gauge again.",
      branches: [
        { label: "Pressure returns", to: "np-strainer" },
        { label: "Still no pressure", to: "np-pump-air" },
      ],
    },
    "np-strainer": {
      id: "np-strainer",
      kind: "fault",
      title: "Clogged suction strainer",
      body: "The pump was pulling air through a plugged strainer.",
      action: "Leave the strainer clean or new.",
    },
    "np-pump-air": {
      id: "np-pump-air",
      kind: "fault",
      title: "Pump",
      body: "The strainer is clear and the tank still will not build pressure. The pump seal was pulling air, or the pump is done.",
      action: "Replace the pump and realign it.",
    },
    "np-relief": {
      id: "np-relief",
      kind: "ask",
      title: "Replace the relief valve and test. Does pressure reach the set level?",
      body: "No foam, so this is not an air leak. The relief is the next part.",
      branches: [
        { label: "Pressure reaches the set level", to: "np-relief-bad" },
        { label: "Still short of the set level", to: "np-pump" },
      ],
    },
    "np-relief-bad": {
      id: "np-relief-bad",
      kind: "fault",
      title: "Relief valve",
      body: "A new relief brings the gauge up to the set pressure. The old one was bypassing.",
      action: "Leave the new relief valve.",
    },
    "np-pump": {
      id: "np-pump",
      kind: "fault",
      title: "Pump",
      body: "No foam, and a new relief still will not make the set pressure.",
      action: "Replace the pump.",
    },
  },
};

const hot: Mode = {
  id: "hot",
  n: "10",
  short: "Oil is getting too hot",
  title: "Oil is getting too hot",
  given: "Temperature climbs in normal work",
  mark: "9:39",
  icon: "hot",
  root: "h-ask",
  nodes: {
    "h-ask": {
      id: "h-ask",
      kind: "ask",
      title: "Which cooling loop is on this machine?",
      body: "Return-line and kidney-loop coolers are checked in a different order.",
      branches: [
        { label: "Return-line cooler", to: "h-return" },
        { label: "Kidney loop", to: "h-kidney" },
      ],
    },
    "h-return": {
      id: "h-return",
      kind: "ask",
      title: "Water valve, or the heat exchanger?",
      body: "Plate exchangers plug with scale and blocked water passages. Tube exchangers collect mineral deposits. Also check the temperature-activated water valve.",
      branches: [
        { label: "Water valve stays shut", to: "h-temp" },
        { label: "Exchanger is clogged", to: "h-hx" },
      ],
    },
    "h-temp": {
      id: "h-temp",
      kind: "fault",
      title: "Temperature-activated water valve",
      body: "The valve does not open, so the exchanger never gets cooling water.",
      action: "Repair or replace the temperature-activated water valve.",
    },
    "h-hx": {
      id: "h-hx",
      kind: "fault",
      title: "Clogged heat exchanger",
      body: "Scale, blocked water passages, or mineral deposits in the tubes are killing heat transfer.",
      action: "Replace the heat exchanger.",
    },
    "h-kidney": {
      id: "h-kidney",
      kind: "ask",
      title: "Is the kidney-loop pump running with proper flow?",
      body: "If the pump is moving oil, use the same checks as a return-line cooler.",
      branches: [
        { label: "Pump is down, or flow is weak", to: "h-circ" },
        { label: "Pump flow is good", to: "h-k-return" },
      ],
    },
    "h-circ": {
      id: "h-circ",
      kind: "fault",
      title: "Kidney-loop pump",
      body: "The loop is not circulating, so the cooler cannot reject heat.",
      action: "Get the pump running with proper flow, then check the water valve and the exchanger.",
    },
    "h-k-return": {
      id: "h-k-return",
      kind: "ask",
      title: "Flow is good. Water valve, or the exchanger?",
      body: "Same return-line checks. Plate scale and blocked water, or mineral deposits in the tubes.",
      branches: [
        { label: "Water valve stays shut", to: "h-k-temp" },
        { label: "Exchanger is clogged", to: "h-k-hx" },
      ],
    },
    "h-k-temp": {
      id: "h-k-temp",
      kind: "fault",
      title: "Temperature-activated water valve",
      body: "The kidney pump is moving oil and the water valve still does not open.",
      action: "Repair or replace the temperature-activated water valve.",
    },
    "h-k-hx": {
      id: "h-k-hx",
      kind: "fault",
      title: "Clogged heat exchanger",
      body: "Flow is real. The exchanger is packed with scale or mineral deposits.",
      action: "Replace the heat exchanger.",
    },
  },
};

export const modes: Mode[] = [
  switchMode,
  noRetract,
  noExtend,
  dead,
  gland,
  slow,
  driftDown,
  driftForward,
  noPressure,
  hot,
];

for (const mode of modes) {
  if (!mode.nodes[mode.root]) {
    throw new Error(`Missing root ${mode.root} on ${mode.id}`);
  }
  for (const node of Object.values(mode.nodes)) {
    const keyMatch = Object.entries(mode.nodes).find(([, n]) => n === node);
    if (!keyMatch || keyMatch[0] !== node.id) {
      throw new Error(`Key/id mismatch in ${mode.id}:${node.id}`);
    }
    for (const branch of node.branches ?? []) {
      if (!mode.nodes[branch.to]) {
        throw new Error(`${mode.id}:${node.id} → missing ${branch.to}`);
      }
    }
    if (node.kind === "ask" && !node.branches?.length) {
      throw new Error(`${mode.id}:${node.id} is an ask with no branches`);
    }
    if (node.kind !== "ask" && node.branches?.length) {
      throw new Error(`${mode.id}:${node.id} terminal still has branches`);
    }
  }
}

export function pathTo(mode: Mode, targetId: string): string[] {
  const parent = new Map<string, string>();
  const queue = [mode.root];
  const seen = new Set<string>([mode.root]);
  while (queue.length) {
    const id = queue.shift();
    if (!id) break;
    const node = mode.nodes[id];
    for (const branch of node?.branches ?? []) {
      if (seen.has(branch.to)) continue;
      seen.add(branch.to);
      parent.set(branch.to, id);
      queue.push(branch.to);
    }
  }
  if (targetId !== mode.root && !parent.has(targetId)) return [mode.root];
  const out: string[] = [];
  let cur: string | undefined = targetId;
  const guard = new Set<string>();
  while (cur && !guard.has(cur)) {
    guard.add(cur);
    out.push(cur);
    cur = parent.get(cur);
  }
  return out.reverse();
}

export function terminals(mode: Mode): FaultNode[] {
  const out: FaultNode[] = [];
  const walk = (id: string) => {
    const node = mode.nodes[id];
    if (!node) return;
    if (!node.branches?.length) out.push(node);
    else node.branches.forEach((branch) => walk(branch.to));
  };
  walk(mode.root);
  return out;
}

export function isValidPath(mode: Mode, path: string[]): boolean {
  if (path[0] !== mode.root) return false;
  for (let i = 1; i < path.length; i += 1) {
    const prev = mode.nodes[path[i - 1]];
    if (!prev?.branches?.some((branch) => branch.to === path[i])) return false;
  }
  return path.every((id) => Boolean(mode.nodes[id]));
}

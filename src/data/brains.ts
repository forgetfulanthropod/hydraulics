export type PartType = {
  type: string;
  use: string;
  range: string;
};

export type PartBrain = {
  title: string;
  note: string;
  types: PartType[];
};

const SOLENOID: PartBrain = {
  title: "Solenoid coil",
  note: "Coil A pulls retract. Coil B pulls extend. The spool and the valve do not care which end failed. The coil rating does.",
  types: [
    { type: "24 V DC", use: "The usual industrial coil on a PLC transistor or relay output.", range: "21–26 Ω typical · 20–30 W · continuous duty" },
    { type: "12 V DC", use: "Mobile machines and 12 V cabinets.", range: "About half the resistance of a 24 V coil · same wattage" },
    { type: "120 V AC", use: "Older relay panels. Do not land this coil on a DC output.", range: "Inrush several times the holding current · 50/60 Hz" },
    { type: "Proportional", use: "Current, not just on or off, sets how far the spool moves.", range: "0–10 V or 4–20 mA command · dither around 100 Hz" },
  ],
};

export const BRAINS: Record<string, PartBrain> = {
  fuse: {
    title: "Fuse",
    note: "The fuse is sized to the coil and the card, not to the nuisance.",
    types: [
      { type: "Fast-acting", use: "PLC output protection. A shorted coil should open it now.", range: "1–5 A · 250 V · interrupting 10–100 A at that voltage" },
      { type: "Time-delay", use: "A motor starter or a coil with a real inrush. Not the first choice on a card output.", range: "1–10 A · delay a few hundred ms at 200% load" },
      { type: "Blade", use: "Mobile fuse blocks.", range: "2–30 A · 32 V" },
      { type: "Semiconductor", use: "Protects a transistor output that a glass fuse is too slow to save.", range: "Very low let-through · match the card maker" },
    ],
  },
  plc: {
    title: "PLC output",
    note: "The card only closes a circuit. It does not make hydraulic pressure.",
    types: [
      { type: "Relay", use: "Any coil voltage. The contact is dry until you wire a supply to it.", range: "2 A per point typical · 24 V DC or 120 V AC" },
      { type: "Transistor, sourcing", use: "24 V DC coils. The card supplies the plus.", range: "0.5–2 A per point · 24 V DC" },
      { type: "Transistor, sinking", use: "Same coils, card switches the minus. Do not mix with a sourcing card.", range: "0.5–2 A per point · 24 V DC" },
      { type: "Triac", use: "AC coils only.", range: "0.5–1 A · 120 or 240 V AC" },
    ],
  },
  "coil-a": SOLENOID,
  "coil-b": { ...SOLENOID, title: "Solenoid coil B" },
  dcv: {
    title: "Directional valve",
    note: "Center condition is part of the valve. A replacement with the wrong center is a different machine.",
    types: [
      { type: "Open center", use: "One function. In center, pump oil goes to tank.", range: "5–40 gpm · up to 3000 psi · 12/24 V DC or 120 V AC" },
      { type: "Closed center", use: "Load-sense and parallel circuits. All ports blocked in center.", range: "5–80 gpm · 3000–5000 psi" },
      { type: "Tandem center", use: "Pump unloads to tank. Work ports stay blocked, so a load can be held.", range: "5–40 gpm · 3000 psi" },
      { type: "Float center", use: "Work ports open to tank so a cylinder can be pushed by hand or by the load.", range: "5–40 gpm · 3000 psi" },
      { type: "Proportional", use: "The PLC commands speed, not just direction.", range: "5–80 gpm · 0–10 V or 4–20 mA" },
    ],
  },
  counterbalance: {
    title: "Counterbalance",
    note: "Set it to the design pressure. Turning it up is how a cylinder stops extending.",
    types: [
      { type: "Standard", use: "Holds an overhung or vertical load. Pilot from the other end lets it down.", range: "Set 500–5000 psi · pilot ratio 3:1 to 10:1" },
      { type: "Internally drained", use: "Short valves, backpressure adds to the setting.", range: "Same pressure range · watch return-line pressure" },
      { type: "Externally drained", use: "When return pressure moves, the setting should not.", range: "Same · drain line back to tank, no restriction" },
      { type: "Motion control, dual", use: "Both directions of an over-center load, as on a boom.", range: "Often 3000–5000 psi · ratio printed on the body" },
    ],
  },
  flow: {
    title: "Flow control",
    note: "It sets speed. It is not a brake and it is not a relief.",
    types: [
      { type: "Needle", use: "A simple restrictor. Flow changes when the load pressure changes.", range: "0–20 gpm · pressure drop is the control" },
      { type: "Pressure compensated", use: "Holds the set flow as the load changes.", range: "0.1–30 gpm · needs about 100 psi of drop to work" },
      { type: "Priority", use: "Gives a fixed flow to one function and sends the rest downstream.", range: "1–30 gpm priority · system flow above that" },
      { type: "Proportional", use: "The PLC sets the opening. Replaces a needle someone will otherwise close.", range: "0–40 gpm · 0–10 V or 4–20 mA" },
    ],
  },
  check: {
    title: "Check valve",
    note: "Read the arrow. A check in backward is a locked cylinder.",
    types: [
      { type: "Inline poppet", use: "Free flow one way. The usual load-holding check on a rod line.", range: "Cracking 5–65 psi · 5–50 gpm · 3000 psi" },
      { type: "Ball", use: "Small lines. Weeps sooner than a poppet when the seat is scarred.", range: "Cracking 5–15 psi · under 10 gpm" },
      { type: "Pilot-operated", use: "Holds a load, then a pilot line opens it so the load can come down.", range: "Pilot ratio 3:1 to 10:1 · 3000–5000 psi" },
      { type: "High-crack", use: "Makes a little backpressure on purpose. Not a substitute for a counterbalance.", range: "Cracking 50–150 psi" },
    ],
  },
  cylinder: {
    title: "Cylinder",
    note: "Bore makes the force. Rod diameter makes the retract force and the speed difference.",
    types: [
      { type: "Tie-rod", use: "Industrial presses and machines. You can open it.", range: "Bore 1.5–8 in · 1500–3000 psi · stroke to several feet" },
      { type: "Welded", use: "Mobile equipment. Lighter, harder to service.", range: "Bore 2–6 in · 3000 psi typical" },
      { type: "Telescopic", use: "Dump beds and long strokes in a short closed length.", range: "2–5 stages · 2000–3000 psi · force falls as stages step out" },
      { type: "Mill-duty", use: "Mills and presses that run all day. Thicker rod, better gland.", range: "Bore 4–16 in · 3000 psi · NFPA mounts" },
    ],
  },
  pswitch: {
    title: "Pressure switch",
    note: "Set it against a gauge. Do not lower it to hide a valve that cannot make pressure.",
    types: [
      { type: "Diaphragm", use: "Low pressure, oil or air, a clean signal.", range: "5–500 psi · deadband a few percent" },
      { type: "Piston", use: "The usual hydraulic switch on a clamp or a press.", range: "100–5000 psi · adjustable deadband" },
      { type: "Differential", use: "A filter indicator, or a drop across an orifice.", range: "2–100 psi difference" },
      { type: "Transducer", use: "An analog value into the PLC, not just a contact.", range: "0–5000 psi · 0–10 V or 4–20 mA · 0.5% typical" },
    ],
  },
  pfilter: {
    title: "Pressure filter",
    note: "Change it on the indicator. The same thread is not the same element.",
    types: [
      { type: "High-pressure inline", use: "Last screen before a servovalve or a proportional valve.", range: "3–10 µm · β ≥ 200 · housing 3000–6000 psi" },
      { type: "Spin-on, medium pressure", use: "After a fixed pump, before ordinary valves.", range: "10–25 µm · β ≥ 75 · housing to 500 psi" },
      { type: "Duplex", use: "You can change one bowl while the machine runs.", range: "Same media · changeover valve rated to system pressure" },
      { type: "Non-bypass", use: "A valve that must not see dirty oil, even if the element clogs.", range: "No bypass · indicator and a shutdown, or the element collapses" },
    ],
  },
  relief: {
    title: "Relief valve",
    note: "It caps the maximum. It is not the knob you run the machine on.",
    types: [
      { type: "Direct-acting", use: "Small flows, fast, noisier. A line relief.", range: "1–20 gpm · 500–5000 psi" },
      { type: "Pilot-operated", use: "The main system relief. Stable across a wide flow.", range: "10–200 gpm · 500–5000 psi" },
      { type: "Unloading", use: "Drops the pump to tank when an accumulator is full.", range: "System pressure · unload to a few hundred psi" },
      { type: "Proportional relief", use: "The PLC sets the cap, as on a press tonnage control.", range: "0–10 V or 4–20 mA · 500–5000 psi" },
    ],
  },
  rfilter: {
    title: "Return filter",
    note: "A clog here raises pressure in the return line and can split a cooler or a seal.",
    types: [
      { type: "Spin-on", use: "The usual tank-top or line return filter.", range: "10–25 µm · β ≥ 75 · bypass opens around 25 psi" },
      { type: "In-tank cartridge", use: "Element lives in the reservoir. Bypass must dump to tank, not to the clean side.", range: "6–25 µm · housing flow 10–100 gpm" },
      { type: "Kidney-loop", use: "A separate pump scrubs the tank all day, off the main circuit.", range: "3–6 µm · loop flow about 10% of reservoir volume per minute" },
    ],
  },
  cooler: {
    title: "Heat exchanger",
    note: "Compare oil in and oil out. Almost no drop means scale, sludge, or no cooling flow.",
    types: [
      { type: "Air-oil", use: "Mobile machines and plants with no cooling water.", range: "Rejects the heat the fan and the ambient air allow · oil side under 300 psi" },
      { type: "Shell-and-tube", use: "Dirty cooling water. You can rod the tubes.", range: "Oil 150–300 psi · water side under 150 psi" },
      { type: "Plate", use: "Compact, efficient, and easy to clog with scale.", range: "Approach within about 5–10 °F · oil side often only 150–250 psi" },
    ],
  },
  water: {
    title: "Water valve",
    note: "A closed water valve looks exactly like a clogged exchanger.",
    types: [
      { type: "Thermostatic", use: "Opens cooling water when the oil is hot. Shuts it when the oil is not.", range: "Opens around 100–120 °F · sized by the heat load, not by the pipe you have" },
      { type: "Solenoid", use: "The PLC opens it from a temperature switch.", range: "On/off · Cv from the valve chart · 24 V DC or 120 V AC" },
      { type: "Modulating", use: "Holds a set oil temperature instead of slamming open.", range: "4–20 mA · the temperature band is a few degrees" },
    ],
  },
  strainer: {
    title: "Suction strainer",
    note: "It catches bolts and rags. It is not a fine filter. A fine element here starves the pump.",
    types: [
      { type: "Tank screen", use: "On the pump suction inside the reservoir.", range: "60–100 mesh · flow so the drop stays under 0.3–0.5 psi" },
      { type: "Magnetic", use: "Catches steel after a failure, still not a fine filter.", range: "Same mesh · magnet in the flow path" },
      { type: "Y-strainer, inlet line", use: "Outside the tank, so you can pull it without draining.", range: "60–100 mesh · watch inlet vacuum after you close the tank" },
    ],
  },
  pump: {
    title: "Pump",
    note: "A pump makes flow. Pressure shows up only when that flow meets a restriction.",
    types: [
      { type: "Gear", use: "Fixed displacement. Tolerates dirt better than a piston pump. Loud.", range: "1–50 gpm · up to about 3600 psi · 1200–1800 rpm" },
      { type: "Vane", use: "Machine tools. Quieter. Fixed or variable.", range: "5–100 gpm · up to about 2500 psi · 1200–1800 rpm" },
      { type: "Axial piston", use: "Presses and load-sense mobile circuits. Variable displacement.", range: "5–200 gpm · 3000–6000 psi · case drain is part of the health check" },
      { type: "Radial piston", use: "Very high pressure, smaller flow.", range: "1–30 gpm · 6000–10000 psi" },
    ],
  },
  motor: {
    title: "Drive motor",
    note: "If the motor is not at speed, nothing downstream is telling the truth. Check rotation before you couple a new pump.",
    types: [
      { type: "TEFC induction", use: "The usual industrial pump drive. Fixed speed.", range: "1–100 hp · 1800 rpm at 60 Hz · 230/460 V" },
      { type: "Inverter-duty", use: "A VFD sets pump speed instead of dumping oil across a relief.", range: "Same horsepower · constant torque down to low speed only if the motor is rated for it" },
      { type: "Servo", use: "An electrohydrostatic actuator, or a pump that must reverse and stop.", range: "Rated torque at stall · encoder on the shaft" },
      { type: "C-face", use: "Mounts on a bell housing so the coupling stays short.", range: "NEMA frame matched to the pump shaft and the horsepower" },
    ],
  },
};

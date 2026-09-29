import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Gauge, c as CircleOff, d as Ban, f as ArrowRight, i as MoveRight, l as CircleDot, m as ArrowDown, n as Thermometer, o as Funnel, p as ArrowLeft, r as RotateCcw, s as Copy, u as Check } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DqEGJuUP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var modes = [
	{
		id: "switch",
		n: "01",
		short: "Switch won't make",
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
				branches: [{
					label: "Gauge shows the set pressure",
					to: "s-switch"
				}, {
					label: "Gauge shows lower pressure",
					to: "s-valve"
				}]
			},
			"s-switch": {
				id: "s-switch",
				kind: "fault",
				title: "Pressure switch",
				body: "The gauge is at the set pressure and the switch still does not make.",
				action: "Replace the pressure switch."
			},
			"s-valve": {
				id: "s-valve",
				kind: "fault",
				title: "Directional valve leaking to tank",
				body: "The valve leaks to tank when it shifts, so pressure never reaches the switch. Do not call this a piston-seal leak. A piston leak would also make the cylinder drift.",
				action: "Replace the directional valve."
			}
		}
	},
	{
		id: "no-retract",
		n: "02",
		short: "Won't retract",
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
				branches: [{
					label: "Fuse is blown",
					to: "r-short"
				}, {
					label: "Fuse is good",
					to: "r-manual"
				}]
			},
			"r-short": {
				id: "r-short",
				kind: "fault",
				title: "Shorted coil",
				body: "A blown fuse means the coil shorted.",
				action: "Replace the fuse and the coil."
			},
			"r-manual": {
				id: "r-manual",
				kind: "ask",
				title: "Manually shift the directional valve.",
				body: "Move the spool by hand and watch the rod.",
				branches: [{
					label: "Cylinder retracts",
					to: "r-open"
				}, {
					label: "Cylinder still does not retract",
					to: "r-next"
				}]
			},
			"r-open": {
				id: "r-open",
				kind: "fault",
				title: "Open coil",
				body: "The valve shifts by hand and the rod comes back. The coil is open.",
				action: "Replace the solenoid."
			},
			"r-next": {
				id: "r-next",
				kind: "ask",
				title: "Valve first. Cylinder only if that fails.",
				body: "The valve may be bypassing oil to tank. Rarely, the piston has separated from the rod: the piston moves and the rod stays still.",
				branches: [{
					label: "Replace the directional valve",
					to: "r-valve"
				}, {
					label: "Valve replaced, rod still dead",
					to: "r-split"
				}]
			},
			"r-valve": {
				id: "r-valve",
				kind: "fault",
				title: "Directional valve bypassing to tank",
				body: "Oil dumps across the valve, so the cylinder never gets a solid retract.",
				action: "Replace the directional valve. If the rod still does not move, replace the cylinder."
			},
			"r-split": {
				id: "r-split",
				kind: "fault",
				title: "Piston separated from the rod",
				body: "The piston can move and the rod stays put, so it looks like nothing happened.",
				action: "Replace the cylinder."
			}
		}
	},
	{
		id: "no-extend",
		n: "03",
		short: "Won't extend",
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
				branches: [{
					label: "Fuse is blown",
					to: "e-short"
				}, {
					label: "Fuse is good",
					to: "e-manual"
				}]
			},
			"e-short": {
				id: "e-short",
				kind: "fault",
				title: "Shorted coil",
				body: "A blown fuse means coil B shorted.",
				action: "Replace the fuse and the coil."
			},
			"e-manual": {
				id: "e-manual",
				kind: "ask",
				title: "Manually shift the directional valve.",
				body: "Move the spool by hand and watch the rod.",
				branches: [{
					label: "Cylinder extends",
					to: "e-open"
				}, {
					label: "Cylinder does not extend",
					to: "e-hold"
				}]
			},
			"e-open": {
				id: "e-open",
				kind: "fault",
				title: "Open coil",
				body: "The valve shifts by hand and the rod goes out. The coil is open.",
				action: "Replace the solenoid."
			},
			"e-hold": {
				id: "e-hold",
				kind: "ask",
				title: "Does the counterbalance gauge match the design value?",
				body: "Set too high, the counterbalance holds the cylinder retracted.",
				branches: [{
					label: "Set higher than design",
					to: "e-cb"
				}, {
					label: "Matches design, still dead",
					to: "e-valve"
				}]
			},
			"e-cb": {
				id: "e-cb",
				kind: "fault",
				title: "Counterbalance set too high",
				body: "The gauge is above the design pressure, so the cylinder will not extend.",
				action: "Set the counterbalance back to the design value."
			},
			"e-valve": {
				id: "e-valve",
				kind: "fault",
				title: "Directional valve bypassing to tank",
				body: "Counterbalance is at the design value and a hand shift still will not extend the rod.",
				action: "Replace the directional valve."
			}
		}
	},
	{
		id: "dead",
		n: "04",
		short: "Dead both ways",
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
				branches: [{
					label: "Fuse blows repeatedly",
					to: "d-card"
				}, {
					label: "Fuse is fine",
					to: "d-dirt"
				}]
			},
			"d-card": {
				id: "d-card",
				kind: "fault",
				title: "PLC output card",
				body: "The fuse opens again because the output card is taking it out.",
				action: "Replace the PLC output card."
			},
			"d-dirt": {
				id: "d-dirt",
				kind: "fault",
				title: "Spool stuck in center",
				body: "Contaminated oil can hang the valve spool in center so it will not shift either way.",
				action: "Replace the valve, the oil, and the filters."
			}
		}
	},
	{
		id: "gland",
		n: "05",
		short: "Packing keeps failing",
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
				branches: [{
					label: "Worn or misaligned",
					to: "g-guides"
				}, {
					label: "Guides are true",
					to: "g-spike"
				}]
			},
			"g-guides": {
				id: "g-guides",
				kind: "fault",
				title: "Guide rods or gibbs",
				body: "The rod extends and retracts at an angle and stresses the packing.",
				action: "Align or replace the guide rods."
			},
			"g-spike": {
				id: "g-spike",
				kind: "fault",
				title: "Rod-side flow control over-restricted",
				body: "On an overhung load, a flow control turned down too far spikes pressure against the counterbalance when the valve shifts.",
				action: "Replace the directional valve with a proportional valve and remove the restrictive flow control."
			}
		}
	},
	{
		id: "slow",
		n: "06",
		short: "Moves too slow",
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
					{
						label: "Pressure filter",
						to: "sl-p"
					},
					{
						label: "Return filter",
						to: "sl-r"
					},
					{
						label: "Both",
						to: "sl-both"
					}
				]
			},
			"sl-p": {
				id: "sl-p",
				kind: "fault",
				title: "Clogged pressure filter",
				body: "The pressure-line element is loaded, so the cylinder starves for flow.",
				action: "Replace the pressure filter."
			},
			"sl-r": {
				id: "sl-r",
				kind: "fault",
				title: "Clogged return filter",
				body: "The return element is loaded, so the cylinder slows down.",
				action: "Replace the return filter."
			},
			"sl-both": {
				id: "sl-both",
				kind: "fault",
				title: "Both filters clogged",
				body: "Pressure and return indicators are both showing contamination.",
				action: "Replace both filters."
			}
		}
	},
	{
		id: "drift-down",
		n: "07",
		short: "Drifts down",
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
				branches: [{
					label: "Yes, it leaks there",
					to: "dd-leak"
				}, {
					label: "No external leak",
					to: "dd-seal"
				}]
			},
			"dd-leak": {
				id: "dd-leak",
				kind: "fault",
				title: "Leak before the check valve",
				body: "Oil leaving the rod end ahead of the check lets the overhung load settle.",
				action: "Fix that leak."
			},
			"dd-seal": {
				id: "dd-seal",
				kind: "fault",
				title: "Worn piston seal",
				body: "No external leak. The piston seal is bypassing oil to the blind end.",
				action: "Replace the cylinder."
			}
		}
	},
	{
		id: "drift-forward",
		n: "08",
		short: "Drifts forward",
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
				branches: [{
					label: "Valve leaks in center",
					to: "df-valve"
				}, {
					label: "Valve is fine",
					to: "df-piston"
				}]
			},
			"df-valve": {
				id: "df-valve",
				kind: "fault",
				title: "Center-block valve leaking",
				body: "Oil reaches both ends while the valve is centered. The larger blind end wins.",
				action: "Replace the directional valve."
			},
			"df-piston": {
				id: "df-piston",
				kind: "fault",
				title: "Piston seal, rod side to cap side",
				body: "The valve holds. Oil still leaks past the piston from the rod side to the cap side.",
				action: "Replace the cylinder."
			}
		}
	},
	{
		id: "no-pressure",
		n: "09",
		short: "No pressure",
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
				branches: [{
					label: "Foam in the tank",
					to: "np-foam"
				}, {
					label: "No foam",
					to: "np-relief"
				}]
			},
			"np-foam": {
				id: "np-foam",
				kind: "ask",
				title: "Clean or replace the suction strainer. Does pressure come back?",
				body: "Give the pump a clear suction line, then read the gauge again.",
				branches: [{
					label: "Pressure returns",
					to: "np-strainer"
				}, {
					label: "Still no pressure",
					to: "np-pump-air"
				}]
			},
			"np-strainer": {
				id: "np-strainer",
				kind: "fault",
				title: "Clogged suction strainer",
				body: "The pump was pulling air through a plugged strainer.",
				action: "Leave the strainer clean or new."
			},
			"np-pump-air": {
				id: "np-pump-air",
				kind: "fault",
				title: "Pump",
				body: "The strainer is clear and the tank still will not build pressure. The pump seal was pulling air, or the pump is done.",
				action: "Replace the pump and realign it."
			},
			"np-relief": {
				id: "np-relief",
				kind: "ask",
				title: "Replace the relief valve and test. Does pressure reach the set level?",
				body: "No foam, so this is not an air leak. The relief is the next part.",
				branches: [{
					label: "Pressure reaches the set level",
					to: "np-relief-bad"
				}, {
					label: "Still short of the set level",
					to: "np-pump"
				}]
			},
			"np-relief-bad": {
				id: "np-relief-bad",
				kind: "fault",
				title: "Relief valve",
				body: "A new relief brings the gauge up to the set pressure. The old one was bypassing.",
				action: "Leave the new relief valve."
			},
			"np-pump": {
				id: "np-pump",
				kind: "fault",
				title: "Pump",
				body: "No foam, and a new relief still will not make the set pressure.",
				action: "Replace the pump."
			}
		}
	},
	{
		id: "hot",
		n: "10",
		short: "Oil runs hot",
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
				branches: [{
					label: "Return-line cooler",
					to: "h-return"
				}, {
					label: "Kidney loop",
					to: "h-kidney"
				}]
			},
			"h-return": {
				id: "h-return",
				kind: "ask",
				title: "Water valve, or the heat exchanger?",
				body: "Plate exchangers plug with scale and blocked water passages. Tube exchangers collect mineral deposits. Also check the temperature-activated water valve.",
				branches: [{
					label: "Water valve stays shut",
					to: "h-temp"
				}, {
					label: "Exchanger is clogged",
					to: "h-hx"
				}]
			},
			"h-temp": {
				id: "h-temp",
				kind: "fault",
				title: "Temperature-activated water valve",
				body: "The valve does not open, so the exchanger never gets cooling water.",
				action: "Repair or replace the temperature-activated water valve."
			},
			"h-hx": {
				id: "h-hx",
				kind: "fault",
				title: "Clogged heat exchanger",
				body: "Scale, blocked water passages, or mineral deposits in the tubes are killing heat transfer.",
				action: "Replace the heat exchanger."
			},
			"h-kidney": {
				id: "h-kidney",
				kind: "ask",
				title: "Is the kidney-loop pump running with proper flow?",
				body: "If the pump is moving oil, use the same checks as a return-line cooler.",
				branches: [{
					label: "Pump is down, or flow is weak",
					to: "h-circ"
				}, {
					label: "Pump flow is good",
					to: "h-k-return"
				}]
			},
			"h-circ": {
				id: "h-circ",
				kind: "fault",
				title: "Kidney-loop pump",
				body: "The loop is not circulating, so the cooler cannot reject heat.",
				action: "Get the pump running with proper flow, then check the water valve and the exchanger."
			},
			"h-k-return": {
				id: "h-k-return",
				kind: "ask",
				title: "Flow is good. Water valve, or the exchanger?",
				body: "Same return-line checks. Plate scale and blocked water, or mineral deposits in the tubes.",
				branches: [{
					label: "Water valve stays shut",
					to: "h-k-temp"
				}, {
					label: "Exchanger is clogged",
					to: "h-k-hx"
				}]
			},
			"h-k-temp": {
				id: "h-k-temp",
				kind: "fault",
				title: "Temperature-activated water valve",
				body: "The kidney pump is moving oil and the water valve still does not open.",
				action: "Repair or replace the temperature-activated water valve."
			},
			"h-k-hx": {
				id: "h-k-hx",
				kind: "fault",
				title: "Clogged heat exchanger",
				body: "Flow is real. The exchanger is packed with scale or mineral deposits.",
				action: "Replace the heat exchanger."
			}
		}
	}
];
for (const mode of modes) {
	if (!mode.nodes[mode.root]) throw new Error(`Missing root ${mode.root} on ${mode.id}`);
	for (const node of Object.values(mode.nodes)) {
		const keyMatch = Object.entries(mode.nodes).find(([, n]) => n === node);
		if (!keyMatch || keyMatch[0] !== node.id) throw new Error(`Key/id mismatch in ${mode.id}:${node.id}`);
		for (const branch of node.branches ?? []) if (!mode.nodes[branch.to]) throw new Error(`${mode.id}:${node.id} → missing ${branch.to}`);
		if (node.kind === "ask" && !node.branches?.length) throw new Error(`${mode.id}:${node.id} is an ask with no branches`);
		if (node.kind !== "ask" && node.branches?.length) throw new Error(`${mode.id}:${node.id} terminal still has branches`);
	}
}
function pathTo(mode, targetId) {
	const parent = /* @__PURE__ */ new Map();
	const queue = [mode.root];
	const seen = /* @__PURE__ */ new Set([mode.root]);
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
	const out = [];
	let cur = targetId;
	const guard = /* @__PURE__ */ new Set();
	while (cur && !guard.has(cur)) {
		guard.add(cur);
		out.push(cur);
		cur = parent.get(cur);
	}
	return out.reverse();
}
function isValidPath(mode, path) {
	if (path[0] !== mode.root) return false;
	for (let i = 1; i < path.length; i += 1) if (!mode.nodes[path[i - 1]]?.branches?.some((branch) => branch.to === path[i])) return false;
	return path.every((id) => Boolean(mode.nodes[id]));
}
var W = 860;
var H = 640;
var DIM = "#5e584e";
var AMBER = "#e6a317";
var OXIDE = "#d4653a";
var QUIET = "#8a8174";
var PARTS = [
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
		ly: 28
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
		ly: 284
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
		ly: 136
	},
	{
		id: "dcv",
		label: "Directional valve",
		tip: "Leaks to tank when the pressure switch never makes. Bypasses when a hand shift still will not move the rod. Stuck in center on dirty oil. Leaks in center when a horizontal load walks out.",
		modes: [
			"switch",
			"no-retract",
			"no-extend",
			"dead",
			"gland",
			"drift-forward"
		],
		x: 224,
		y: 144,
		w: 156,
		h: 72,
		lx: 236,
		ly: 98
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
		ly: 172
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
		ly: 28
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
		ly: 338
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
		ly: 338
	},
	{
		id: "cylinder",
		label: "Cylinder",
		tip: "The packing gland is where the rod leaves the barrel. The piston seal is the drift fault. Rarely the piston separates from the rod and the rod stays still.",
		modes: [
			"no-retract",
			"gland",
			"drift-down",
			"drift-forward"
		],
		x: 696,
		y: 28,
		w: 80,
		h: 250,
		lx: 786,
		ly: 36
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
		ly: 374
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
		ly: 416
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
		ly: 412
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
		ly: 498
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
		ly: 498
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
		ly: 376
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
		ly: 604
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
		ly: 604
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
		ly: 604
	}
];
var PRIMARY = {
	switch: "pswitch",
	"no-retract": "coil-a",
	"no-extend": "coil-b",
	dead: "fuse",
	gland: "flow",
	slow: "pfilter",
	"drift-down": "check",
	"drift-forward": "dcv",
	"no-pressure": "relief",
	hot: "cooler"
};
function CircuitMap({ modeId, onOpenMode }) {
	const [labels, setLabels] = (0, import_react.useState)(true);
	const [selected, setSelected] = (0, import_react.useState)(PRIMARY[modeId] ?? "pswitch");
	(0, import_react.useEffect)(() => {
		setSelected(PRIMARY[modeId] ?? "pswitch");
	}, [modeId]);
	const lit = new Set(PARTS.filter((part) => part.modes.includes(modeId)).map((part) => part.id));
	const part = PARTS.find((item) => item.id === selected) ?? PARTS[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-5 border border-line bg-surface",
		"aria-label": "Circuit diagram",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3 border-b border-line px-3 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs tracking-wide text-muted uppercase",
					children: ["Circuit ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-amber",
						children: "· parts he circles"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					"aria-pressed": labels,
					onClick: () => setLabels((value) => !value),
					className: `min-h-9 shrink-0 border px-3 text-xs font-medium ${labels ? "border-amber bg-amber text-amber-ink" : "border-line text-muted"}`,
					children: ["Labels ", labels ? "on" : "off"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Schematic, {
					lit,
					hot: selected
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-0",
					children: [PARTS.map((item) => {
						const on = lit.has(item.id);
						const isSel = item.id === selected;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-pressed": isSel,
							"aria-label": `${item.label}. ${item.tip}`,
							onClick: () => setSelected(item.id),
							className: `absolute ${isSel ? "ring-2 ring-oxide" : on ? "ring-1 ring-amber/80" : ""}`,
							style: {
								left: `${item.x / W * 100}%`,
								top: `${item.y / H * 100}%`,
								width: `${item.w / W * 100}%`,
								height: `${item.h / H * 100}%`
							}
						}, item.id);
					}), labels && PARTS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `pointer-events-none absolute text-[10px] leading-none font-medium whitespace-nowrap sm:text-[11px] ${lit.has(item.id) ? "text-amber" : "text-muted"}`,
						style: {
							left: `${item.lx / W * 100}%`,
							top: `${item.ly / H * 100}%`
						},
						children: item.label
					}, `${item.id}-label`))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-line px-3 py-3",
				"aria-live": "polite",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-fg",
						children: part.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm leading-relaxed text-muted",
						children: part.tip
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 flex flex-wrap gap-2",
						children: part.modes.map((id) => {
							const mode = modes.find((item) => item.id === id);
							if (!mode) return null;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => onOpenMode(id),
								className: `min-h-9 border px-2.5 text-xs font-medium ${id === modeId ? "border-amber bg-amber text-amber-ink" : "border-line text-fg hover:border-amber"}`,
								children: [
									mode.n,
									" ",
									mode.short
								]
							}, id);
						})
					})
				]
			})
		]
	});
}
function ink(id, lit, hot) {
	if (hot === id) return OXIDE;
	if (lit.has(id)) return AMBER;
	return QUIET;
}
function Schematic({ lit, hot }) {
	const c = (id) => ink(id, lit, hot);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: `0 0 ${W} ${H}`,
		className: "block h-auto w-full",
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				stroke: "#2c2822",
				strokeWidth: "1",
				children: [Array.from({ length: 18 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: i * 50,
					y1: "0",
					x2: i * 50,
					y2: H
				}, `v${i}`)), Array.from({ length: 14 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "0",
					y1: i * 48,
					x2: W,
					y2: i * 48
				}, `h${i}`))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				fill: "none",
				stroke: DIM,
				strokeWidth: "1.7",
				strokeLinejoin: "round",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M64 68 V96" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M132 160 H158" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M132 132 H400 V156" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M346 144 V76 H548" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M612 76 H708" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M258 150 H214 V310 H456" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M528 310 H588" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M648 310 V196 H708" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M560 532 V458" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M560 458 H452" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M560 458 V446" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M560 406 V360 H620" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M560 360 V300 H302 V216" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M428 478 V520" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M258 202 V300" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M258 300 Q274 310 258 320" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M258 320 V466 H220" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M180 466 H142" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M120 488 V530 H360" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M476 572 H528" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M582 558 H630" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M120 404 V444",
						strokeDasharray: "4 3"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M148 386 H210",
						strokeDasharray: "4 3"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Symbol, {
				color: c("fuse"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "52",
						y: "28",
						width: "24",
						height: "16"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: "64",
						y1: "16",
						x2: "64",
						y2: "28"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: "64",
						y1: "44",
						x2: "64",
						y2: "68"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Symbol, {
				color: c("plc"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "32",
						y: "96",
						width: "100",
						height: "168"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: "82",
						y: "116",
						textAnchor: "middle",
						fill: "currentColor",
						stroke: "none",
						fontSize: "12",
						children: "OUT"
					}),
					[
						0,
						1,
						2,
						3,
						4
					].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "110",
						y: 132 + i * 24,
						width: "12",
						height: "10"
					}, i))
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Symbol, {
				color: c("coil-a"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "158",
						y: "164",
						width: "44",
						height: "32"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M166 188 L194 172" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: "180",
						y: "212",
						textAnchor: "middle",
						fill: "currentColor",
						stroke: "none",
						fontSize: "12",
						children: "A"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Symbol, {
				color: c("dcv"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "232",
						y: "150",
						width: "44",
						height: "52"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "276",
						y: "150",
						width: "44",
						height: "52"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "320",
						y: "150",
						width: "44",
						height: "52"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M242 190 L266 162" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M254 190 L266 174" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M330 162 L354 190" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M342 174 L354 190" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M286 164 H310 M286 188 H310" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Symbol, {
				color: c("coil-b"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "390",
						y: "164",
						width: "44",
						height: "32"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M398 188 L426 172" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: "412",
						y: "212",
						textAnchor: "middle",
						fill: "currentColor",
						stroke: "none",
						fontSize: "12",
						children: "B"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Symbol, {
				color: c("counterbalance"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "548",
						y: "52",
						width: "64",
						height: "48"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M560 88 L596 64" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M596 64 V52 M588 58 H604" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Symbol, {
				color: c("flow"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M468 298 Q492 316 516 298" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M468 322 Q492 304 516 322" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M476 290 L512 330" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Symbol, {
				color: c("check"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M598 318 L618 286 L638 318" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M606 280 H630" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Symbol, {
				color: c("cylinder"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "708",
						y: "40",
						width: "60",
						height: "188"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: "708",
						y1: "120",
						x2: "768",
						y2: "120"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: "738",
						y1: "120",
						x2: "738",
						y2: "262",
						strokeWidth: "5"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: "720",
						y1: "220",
						x2: "756",
						y2: "220"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: "724",
						y1: "226",
						x2: "752",
						y2: "226"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Symbol, {
				color: c("pswitch"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "636",
						cy: "386",
						r: "16"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M636 386 L646 376" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "608",
						y: "374",
						width: "16",
						height: "14"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Diamond, {
				cx: 560,
				cy: 426,
				color: c("pfilter")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Diamond, {
				cx: 200,
				cy: 466,
				color: c("rfilter")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Symbol, {
				color: c("relief"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "404",
						y: "438",
						width: "48",
						height: "40"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M414 468 L440 448" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M440 448 V436 M432 442 H448" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				fill: "none",
				stroke: DIM,
				strokeWidth: "1.7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M360 520 H800 V590 H360 Z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M376 556 Q410 544 444 556 T512 556 T580 556 T648 556 T716 556 T784 556" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Diamond, {
				cx: 472,
				cy: 572,
				color: c("strainer"),
				dashed: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Symbol, {
				color: c("pump"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "554",
					cy: "558",
					r: "22"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M544 568 L554 542 L564 568 Z",
					fill: "currentColor",
					stroke: "none"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Symbol, {
				color: c("motor"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "654",
					cy: "558",
					r: "22"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: "654",
					y: "563",
					textAnchor: "middle",
					fill: "currentColor",
					stroke: "none",
					fontSize: "14",
					children: "M"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Symbol, {
				color: c("cooler"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "120",
						cy: "466",
						r: "22"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M110 476 Q120 454 130 476" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M110 456 Q120 478 130 456" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Symbol, {
				color: c("water"),
				dashed: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "100",
					y: "376",
					width: "40",
					height: "22"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M106 387 H134" })]
			})
		]
	});
}
function Symbol({ color, dashed, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
		fill: "none",
		stroke: color,
		strokeWidth: "1.8",
		color,
		strokeDasharray: dashed ? "4 3" : void 0,
		children
	});
}
function Diamond({ cx, cy, color, dashed }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
		fill: "none",
		stroke: color,
		strokeWidth: "1.8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: `M${cx} ${cy - 20} L${cx + 20} ${cy} L${cx} ${cy + 20} L${cx - 20} ${cy} Z` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: cx - 12,
			y1: cy + 6,
			x2: cx + 12,
			y2: cy - 6,
			strokeDasharray: dashed ? "3 2" : void 0
		})]
	});
}
var STORAGE_KEY = "ten-faults-v2";
var VIDEO = "https://www.youtube.com/watch?v=3ewhga8iHak";
var ICONS = {
	gauge: Gauge,
	retract: ArrowLeft,
	extend: ArrowRight,
	dead: Ban,
	gland: CircleDot,
	slow: Funnel,
	down: ArrowDown,
	forward: MoveRight,
	nopressure: CircleOff,
	hot: Thermometer
};
function kicker(kind) {
	if (kind === "fault") return "Fault";
	if (kind === "ruleout") return "Rule out";
	return "Check";
}
function kickerClass(kind) {
	if (kind === "fault") return "text-oxide";
	if (kind === "ruleout") return "text-muted";
	return "text-amber";
}
function FaultApp() {
	const [modeId, setModeId] = (0, import_react.useState)(modes[0].id);
	const [path, setPath] = (0, import_react.useState)([modes[0].root]);
	const [walked, setWalked] = (0, import_react.useState)([]);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const mode = modes.find((item) => item.id === modeId) ?? modes[0];
	const activePath = isValidPath(mode, path) ? path : [mode.root];
	const tip = mode.nodes[activePath[activePath.length - 1]];
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) {
				const saved = JSON.parse(raw);
				const nextMode = modes.find((item) => item.id === saved.modeId) ?? modes[0];
				const nextPath = Array.isArray(saved.path) && isValidPath(nextMode, saved.path) ? saved.path : [nextMode.root];
				setModeId(nextMode.id);
				setPath(nextPath);
				if (Array.isArray(saved.walked)) setWalked(saved.walked.filter((id) => modes.some((item) => item.id === id)));
			}
		} catch {}
		setHydrated(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		localStorage.setItem(STORAGE_KEY, JSON.stringify({
			modeId,
			path,
			walked
		}));
	}, [
		modeId,
		path,
		walked,
		hydrated
	]);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		if (tip.kind === "ask") return;
		setWalked((prev) => prev.includes(mode.id) ? prev : [...prev, mode.id]);
	}, [
		hydrated,
		tip,
		mode.id
	]);
	function chooseMode(next) {
		setCopied(false);
		setModeId(next.id);
		setPath([next.root]);
	}
	function openFromCircuit(id) {
		const next = modes.find((item) => item.id === id);
		if (!next || next.id === mode.id) return;
		chooseMode(next);
		requestAnimationFrame(() => {
			document.getElementById("fault-tree")?.scrollIntoView({
				block: "nearest",
				behavior: "smooth"
			});
		});
	}
	function pick(id) {
		setCopied(false);
		const next = pathTo(mode, id);
		setPath(next);
		requestAnimationFrame(() => {
			document.getElementById(`node-${id}`)?.scrollIntoView({
				block: "nearest",
				behavior: "smooth"
			});
		});
	}
	async function copyFinding() {
		const lines = [`Ten Faults · ${mode.n} ${mode.title}`, ...activePath.map((id, index) => {
			const node = mode.nodes[id];
			return `${index + 1}. ${node.title}`;
		})];
		if (tip.action) lines.push("", tip.action);
		try {
			await navigator.clipboard.writeText(lines.join("\n"));
			setCopied(true);
		} catch {
			setCopied(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1 bg-amber" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "px-4 pt-5 pb-4 lg:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-4xl leading-none tracking-wide text-fg",
						children: "TEN FAULTS"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-xl text-sm leading-relaxed text-muted",
						children: "Hydraulic troubleshooting as a branch chart. Pick the failure, or tap the part on the circuit."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "shrink-0 font-display text-2xl leading-none text-amber",
						children: [walked.length, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: "/10"
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:flex lg:items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					"aria-label": "Failure modes",
					className: "sticky top-0 z-20 flex gap-2 overflow-x-auto border-y border-line bg-bg px-4 py-3 lg:max-h-dvh lg:w-72 lg:shrink-0 lg:flex-col lg:overflow-y-auto lg:border-y-0 lg:border-r lg:px-3 lg:py-4",
					children: modes.map((item) => {
						const active = item.id === mode.id;
						const done = walked.includes(item.id);
						const Icon = ICONS[item.icon];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							"aria-pressed": active,
							onClick: () => chooseMode(item),
							className: `flex min-h-11 shrink-0 snap-start items-center gap-3 border px-3 py-2 text-left motion-safe:transition-colors lg:w-full ${active ? "border-amber bg-raised" : "border-line bg-surface hover:border-amber lg:border-transparent"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display w-7 text-xl leading-none text-amber",
								children: item.n
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1.5 text-sm font-medium text-fg",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
											className: "size-3.5 shrink-0 text-amber lg:hidden",
											"aria-hidden": true
										}),
										item.short,
										done && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "size-1.5 bg-amber",
											"aria-label": "Traced"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-0.5 hidden truncate text-xs text-muted lg:block",
									children: item.given
								})]
							})]
						}, item.id);
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "min-w-0 flex-1 px-4 py-5 lg:px-8 lg:py-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-2xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeHead, {
								mode,
								path: activePath,
								onPick: pick,
								onRestart: () => pick(mode.root)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircuitMap, {
								modeId: mode.id,
								onOpenMode: openFromCircuit
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								id: "fault-tree",
								className: "mt-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NodeCard, {
									node: mode.nodes[mode.root],
									tip: tip.id === mode.root,
									onPath: true,
									onPick: () => pick(mode.root),
									copied: copied && tip.id === mode.root,
									onCopy: copyFinding
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Branches, {
									mode,
									parentId: mode.root,
									path: activePath,
									copied,
									onPick: pick,
									onCopy: copyFinding
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
								className: "mt-10 border-t border-line pt-4 text-xs leading-relaxed text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									"Branches follow Electrical Lad’s public video,",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										className: "text-amber underline decoration-amber/40 underline-offset-2",
										href: VIDEO,
										target: "_blank",
										rel: "noreferrer",
										children: "Stop Guessing! 30 Years of Hydraulic Troubleshooting"
									}),
									". Chapter time is marked on each fault. This is a field tree, not an OEM procedure."
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2",
									children: "Lock out, tag out, and bleed pressure before you crack a fitting, pull a valve, or change a filter."
								})]
							})
						]
					})
				})]
			})
		]
	});
}
function ModeHead({ mode, path, onPick, onRestart }) {
	const Icon = ICONS[mode.icon];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 items-start gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid size-12 shrink-0 place-items-center border border-line bg-surface text-amber",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						className: "size-5",
						"aria-hidden": true
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-sm tracking-widest text-amber",
						children: [
							"FAULT ",
							mode.n,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: [" · ", mode.mark]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 text-2xl font-semibold leading-tight text-fg",
						children: mode.title
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onRestart,
				disabled: path.length < 2,
				className: "inline-flex min-h-11 shrink-0 items-center gap-2 self-start border border-line px-3 text-sm text-fg disabled:opacity-40",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
					className: "size-4",
					"aria-hidden": true
				}), "Restart"]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm text-muted",
			children: mode.given
		}),
		path.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "mt-4 flex flex-col gap-1 border border-line bg-surface px-3 py-3",
			children: path.map((id, index) => {
				const node = mode.nodes[id];
				const last = index === path.length - 1;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onPick(id),
					className: `flex w-full min-h-11 items-center gap-3 text-left text-sm ${last ? "text-fg" : "text-muted"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display w-6 text-amber",
						children: String(index + 1).padStart(2, "0")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: last ? "font-medium" : "",
						children: node.title
					})]
				}) }, id);
			})
		})
	] });
}
function Branches({ mode, parentId, path, copied, onPick, onCopy }) {
	const parent = mode.nodes[parentId];
	if (!parent?.branches?.length) return null;
	const stemLit = path.includes(parentId) && path[path.length - 1] !== parentId;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: `mt-0 ml-2 flex flex-col gap-4 border-l-2 pt-3 ${stemLit ? "border-amber" : "border-line"}`,
		children: parent.branches.map((branch) => {
			const lit = path.includes(branch.to);
			const child = mode.nodes[branch.to];
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `h-0.5 w-4 shrink-0 ${lit ? "bg-amber" : "bg-line"}`,
					"aria-hidden": true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-pressed": lit,
					onClick: () => onPick(branch.to),
					className: `flex min-h-11 min-w-0 flex-1 items-center px-3 py-2 text-left text-sm font-medium motion-safe:transition-colors ${lit ? "bg-amber text-amber-ink" : "border border-line bg-surface text-fg hover:border-amber"}`,
					children: branch.label
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 pl-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NodeCard, {
					node: child,
					tip: path[path.length - 1] === child.id,
					onPath: lit,
					onPick: () => onPick(child.id),
					copied: copied && path[path.length - 1] === child.id,
					onCopy
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Branches, {
					mode,
					parentId: child.id,
					path,
					copied,
					onPick,
					onCopy
				})]
			})] }, branch.to);
		})
	});
}
function NodeCard({ node, tip, onPath, onPick, copied, onCopy }) {
	const border = tip ? "border-amber bg-raised" : onPath ? "border-amber/50 bg-surface" : "border-line bg-surface";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		id: `node-${node.id}`,
		className: `scroll-mt-24 border ${border}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: onPick,
			"aria-current": tip ? "step" : void 0,
			className: "w-full px-4 py-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: `font-display text-sm tracking-widest ${kickerClass(node.kind)}`,
					children: [kicker(node.kind), tip ? " · ON THIS TRACE" : ""]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 text-base font-semibold leading-snug text-fg",
					children: node.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm leading-relaxed text-muted",
					children: node.body
				}),
				node.action && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 border-t border-line pt-3 text-sm leading-relaxed text-fg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `font-semibold ${node.kind === "ruleout" ? "text-muted" : "text-amber"}`,
						children: node.kind === "ruleout" ? "Instead. " : "Do this. "
					}), node.action]
				})
			]
		}), tip && node.action && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-4 pb-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onCopy,
				className: "inline-flex min-h-11 items-center gap-2 border border-line px-3 text-sm text-fg",
				children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
					className: "size-4 text-amber",
					"aria-hidden": true
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
					className: "size-4",
					"aria-hidden": true
				}), copied ? "Copied" : "Copy finding"]
			})
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaultApp, {});
}
//#endregion
export { Home as component };

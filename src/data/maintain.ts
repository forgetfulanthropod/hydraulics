export type Care = {
  job: string;
  tasks: string[];
};

export const CARE: Record<string, Care> = {
  fuse: {
    job: "The last thing between the PLC output and a shorted coil.",
    tasks: [
      "Read the rating on the fuse. Never fit a larger one to stop a nuisance blow.",
      "If a new fuse opens on the first cycle, kill the output and measure the coil before you change the card.",
      "Feel the holder. A loose clip drops voltage and the valve chatters instead of shifting.",
      "Confirm this fuse feeds this valve, not a spare channel on the same card.",
    ],
  },
  plc: {
    job: "The card that tells the coils to move. A cylinder dead both ways usually ends here.",
    tasks: [
      "Watch the output light while someone calls for the motion. No light means the program or an input, not the oil.",
      "Check the supply into the card before you condemn every output.",
      "Unplug the field connector and look for a short to ground. A welded coil will kill the next card too.",
      "Keep oil mist out of the cabinet. A wet backplane is a maintenance failure.",
    ],
  },
  "coil-a": {
    job: "Retract solenoid. Current in the coil pulls the spool.",
    tasks: [
      "Measure resistance cold and write it down. Infinite is an open coil. Near zero is a short, and it blows the fuse.",
      "Tug the connector. Green pins are the usual open circuit.",
      "Feel it after a few cycles. Too hot to hold means the wrong voltage, or a spool that never finished the shift.",
      "Use the manual override. If the rod comes back by hand, stop chasing the cylinder.",
    ],
  },
  dcv: {
    job: "Sends pump oil to one end of the cylinder and the other end back to tank.",
    tasks: [
      "Hold the cleanliness code printed for this valve. A sticky spool is usually dirt.",
      "Check the mounting bolts and the interface seal. A leak at the stack is often the gasket, not the spool.",
      "Listen for a slam. A valve with no soft shift beats the packing and the frame.",
      "If you change it, match the center condition. Open center and closed center are not the same valve.",
    ],
  },
  "coil-b": {
    job: "Extend solenoid. Same part as coil A, on the other end of the spool.",
    tasks: [
      "Measure resistance cold. Infinite is open. Near zero is shorted and will take the fuse.",
      "Clean the connector. Corrosion here looks like a dead cylinder.",
      "A coil too hot to hold is the wrong voltage, or the spool stalled mid-shift.",
      "Override it by hand. If the rod extends, the coil is open and the cylinder is fine.",
    ],
  },
  counterbalance: {
    job: "Holds a load so the cylinder cannot run away when the directional valve opens.",
    tasks: [
      "Write down the set pressure when the machine is right. Turning it up is how cylinders stop extending.",
      "Set it with a gauge on the pilot, not by the sound of the motor.",
      "Recheck after the oil is at working temperature. Heat moves the setting.",
      "Chatter is often air or the wrong backpressure, not a spring to crank harder.",
    ],
  },
  flow: {
    job: "Meters oil leaving the rod end. It sets speed. It is not a brake.",
    tasks: [
      "Mark the knob. Otherwise the next person closes it and calls the cylinder slow.",
      "Do not ask it to hold an overhung load. That is the counterbalance.",
      "If the packing fails over and over, this restriction is a suspect. It spikes pressure when the valve shifts.",
      "Clean the needle when you change oil. One speck and the speed wanders.",
    ],
  },
  check: {
    job: "Lets oil into the rod end and blocks the way back, so a hanging load stays up.",
    tasks: [
      "Inspect the pipe between the cylinder and this check. A leak here drops the load with a good piston seal.",
      "Match the cracking pressure on the drawing. A stiffer spring is not safer.",
      "Replace a seat that weeps. Lapping it in the machine does not hold.",
      "Read the arrow. A check in backward is a locked cylinder.",
    ],
  },
  cylinder: {
    job: "Turns pressure into the stroke you can see.",
    tasks: [
      "Wipe the rod and watch one stroke. A wet rod is the gland. Drift with a dry rod is inside the barrel.",
      "Keep dents and weld spatter off the rod. The wiper and the seal follow the scratch.",
      "Check the guides. A rod that travels crooked eats packing no matter how often you repack it.",
      "Support the barrel if you pull the rod. A bent tube is a new cylinder.",
    ],
  },
  pswitch: {
    job: "Tells the control that set pressure is reached, so the cycle can finish.",
    tasks: [
      "Set it against a gauge, not against the old mark on the screw.",
      "Check the deadband. A switch that chatters at the set point short-cycles the machine.",
      "Do not lower the set point to hide a valve that cannot make pressure.",
      "Replace it when the gauge is already at pressure and the input never comes in.",
    ],
  },
  pfilter: {
    job: "Last screen before the valves. A clog here slows the work while the gauge still looks fine.",
    tasks: [
      "Change it on the indicator, not on a calendar. Early is waste. A bypassed element sends dirt into the valve.",
      "Match the micron size and the beta ratio on the drawing. The same thread is not the same filter.",
      "Check the bypass. Stuck open, it makes every sample look like a bad element.",
      "Cut the old element when the indicator trips early. The debris names the upstream failure.",
    ],
  },
  relief: {
    job: "Caps the maximum pressure. It is not the knob you use to run the machine.",
    tasks: [
      "Seal the adjuster after it is set. An open locknut will not stay where you left it.",
      "Do not raise it to wake a tired pump. The hose fails first.",
      "Feel the tank line. A relief that dumps all day is why the oil is hot.",
      "Set it at working temperature, with a gauge at the pump outlet.",
    ],
  },
  rfilter: {
    job: "Cleans oil on the way back to the tank.",
    tasks: [
      "Change it on the indicator, same as the pressure filter.",
      "A clogged return element raises pressure in the return line and can unseat a cooler or a seal.",
      "Confirm the bypass dumps to tank, not into the clean side.",
      "Sample downstream of this filter if you want to know what the valves are drinking.",
    ],
  },
  cooler: {
    job: "Moves heat out of the oil before the oil goes home.",
    tasks: [
      "Compare oil in and oil out. Almost no drop means scale, sludge, or no cooling flow.",
      "Clean the water side. Plate packs load with scale. Tubes load with minerals.",
      "Keep return spikes below the cooler rating. A pressure spike splits it.",
      "Check the anode, if it has one, on the same walk as the filters.",
    ],
  },
  water: {
    job: "Opens cooling water when the oil is hot, and shuts it when the oil is not.",
    tasks: [
      "Prove it is not stuck shut. A closed water valve looks exactly like a clogged exchanger.",
      "Clean the strainer ahead of it. A scrap of gasket holds it closed.",
      "Do not wire it open and walk away. The tank sweats and rusts.",
      "On a kidney loop, prove that pump is moving oil before you blame this valve.",
    ],
  },
  strainer: {
    job: "Coarse screen on the pump inlet. It catches bolts and rags, not fine dirt.",
    tasks: [
      "Pull and clean it. A strainer nobody has seen is how pumps die.",
      "Listen for cavitation after the tank is closed. Inlet vacuum tells the same story.",
      "Never put a fine element in this housing. The pump starves.",
      "If the tank foams, clean this before you order a pump.",
    ],
  },
  pump: {
    job: "Makes flow. Pressure shows up only when that flow meets a restriction.",
    tasks: [
      "Align the coupling every time the pump or the motor comes off. A crooked shaft pulls air and foams the tank.",
      "Keep the inlet flooded and the oil at the viscosity on the plate. Cold oil on a tight inlet cavitates.",
      "Trend case-drain flow on a piston pump. Rising drain flow is wear, while the gauge still looks normal.",
      "Do not open it in the dirt. One grain in a piston bore is the rebuild.",
    ],
  },
  motor: {
    job: "Turns the pump. If it is not at speed, nothing downstream is telling the truth.",
    tasks: [
      "Check rotation before you couple a new pump. One reversed start can seize a vane or a gear pump.",
      "Keep the guard on and the fan path open. A cooked motor stops the circuit without being a hydraulic fault.",
      "Record the current. Climbing amps at normal pressure means the pump is binding.",
      "Realign after any move of the bed or the bell housing.",
    ],
  },
};

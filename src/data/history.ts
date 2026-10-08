export type Beat = {
  year: string;
  title: string;
  body: string;
};

export const HISTORY: Beat[] = [
  {
    year: "1647",
    title: "Pascal states the rule",
    body: "Pressure applied to a confined liquid acts through the whole of it. A small piston can move a large one, and the force grows with the area. Every brake pedal and every press is this sentence.",
  },
  {
    year: "1795",
    title: "Bramah builds the press",
    body: "Joseph Bramah, in London, patents a press that multiplies force with two pistons and a leather collar seal. Water is the fluid. The machine is slow, and it is strong enough to start the idea of fluid power as a tool.",
  },
  {
    year: "1846",
    title: "Armstrong's crane",
    body: "William Armstrong puts a water-powered crane on the Newcastle quay. A tower, later a steam-driven accumulator, keeps the pressure up. Docks start to move loads without a team on the rope.",
  },
  {
    year: "1883",
    title: "A city of pressure",
    body: "The London Hydraulic Power Company sells water at about 700 psi through miles of main. Lifts, presses, and dock gates tap the main the way a shop taps air. Fluid power is a utility.",
  },
  {
    year: "1906",
    title: "The variable pump",
    body: "Reynolds Janney's axial-piston pump can change how much oil it moves per turn. Speed is no longer a valve throwing spare oil over a relief. Oil starts to replace water, because oil lubricates the pump that water would rust.",
  },
  {
    year: "1925",
    title: "Vickers and the vane",
    body: "Harry Vickers' balanced vane pump is compact and quiet enough for a machine tool, and soon for an airplane. The hardware of the modern circuit — pump, valve, cylinder, tank — settles into the shape on this page.",
  },
  {
    year: "1930s",
    title: "The aircraft trade",
    body: "Retractable landing gear, flaps, and gun turrets run on oil. The work becomes a skill with its own leaks, seals, and procedures. By the end of the war, fluid power is how heavy things move quickly.",
  },
  {
    year: "1950",
    title: "Moog closes the loop",
    body: "A small current moves a flapper, the flapper moves a spool, the spool meters oil. The servovalve lets an electrical signal command force and speed. Flight controls and machine tools stop being open-loop.",
  },
  {
    year: "1960s",
    title: "Hoses replace cables",
    body: "The hydraulic excavator takes the construction site from the cable shovel. Boom, stick, and bucket are cylinders. Mobile machines, not only factories, become the main place people meet hydraulics.",
  },
  {
    year: "1970s",
    title: "Load sensing",
    body: "The pump makes only the flow and the pressure the functions are asking for. A machine with three valves no longer dumps the spare oil across a relief all day. Heat drops. Fuel drops.",
  },
  {
    year: "1990s",
    title: "The coil and the card",
    body: "Proportional valves and ordinary solenoid valves take their orders from a PLC output. The diagram on the front of this app is that circuit: a card, a fuse, two coils, and a cylinder that does the visible work.",
  },
  {
    year: "Now",
    title: "The pipe gets shorter",
    body: "Electrohydrostatic actuators put a motor, a small pump, and a cylinder in one package, so a leak does not empty an aircraft. Hybrid excavators catch the energy of a boom coming down. The old central system is still everywhere. The new ones are the same physics, with less oil in transit.",
  },
];

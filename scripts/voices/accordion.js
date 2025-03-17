import { SoundfontInstrument } from "../ableton/soundfont-instrument.js";

export class Accordion extends SoundfontInstrument {
  constructor(audioContext) {
    super("Accordion", audioContext, "accordion");
  }

  getMIDINumber() {
    return 21;
  }
}
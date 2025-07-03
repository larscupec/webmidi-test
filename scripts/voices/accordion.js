import { Instrument } from "../ableton/instrument.js";

export class Accordion extends Instrument {
  constructor(audioContext) {
    super("Accordion", audioContext, "accordion");
  }

  getMIDINumber() {
    return 21;
  }
}
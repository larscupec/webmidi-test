import { SoundfontInstrument } from "../ableton/soundfont-instrument.js";

export class OverdrivenGuitar extends SoundfontInstrument {
  constructor(audioContext) {
    super("Overdriven Guitar", audioContext, "overdriven_guitar");
  }

  getMIDINumber() {
    return 29;
  }
}
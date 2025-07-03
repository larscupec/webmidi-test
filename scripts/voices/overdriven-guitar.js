import { Instrument } from "../ableton/instrument.js";

export class OverdrivenGuitar extends Instrument {
  constructor(audioContext) {
    super("Overdriven Guitar", audioContext, "overdriven_guitar");
  }

  getMIDINumber() {
    return 29;
  }
}
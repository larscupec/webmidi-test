import { SoundfontInstrument } from "../ableton/soundfont-instrument.js";

export class OverdrivenGuitar extends SoundfontInstrument {
  constructor(audioContext) {
    super("Overdriven Guitar", audioContext, "overdriven_guitar");
  }

  clone() {
    return new OverdrivenGuitar(this._audioContext);
  }

  getMIDINumber() {
    return 29;
  }
}
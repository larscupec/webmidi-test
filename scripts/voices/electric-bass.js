import { SoundfontInstrument } from "../ableton/soundfont-instrument.js";

export class ElectricBass extends SoundfontInstrument {
  constructor(audioContext) {
    super("Electric Bass", audioContext, "electric_bass_finger");
  }

  clone() {
    return new ElectricBass(this._audioContext);
  }

  getMIDINumber() {
    return 33;
  }
}
import { SoundfontInstrument } from "../ableton/soundfont-instrument.js";

export class ElectricPiano extends SoundfontInstrument {
  constructor(audioContext) {
    super("Electric Piano", audioContext, "electric_piano_1");
  }

  clone() {
    return new ElectricPiano(this._audioContext);
  }

  getMIDINumber() {
    return 4;
  }
}
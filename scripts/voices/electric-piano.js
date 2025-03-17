import { SoundfontInstrument } from "../ableton/soundfont-instrument.js";

export class ElectricPiano extends SoundfontInstrument {
  constructor(audioContext) {
    super("Electric Piano", audioContext, "electric_piano_1");
  }

  getMIDINumber() {
    return 4;
  }
}
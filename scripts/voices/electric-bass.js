import { SoundfontInstrument } from "../ableton/soundfont-instrument.js";

export class ElectricBass extends SoundfontInstrument {
  constructor(audioContext) {
    super("Electric Bass", audioContext, "electric_bass_finger");
  }

  getMIDINumber() {
    return 33;
  }
}
import { SoundfontInstrument } from "../ableton/soundfont-instrument.js";

export class AcousticBass extends SoundfontInstrument {
  constructor(audioContext) {
    super("Acoustic Bass", audioContext, "acoustic_bass");
  }

  getMIDINumber() {
    return 33;
  }
}
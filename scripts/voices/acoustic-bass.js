import { Instrument } from "../ableton/instrument.js";

export class AcousticBass extends Instrument {
  constructor(audioContext) {
    super("Acoustic Bass", audioContext, "acoustic_bass");
  }

  getMIDINumber() {
    return 33;
  }
}
import { Instrument } from "../ableton/instrument.js";

export class AcousticPiano extends Instrument {
  constructor(audioContext) {
    super("Acoustic Piano", audioContext, "acoustic_grand_piano");
  }

  getMIDINumber() {
    return 0;
  }
}
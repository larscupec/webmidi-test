import { Instrument } from "../ableton/instrument.js";

export class ElectricBass extends Instrument {
  constructor(audioContext) {
    super("Electric Bass", audioContext, "electric_bass_finger");
  }

  getMIDINumber() {
    return 33;
  }
}
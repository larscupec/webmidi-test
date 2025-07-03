import { Instrument } from "../ableton/instrument.js";

export class SynthBass extends Instrument {
  constructor(audioContext) {
    super("Synth Bass", audioContext, "synth_bass_1");
  }

  getMIDINumber() {
    return 38;
  }
}
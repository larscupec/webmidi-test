import { SoundfontInstrument } from "../ableton/soundfont-instrument.js";

export class SynthBass extends SoundfontInstrument {
  constructor(audioContext) {
    super("Synth Bass", audioContext, "synth_bass_1");
  }

  clone() {
    return new SynthBass(this._audioContext);
  }
}
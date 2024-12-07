import { SoundfontInstrument } from "../ableton/soundfont-instrument.js";

export class AcousticPiano extends SoundfontInstrument {
  constructor(audioContext) {
    super("Acoustic Piano", audioContext, "acoustic_grand_piano");
  }

  clone() {
    return new AcousticPiano(this._audioContext);
  }
}
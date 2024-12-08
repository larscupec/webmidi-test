import { SoundfontInstrument } from "../ableton/soundfont-instrument.js";

export class DistortionGuitar extends SoundfontInstrument {
  constructor(audioContext) {
    super("Distortion Guitar", audioContext, "distortion_guitar");
  }

  clone() {
    return new DistortionGuitar(this._audioContext);
  }
}
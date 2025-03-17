import { SoundfontInstrument } from "../ableton/soundfont-instrument.js";

export class DistortionGuitar extends SoundfontInstrument {
  constructor(audioContext) {
    super("Distortion Guitar", audioContext, "distortion_guitar");
  }

  getMIDINumber() {
    return 30;
  }
}
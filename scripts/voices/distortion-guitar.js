import { Instrument } from "../ableton/instrument.js";

export class DistortionGuitar extends Instrument {
  constructor(audioContext) {
    super("Distortion Guitar", audioContext, "distortion_guitar");
  }

  getMIDINumber() {
    return 30;
  }
}
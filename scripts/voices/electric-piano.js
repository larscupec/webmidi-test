import { Instrument } from "../ableton/instrument.js";

export class ElectricPiano extends Instrument {
  constructor(audioContext) {
    super("Electric Piano", audioContext, "electric_piano_1");
  }

  getMIDINumber() {
    return 4;
  }
}
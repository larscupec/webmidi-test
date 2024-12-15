import { Voice } from "../ableton/voice.js";
import { DrumMachine } from "https://unpkg.com/smplr/dist/index.mjs";

export class Drum extends Voice {
  #drumMachine;

  constructor(name, audioContext, instrument) {
    super(name, audioContext);

    this.#drumMachine = new DrumMachine(
      this._audioContext, 
      { instrument: instrument }
    );
  }

  playNote(pitch, velocity, durationMs, volume) {
    this.#drumMachine.output.setVolume(volume);

    if (durationMs > 0) {
      this.#drumMachine.start({ note: pitch, velocity: velocity, duration: durationMs / 1000.0 });
    } else {
      this.#drumMachine.start({ note: pitch, velocity: velocity });
    }
  }

  stopNote(noteNumber) {
    this.#drumMachine.stop({ note: noteNumber });
  }

  clone() {}
}
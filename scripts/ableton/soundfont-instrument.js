import { Voice } from "./voice.js";
import { Soundfont } from "https://unpkg.com/smplr/dist/index.mjs";

export class SoundfontInstrument extends Voice {
  #patch;

  constructor(name, audioContext, instrument) {
    super(name, audioContext);

    this.#patch = new Soundfont(
      this._audioContext, 
      { instrument: instrument }
    );
  }

  playNote(pitch, velocity, durationMs, volume) {
    this.#patch.output.setVolume(volume);

    if (durationMs > 0) {
      this.#patch.start({ note: pitch, velocity: velocity, duration: durationMs / 1000.0 });
    } else {
      this.#patch.start({ note: pitch, velocity: velocity });
    }
  }

  stopNote(pitch) {
    this.#patch.stop({ note: pitch });
  }

  clone() { }
}
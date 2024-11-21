import { Voice } from "./voice.js";

export class SquarePluck extends Voice {
  #synth;

  constructor() {
    super("Square Pluck");
    this.#synth = new Tone.Synth().toDestination();
  }

  playNote(pitch, durationMs, volumeLeveldB) {
    this.#synth.volume.value = volumeLeveldB;

    this.#synth.triggerAttackRelease(pitch, "16n", Tone.now());
  }

  clone() {
    return new SquarePluck();
  }
}
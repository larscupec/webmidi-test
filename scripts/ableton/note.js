import { Timing } from "./timing.js";

export class Note {
  #pitch;
  #durationMs;
  #velocity;
  dontPlay;

  constructor(pitch, velocity, durationMs, dontPlay = false) {
    this.#pitch = pitch;
    this.#velocity = velocity;
    this.#durationMs = durationMs;
    this.dontPlay = dontPlay;
  }

  getPitch() {
    return this.#pitch;
  }

  getVelocity() {
    return this.#velocity;
  }

  getDurationMs() {
    return this.#durationMs;
  }

  getOctave() {
    return Number(this.#pitch.replace(/[^0-9]/g, ""));
  }

  getPitchClass() {
    return this.#pitch.replace(/[0-9]/g, "");
  }
}
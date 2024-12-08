export class Note {
  #pitch;
  #durationMs;
  #velocity;

  constructor(pitch, velocity, durationMs) {
    this.#pitch = pitch;
    this.#velocity = velocity;
    this.#durationMs = durationMs;
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
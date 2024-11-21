export class Note {
  #pitch;
  #durationMs;

  constructor(pitch, durationMs) {
    this.#pitch = pitch;
    this.#durationMs = durationMs;
  }

  getPitch() {
    return this.#pitch;
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
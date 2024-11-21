export class Voice {
  #name;

  constructor(name) {
    this.#name = name;
  }

  playNote(pitch, durationMs, volumeLeveldB) { }

  getName() {
    return this.#name;
  }

  clone() { }
}
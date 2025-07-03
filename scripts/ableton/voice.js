export class Voice {
  #name;
  _number;
  _audioContext;

  constructor(name, number, audioContext) {
    this.#name = name;
    this._number = number;
    this._audioContext = audioContext;
  }

  playNote(pitch, velocity, durationMs, volume) { }
  
  stopNote(noteNumber) { }

  getName() {
    return this.#name;
  }

  getNumber() {
    return this._number;
  }
}
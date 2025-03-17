export class Voice {
  #name;
  _audioContext;

  constructor(name, audioContext) {
    this.#name = name;
    this._audioContext = audioContext;
  }

  playNote(pitch, velocity, durationMs, volume) { }
  
  stopNote(noteNumber) { }

  getName() {
    return this.#name;
  }

  getMIDINumber() { }
}
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

  // Voices have a clone function so that there can be two instances of them.
  // This is because one needs to play notes from the virtual keyboard/MIDI device and
  // the other plays notes from the channel so they don't interfere
  clone() { }
}
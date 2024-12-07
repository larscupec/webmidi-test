export class MIDIDevice {
  #name;
  #input;

  constructor(name, input) {
    this.#name = name;
    this.#input = input;
  }

  addListener(type, callback) {
    this.#input.addListener(type, e => callback(e));
  }

  removeListener(type) {
    this.#input.removeListener(type);
  }

  getName() {
    return this.#name;
  }
}
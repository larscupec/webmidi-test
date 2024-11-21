export class RecordBuffer {
  #notes = new Map();

  push(pitch, startStep) {
    this.#notes.set(pitch, startStep);
  }

  pop(pitch) {
    let startStep = this.#notes.get(pitch);

    this.#notes.delete(pitch);

    return startStep;
  }
}
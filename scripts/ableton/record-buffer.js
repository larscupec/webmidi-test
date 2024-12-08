export class RecordBuffer {
  #noteStarts = new Map();

  push(pitch, velocity, startStep) {
    this.#noteStarts.set(pitch, { startStep: startStep, velocity: velocity });
  }

  pop(pitch) {
    let noteStart = this.#noteStarts.get(pitch);

    this.#noteStarts.delete(pitch);

    return noteStart;
  }
}
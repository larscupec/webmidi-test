export class RecordBuffer {
  #noteStarts = new Map();

  add(pitch, velocity, startTime) {
    this.#noteStarts.set(pitch, { startTime: startTime, velocity: velocity });
  }

  get(pitch) {
    let noteStart = this.#noteStarts.get(pitch);

    this.#noteStarts.delete(pitch);

    return noteStart;
  }
}
export class RecordBuffer {
  #noteStarts = new Map();

  add(pitch, velocity, startTime) {
    this.#noteStarts.set(pitch, { startTime: startTime, velocity: velocity });
  }

  remove(pitch) {
    this.#noteStarts.delete(pitch);
  }

  get(pitch) {
    return this.#noteStarts.get(pitch);
  }
}
import { Timing } from "./timing.js";

export class Pattern {
  #steps = new Map();
  #lowestOctave = 0;
  #highestOctave = 0;

  constructor() {
    for (let i = 0; i < Timing.calcTotalStepCount(); i++) {
      this.#steps.set(i, []);
    }
  }

  add(note, startStep) {
    let notesOnStep = this.#steps.get(startStep);

    if (notesOnStep.find((n) => n.getPitch() === note.getPitch())) {
      // Same note already on this step, don't add
      return;
    }

    let noteOctave = note.getOctave();

    if (this.isEmpty()) {
      this.#lowestOctave = noteOctave;
      this.#highestOctave = noteOctave;
    } else {
      if (noteOctave > this.#highestOctave) {
        this.#highestOctave = noteOctave;
      }
      if (noteOctave < this.#lowestOctave) {
        this.#lowestOctave = noteOctave;
      }
    }

    notesOnStep.push(note);
  }

  getNotes(step) {
    return this.#steps.get(step);
  }

  getOctaveRange() {
    return this.#highestOctave - this.#lowestOctave + 1;
  }

  isEmpty() {
    for (const [key, value] of this.#steps) {
      if (value.length != 0) {
        return false;
      }
    }

    return true;
  }

  getLowestOctave() {
    return this.#lowestOctave;
  }

  getHighestOctave() {
    return this.#highestOctave;
  }

  clear() {
    this.#steps.forEach((value, key, map) => value.length = 0);
    this.#lowestOctave = 0;
    this.#highestOctave = 0;
  }

  remove(note, startStep) {
    let notesOnStep = this.#steps.get(startStep);

    let noteIndex = notesOnStep.indexOf(note);
    notesOnStep.splice(noteIndex, 1);

    this.#findOctaveRange();
  }

  #findOctaveRange() {
    if (this.isEmpty()) {
      this.#lowestOctave = 0;
      this.#highestOctave = 0;
    } else {
      for (const [key, value] of this.#steps) {
        if (value.length > 0) {
          let noteOctave = value[0].getOctave();
          this.#lowestOctave = this.#highestOctave = noteOctave;
          break;
        }
      }

      for (const [key, value] of this.#steps) {
        for (const note of value) {
          let noteOctave = note.getOctave();
          if (noteOctave > this.#highestOctave) {
            this.#highestOctave = noteOctave;
          }
          if (noteOctave < this.#lowestOctave) {
            this.#lowestOctave = noteOctave;
          }
        }
      }
    }
  }
}
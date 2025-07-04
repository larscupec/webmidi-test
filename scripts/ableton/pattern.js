import { Timing } from "./timing.js";

export class Pattern {
  #steps = [];
  #lowestOctave = 0;
  #highestOctave = 0;

  constructor() {
    for (let i = 0; i < Timing.calcTotalStepCount(); i++) {
      this.#steps.push([]);
    }
  }

  add(note, startStep) {
    let notesOnStep = this.#steps[startStep];

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
    return this.#steps[step];
  }

  getOctaveRange() {
    return this.#highestOctave - this.#lowestOctave + 1;
  }

  isEmpty() {
    this.#steps.forEach((notes) => {
      if (notes.length != 0) {
        return false;
      }
    });

    return true;
  }

  getLowestOctave() {
    return this.#lowestOctave;
  }

  getHighestOctave() {
    return this.#highestOctave;
  }

  clear() {
    this.#steps.forEach((notes) => notes.length = 0);
    this.#lowestOctave = 0;
    this.#highestOctave = 0;
  }

  remove(note, startStep) {
    let notesOnStep = this.#steps[startStep];

    let noteIndex = notesOnStep.indexOf(note);
    notesOnStep.splice(noteIndex, 1);

    this.#findOctaveRange();
  }

  #findOctaveRange() {
    if (this.isEmpty()) {
      this.#lowestOctave = 0;
      this.#highestOctave = 0;
    } else {
      for (const notes of this.#steps) {
        if (notes.length > 0) {
          let noteOctave = notes[0].getOctave();
          this.#lowestOctave = this.#highestOctave = noteOctave;
          break;
        }
      }

      for (const notes of this.#steps) {
        for (const note of notes) {
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
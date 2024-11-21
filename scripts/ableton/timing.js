import { TimeSignature } from "./time-signature.js"

export class Timing {
  static #barCount = 4;
  static #timeSignature = new TimeSignature(4, 4);
  static #timeDivision = 16;
  static #bpm = 120;

  static setBarCount(barCount) {
    this.#barCount = barCount;
  }

  static setTimeSignature(timeSignature) {
    this.#timeSignature = timeSignature;
  }

  static setBPM(bpm) {
    this.#bpm = bpm;
  }

  static getBarCount() {
    return this.#barCount;
  }

  static getTimeSignature() {
    return this.#timeSignature;
  }

  static getBPM() {
    return this.#bpm;
  }

  static calcBeatDurationMs() {
    return (((1 / this.#bpm) * 60) * 1000) * (4 / this.#timeSignature.getLowerNumeral());
  }

  static calcSongDurationMs() {
    let songDurationMs = this.#barCount *
      this.#timeSignature.getUpperNumeral() * this.calcBeatDurationMs();

    return songDurationMs;
  }

  static calcStepDurationMs() {
    return this.calcSongDurationMs() / this.#barCount / this.calcStepCountPerBar();
  }

  static quantizeTimeToStep(timeMs, mode = "strict") {
    let songPerc = clamp(timeMs / this.calcSongDurationMs(), 0, 1);
    let totalStepCount = this.calcTotalStepCount();
    let step;

    switch (mode) {
      default: case "strict":
        step = Math.floor(totalStepCount * songPerc) + 1;
        break;
      case "loose":
        step = Math.round(totalStepCount * songPerc) + 1;

        if (step > totalStepCount) {
          step = 1;
        }
        break;
    }

    return step;
  }

  static convStepToTimeMs(step) {
    let totalStepCount = this.calcTotalStepCount();
    step = clamp(step, 0, totalStepCount);
    let stepPerc = step / totalStepCount;

    return Math.round(this.calcSongDurationMs() * stepPerc);
  }

  static calcStepCountPerBar() {
    return this.#timeSignature.getUpperNumeral() * 
      (this.#timeDivision / this.#timeSignature.getLowerNumeral());
  }

  static calcTotalStepCount() {
    return this.#barCount * this.calcStepCountPerBar();
  }
}

// Helper functions

function clamp(number, lower, upper) {
  number = number < lower ? lower : number
  number = number > upper ? upper : number

  return number;
}
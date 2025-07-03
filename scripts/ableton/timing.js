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

  static quantizeTimeToStep(timeMs, floor = false) {
    let songPerc = timeMs / this.calcSongDurationMs();
    let totalStepCount = this.calcTotalStepCount();
    
    return floor ? Math.floor(totalStepCount * songPerc) : Math.round(totalStepCount * songPerc);
  }

  static convStepToTimeMs(step) {
    let totalStepCount = this.calcTotalStepCount();
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
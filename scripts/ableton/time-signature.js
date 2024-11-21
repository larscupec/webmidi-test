export class TimeSignature {
  #upperNumeral;  // How many beats per bar
  #lowerNumeral;  // What type of beats they are

  constructor(upperNumeral, lowerNumeral) {
    if (lowerNumeral != 4 && lowerNumeral != 8 && lowerNumeral != 2) {
      throw new Error("Lower numeral must be of value 2, 4 or 8!");
    }
    if (upperNumeral < 1 || upperNumeral > 16) {
      throw new Error("Upper numeral must be in [1, 16]");
    }

    this.#upperNumeral = upperNumeral;
    this.#lowerNumeral = lowerNumeral;
  }

  getLowerNumeral() {
    return this.#lowerNumeral;
  }

  getUpperNumeral() {
    return this.#upperNumeral;
  }
}
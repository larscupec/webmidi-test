export class Metronome {
  #beatClick = new Audio("./sounds/rs.ogg");
  #firstBeatClick = new Audio("./sounds/cl.ogg");

  playBeatClick() {
    this.#beatClick.play();
  }

  playFirstBeatClick() {
    this.#firstBeatClick.play();
  }
}
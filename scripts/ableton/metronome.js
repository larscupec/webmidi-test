export class Metronome {
  #beatClick = new Audio("./sounds/rim_shot.wav");
  #firstBeatClick = new Audio("./sounds/claves.wav");

  playBeatClick() {
    this.#beatClick.play();
  }

  playFirstBeatClick() {
    this.#firstBeatClick.play();
  }
}
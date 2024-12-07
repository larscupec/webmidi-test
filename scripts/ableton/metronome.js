export class Metronome {
  #beatClick = new Audio("./sounds/roland808/rim_shot.wav");
  #firstBeatClick = new Audio("./sounds/roland808/claves.wav");

  playBeatClick() {
    this.#beatClick.play();
  }

  playFirstBeatClick() {
    this.#firstBeatClick.play();
  }
}
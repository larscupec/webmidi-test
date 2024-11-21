export class Metronome {
  #beatClick = new Tone.Player("./sounds/roland808/rim_shot.wav").toDestination();
  #firstBeatClick = new Tone.Player("./sounds/roland808/claves.wav").toDestination();

  playBeatClick() {
    this.#beatClick.start();
  }

  playFirstBeatClick() {
    this.#firstBeatClick.start();
  }
}
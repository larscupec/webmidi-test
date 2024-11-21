import { Voice } from "./voice.js";

export class RolandTR808 extends Voice {
  #soundMap;

  constructor() {
    super("Roland TR-808");

    this.#soundMap = new Map();

    this.#soundMap.set("C2",
      new Tone.Player("./sounds/roland808/bass_drum.wav").toDestination());
    this.#soundMap.set("D2",
      new Tone.Player("./sounds/roland808/snare_drum.wav").toDestination());
    this.#soundMap.set("F#2",
      new Tone.Player("./sounds/roland808/closed_hat.wav").toDestination());
    this.#soundMap.set("A#2",
      new Tone.Player("./sounds/roland808/open_hat.wav").toDestination());
    this.#soundMap.set("D#2",
      new Tone.Player("./sounds/roland808/hand_clap.wav").toDestination());
    this.#soundMap.set("C#2",
      new Tone.Player("./sounds/roland808/rim_shot.wav").toDestination());
    this.#soundMap.set("A2",
      new Tone.Player("./sounds/roland808/low_tom.wav").toDestination());
    this.#soundMap.set("C3",
      new Tone.Player("./sounds/roland808/mid_tom.wav").toDestination());
    this.#soundMap.set("D3",
      new Tone.Player("./sounds/roland808/high_tom.wav").toDestination());
    this.#soundMap.set("C#3",
      new Tone.Player("./sounds/roland808/cymbal.wav").toDestination());
    this.#soundMap.set("G#3",
      new Tone.Player("./sounds/roland808/cowbell.wav").toDestination());
    this.#soundMap.set("E4",
      new Tone.Player("./sounds/roland808/low_conga.wav").toDestination());
    this.#soundMap.set("D4",
      new Tone.Player("./sounds/roland808/mid_conga.wav").toDestination());
    this.#soundMap.set("D#4",
      new Tone.Player("./sounds/roland808/high_conga.wav").toDestination());
    this.#soundMap.set("A#4",
      new Tone.Player("./sounds/roland808/maracas.wav").toDestination());
    this.#soundMap.set("D#5",
      new Tone.Player("./sounds/roland808/claves.wav").toDestination());
  }

  playNote(pitch, durationMs, volumeLeveldB) {
    this.#soundMap.forEach(player => player.volume.value = volumeLeveldB);

    this.#soundMap.get(pitch)?.start(Tone.now());
  }

  clone() {
    return new RolandTR808();
  }
}
import { Voice } from "./voice.js";

export class Piano extends Voice {
  #sampler;

  constructor() {
    super("Piano");
    this.#sampler = new Tone.Sampler({
      urls: {
        C4: "C4.mp3",
        "D#4": "Ds4.mp3",
        "F#4": "Fs4.mp3",
        A4: "A4.mp3",
      },
      release: 1,
      baseUrl: "https://tonejs.github.io/audio/salamander/",
    }).toDestination();
  }

  playNote(pitch, durationMs, volumeLeveldB) {
    this.#sampler.volume.value = volumeLeveldB;

    this.#sampler.triggerAttackRelease(pitch, "8n", Tone.now());
  }

  clone() {
    return new Piano();
  }
}
import { Voice } from "../ableton/voice.js";
import { DrumMachine } from "https://unpkg.com/smplr/dist/index.mjs";

export class TR808 extends Voice {
  #tr808 = new DrumMachine(
    this._audioContext, 
    { instrument: "TR-808" }
  );

  constructor(audioContext) {
    super("TR-808", audioContext);
  }

  playNote(pitch, durationMs, volumeLeveldB) {
    this.#tr808.output.setVolume(volumeLeveldB);

    let sound;

    switch (pitch) {
      case "C4":
        sound = "kick";
        break;
      case "C#4":
        sound = "rimshot";
        break;
      case "D4":
        sound = "snare";
        break;
      case "D#4":
        sound = "clap";
        break;
      case "F#4":
        sound = "hihat-close";
        break;
      case "A4":
        sound = "tom-low";
        break;
      case "A#4":
        sound = "hihat-open";
        break;
      case "C5":
        sound = "mid-tom";
        break;
      case "C#5":
        sound = "cymbal";
        break;
      case "D5":
        sound = "tom-hi";
        break;
      case "G#5":
        sound = "cowbell";
        break;
      case "D6":
        sound = "conga-mid";
        break;
      case "D#6":
        sound = "conga-hi";
        break;
      case "E6":
        sound = "conga-low";
        break;
      case "A#6":
        sound = "maraca";
        break;
      case "D#7":
        sound = "clave";
        break;
      default: return;
    }

    if (durationMs > 0) {
      this.#tr808.start({ note: sound, duration: durationMs / 1000.0 });
    } else {
      this.#tr808.start({ note: sound });
    }
  }

  stopNote(pitch) {
    this.#tr808.stop({ note: pitch });
  }

  clone() {
    return new TR808(this._audioContext);
  }
}
import { Drum } from "../ableton/drum.js";

export class TR808 extends Drum {
  constructor(audioContext) {
    super("TR-808", audioContext, "TR-808");
  }

  playNote(pitch, velocity, durationMs, volume) {
    let sample;

    switch (pitch) {
      case "C4":
        sample = "kick/bd5075";
        break;
      case "C#4":
        sample = "rimshot";
        break;
      case "D4":
        sample = "snare";
        break;
      case "D#4":
        sample = "clap";
        break;
      case "F#4":
        sample = "hihat-close";
        break;
      case "A4":
        sample = "tom-low";
        break;
      case "A#4":
        sample = "hihat-open";
        break;
      case "C5":
        sample = "mid-tom";
        break;
      case "C#5":
        sample = "cymbal";
        break;
      case "D5":
        sample = "tom-hi";
        break;
      case "G#5":
        sample = "cowbell";
        break;
      case "D6":
        sample = "conga-mid";
        break;
      case "D#6":
        sample = "conga-hi";
        break;
      case "E6":
        sample = "conga-low";
        break;
      case "A#6":
        sample = "maraca";
        break;
      case "D#7":
        sample = "clave";
        break;
      default: return;
    }

    super.playNote(sample, velocity, durationMs, volume);
  }

  clone() {
    return new TR808(this._audioContext);
  }
}
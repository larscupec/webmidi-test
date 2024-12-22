import { Drum } from "../ableton/drum.js";

export class CasioRZ1 extends Drum {
  constructor(audioContext) {
    super("Casio-RZ1", audioContext, "Casio-RZ1");
  }

  playNote(pitch, velocity, durationMs, volume) {
    let sample;

    switch (pitch) {
      case "C4":
        sample = "kick";
        break;
      case "D4":
        sample = "snare";
        break;
      case "D#4":
        sample = "clap";
        break;
      case "F#4":
        sample = "hihat-closed";
        break;
      case "A4":
        sample = "tom-1";
        break;
      case "A#4":
        sample = "hihat-open";
        break;
      case "C5":
        sample = "tom-2";
        break;
      case "C#5":
        sample = "crash";
        break;
      case "D5":
        sample = "tom-3";
        break;
      case "G#5":
        sample = "cowbell";
        break;
      case "D#7":
        sample = "clave";
        break;
      default: return;
    }

    super.playNote(sample, velocity, durationMs, volume);
  }

  clone() {
    return new CasioRZ1(this._audioContext);
  }
}
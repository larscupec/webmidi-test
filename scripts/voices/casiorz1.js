import { Drum } from "../ableton/drum.js";

export class CasioRZ1 extends Drum {
  constructor(audioContext) {
    super("Casio-RZ1", audioContext, "Casio-RZ1");
  }

  _getSample(sample) {
    switch (sample) {
      case "kick":
        return "kick";
      case "ac-snare":
        return "snare";
      case "clap":
        return "clap";
      case "closed-hihat":
        return "hihat-closed";
      case "low-tom":
        return "tom-1";
      case "low-mid-tom":
        return "tom-2";
      case "high-tom":
        return "tom-3";
      case "open-hihat":
        return "hihat-open";
      case "crash1":
        return "crash";
      case "cowbell":
        return "cowbell";
      case "claves":
        return "clave";
      default:
        return null;
    }
  }
}
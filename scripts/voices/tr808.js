import { Drum } from "../ableton/drum.js";

export class TR808 extends Drum {
  constructor(audioContext) {
    super("TR-808", audioContext, "TR-808");
  }

  _getSample(sample) {
    switch (sample) {
      case "kick":
        return "kick/bd5075";
      case "side-stick":
        return "rimshot";
      case "ac-snare":
        return "snare";
      case "clap":
        return "clap";
      case "closed-hihat":
        return "hihat-close";
      case "low-tom":
        return "tom-low";
      case "open-hihat":
        return "hihat-open";
      case "mid-tom":
        return "mid-tom";
      case "crash1":
        return "cymbal";
      case "high-tom":
        return "tom-hi";
      case "cowbell":
        return "cowbell";
      case "mute-hi-conga":
        return "conga-mid";
      case "open-hi-conga":
        return "conga-hi";
      case "low-conga":
        return "conga-low";
      case "maracas":
        return "maraca";
      case "claves":
        return "clave";
      default:
        return null;
    }
  }
}
import { Voice } from "../ableton/voice.js";
import { DrumMachine } from "https://unpkg.com/smplr/dist/index.mjs";

export class Drum extends Voice {
  #drumMachine;

  constructor(name, audioContext, instrument) {
    super(name, audioContext);

    this.#drumMachine = new DrumMachine(
      this._audioContext, 
      { instrument: instrument }
    );
  }

  playNote(pitch, velocity, durationMs, volume) {
    let sample;

    switch (pitch) {
      case "C3":
        sample = this._getSample("kick");
        break;
      case "C#3":
        sample = this._getSample("side-stick");
        break;
      case "D3":
        sample = this._getSample("ac-snare");
        break;
      case "D#3":
        sample = this._getSample("clap");
        break;
      case "E3":
        sample = this._getSample("el-snare");
        break;
      case "F3":
        sample = this._getSample("low-floor-tom");
        break;
      case "F#3":
        sample = this._getSample("closed-hihat");
        break;
      case "G3":
        sample = this._getSample("high-floor-tom");
        break;
      case "G#3":
        sample = this._getSample("pedal-hihat");
        break;
      case "A3":
        sample = this._getSample("low-tom");
        break;
      case "A#3":
        sample = this._getSample("open-hihat");
        break;
      case "B3":
        sample = this._getSample("lowmid-tom");
        break;
      case "C4":
        sample = this._getSample("himid-tom");
        break;
      case "C#4":
        sample = this._getSample("crash1");
        break;
      case "D4":
        sample = this._getSample("high-tom");
        break;
      case "D#4":
        sample = this._getSample("ride1");
        break;
      case "E4":
        sample = this._getSample("china");
        break;
      case "F4":
        sample = this._getSample("ride-bell");
        break;
      case "F#4":
        sample = this._getSample("tambourine");
        break;
      case "G4":
        sample = this._getSample("splash");
        break;
      case "G#4":
        sample = this._getSample("cowbell");
        break;
      case "A4":
        sample = this._getSample("crash2");
        break;
      case "A#4":
        sample = this._getSample("vibraslap");
        break;
      case "B4":
        sample = this._getSample("ride2");
        break;
      case "C5":
        sample = this._getSample("hi-bongo");
        break;
      case "C#5":
        sample = this._getSample("low-bongo");
        break;
      case "D5":
        sample = this._getSample("mute-hi-conga");
        break;
      case "D#5":
        sample = this._getSample("open-hi-conga");
        break;
      case "E5":
        sample = this._getSample("low-conga");
        break;
      case "F5":
        sample = this._getSample("high-timbale");
        break;
      case "F#5":
        sample = this._getSample("low-timbale");
        break;
      case "G5":
        sample = this._getSample("high-agogo");
        break;
      case "G#5":
        sample = this._getSample("low-agogo");
        break;
      case "A5":
        sample = this._getSample("cabasa");
        break;
      case "A#5":
        sample = this._getSample("maracas");
        break;
      case "B5":
        sample = this._getSample("short-whistle");
        break;
      case "C6":
        sample = this._getSample("long-whistle");
        break;
      case "C#6":
        sample = this._getSample("short-guiro");
        break;
      case "D6":
        sample = this._getSample("long-guiro");
        break;
      case "D#6":
        sample = this._getSample("claves");
        break;
      case "E6":
        sample = this._getSample("hi-wood-block");
        break;
      case "F6":
        sample = this._getSample("low-wood-block");
        break;
      case "F#6":
        sample = this._getSample("mute-cuica");
        break;
      case "G6":
        sample = this._getSample("open-cuica");
        break;
      case "G#6":
        sample = this._getSample("mute-triangle");
        break;
      case "A6":
        sample = this._getSample("open-triangle");
        break;
      default: return;
    }

    if (sample === null) {
      return;
    }

    this.#drumMachine.output.setVolume(volume);

    if (durationMs > 0) {
      this.#drumMachine.start({ note: sample, velocity: velocity, duration: durationMs / 1000.0 });
    } else {
      this.#drumMachine.start({ note: sample, velocity: velocity });
    }
  }

  stopNote(noteNumber) {
    this.#drumMachine.stop({ note: noteNumber });
  }

  clone() {}

  getMIDIName() {
    return 1;
  }

  // Should return null if no sample is defined for a note
  _getSample(sample) { }
}
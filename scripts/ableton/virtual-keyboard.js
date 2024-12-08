import { MIDIDevice } from "./midi-device.js";

export class VirtualKeyboard extends MIDIDevice {
  #noteOnCallback = null;
  #noteOffCallback = null;

  constructor() {
    super("Keyboard", null);
  }

  addListener(type, callback) {
    switch (type) {
      case "noteon":
        this.#noteOnCallback = callback;
        break;
      case "noteoff":
        this.#noteOffCallback = callback;
        break;
    
      default:
        break;
    }
  }

  removeListener(type) { 
    switch (type) {
      case "noteon":
        this.#noteOnCallback = null;
        break;
      case "noteoff":
        this.#noteOffCallback = null;
        break;
    
      default:
        break;
    }
  }

  keyDown(key) {
    let event = { note: { rawAttack: 127 } };

    switch (key) {
      case "q":
        event.note.identifier = "C4";
        break;
      case "2":
        event.note.identifier = "C#4";
        break;
      case "w":
        event.note.identifier = "D4";
        break;
      case "3":
        event.note.identifier = "D#4";
        break;
      case "e":
        event.note.identifier = "E4";
        break;
      case "r":
        event.note.identifier = "F4";
        break;
      case "5":
        event.note.identifier = "F#4";
        break;
      case "t":
        event.note.identifier = "G4";
        break;
      case "6":
        event.note.identifier = "G#4";
        break;
      case "z":
        event.note.identifier = "A4";
        break;
      case "7":
        event.note.identifier = "A#4";
        break;
      case "u":
        event.note.identifier = "B4";
        break;
      case "i":
        event.note.identifier = "C5";
        break;
    
      default:
        break;
    }

    this.#noteOnCallback?.(event);
  }

  keyUp(key) {
    let event = { note: {} };

    switch (key) {
      case "q":
        event.note.identifier = "C4";
        break;
      case "2":
        event.note.identifier = "C#4";
        break;
      case "w":
        event.note.identifier = "D4";
        break;
      case "3":
        event.note.identifier = "D#4";
        break;
      case "e":
        event.note.identifier = "E4";
        break;
      case "r":
        event.note.identifier = "F4";
        break;
      case "5":
        event.note.identifier = "F#4";
        break;
      case "t":
        event.note.identifier = "G4";
        break;
      case "6":
        event.note.identifier = "G#4";
        break;
      case "z":
        event.note.identifier = "A4";
        break;
      case "7":
        event.note.identifier = "A#4";
        break;
      case "u":
        event.note.identifier = "B4";
        break;
      case "i":
        event.note.identifier = "C5";
        break;
    
      default:
        break;
    }

    this.#noteOffCallback?.(event);
  }
}
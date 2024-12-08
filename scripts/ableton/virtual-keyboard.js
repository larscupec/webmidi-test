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
    }

    this.#noteOnCallback?.(event);
  }

  keyUp(key) {
    let event = { note: {} };

    switch (key) {
      case "q":
        event.note.identifier = "C4";
        event.note.number = 60;
        break;
      case "2":
        event.note.identifier = "C#4";
        event.note.number = 61;
        break;
      case "w":
        event.note.identifier = "D4";
        event.note.number = 62;
        break;
      case "3":
        event.note.identifier = "D#4";
        event.note.number = 63;
        break;
      case "e":
        event.note.identifier = "E4";
        event.note.number = 64;
        break;
      case "r":
        event.note.identifier = "F4";
        event.note.number = 65;
        break;
      case "5":
        event.note.identifier = "F#4";
        event.note.number = 66;
        break;
      case "t":
        event.note.identifier = "G4";
        event.note.number = 67;
        break;
      case "6":
        event.note.identifier = "G#4";
        event.note.number = 68;
        break;
      case "z":
        event.note.identifier = "A4";
        event.note.number = 69;
        break;
      case "7":
        event.note.identifier = "A#4";
        event.note.number = 70;
        break;
      case "u":
        event.note.identifier = "B4";
        event.note.number = 71;
        break;
      case "i":
        event.note.identifier = "C5";
        event.note.number = 72;
        break;
    }

    this.#noteOffCallback?.(event);
  }
}
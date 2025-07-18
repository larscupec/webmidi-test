import { Pattern } from "./pattern.js";
import { Timing } from "./timing.js";
import { RecordBuffer } from "./record-buffer.js";
import { NoteHistory } from "./note-history.js";
import { Note } from "./note.js";

export class Channel {
  #name;
  #voice;
  #volume = 100;
  #isMuted = false;
  #isSoloed = false;
  #preMuteVolume = this.#volume;

  #pattern = new Pattern();
  #recordBuffer = new RecordBuffer();
  #noteHistory = new NoteHistory();

  constructor(name, voice) {
    this.#name = name;
    this.#voice = voice;
  }

  play(note) {
    this.#voice.playNote(note.getPitch(), note.getVelocity(), note.getDurationMs(), this.#volume);
  }

  recordNoteStart(pitch, velocity, currentSongTimeMs) {
    this.#recordBuffer.add(pitch, velocity, currentSongTimeMs);
  }

  recordNoteEnd(pitch, currentSongTimeMs, drawCallback) {
    let noteStart = this.#recordBuffer.get(pitch);
    this.#recordBuffer.remove(pitch);

    if (!noteStart) {
      return;
    }

    let startStep = Timing.quantizeTimeToStep(noteStart.startTime);
    if (startStep >= Timing.calcTotalStepCount()) {
      startStep = 0;
    }

    let dontPlay = false;

    let startStepTimeMs = Timing.convStepToTimeMs(startStep)
    if (startStepTimeMs >= currentSongTimeMs) {
      dontPlay = true;
    }

    let durationMs = currentSongTimeMs - noteStart.startTime;
    if (durationMs < 0) {
      durationMs = Timing.calcSongDurationMs() - noteStart.startTime;
      dontPlay = false;
    }

    if (durationMs < 0) {
      durationMs = Timing.calcStepDurationMs();
    }

    let note = new Note(pitch, noteStart.velocity, durationMs, dontPlay);

    this.#pattern.add(note, startStep);

    this.#noteHistory.add({ note: note, startStep: startStep });

    drawCallback?.(this, note, startStep);
  }

  getIsMuted() {
    return this.#isMuted;
  }

  getIsSoloed() {
    return this.#isSoloed;
  }

  getName() {
    return this.#name;
  }

  getVoice() {
    return this.#voice;
  }

  getVolume() {
    return this.#volume;
  }

  getPattern() {
    return this.#pattern;
  }

  getNoteHistory() {
    return this.#noteHistory;
  }

  setVoice(voice) {
    this.#voice = voice;
  }

  setIsMuted(isMuted) {
    if (isMuted == this.#isMuted) return;

    this.#isMuted = isMuted;

    if (this.#isMuted) {
      this.#preMuteVolume = this.#volume;
      this.#volume = 0;
    } else {
      this.#volume = this.#preMuteVolume;
    }
  }

  setIsSoloed(isSoloed) {
    this.#isSoloed = isSoloed;
  }

  setVolume(volume) {
    if (this.#isMuted) {
      this.#preMuteVolume = volume;
    } else {
      this.#volume = volume;
    }
  }
}
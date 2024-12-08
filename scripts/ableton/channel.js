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
  #isArmedForRecording = false;
  #preMuteVolume = this.#volume;

  #pattern = new Pattern();
  #recordBuffer = new RecordBuffer();

  constructor(name, voice) {
    this.#name = name;
    this.#voice = voice;
  }

  play(note) {
    this.#voice.playNote(note.getPitch(), note.getDurationMs(), this.#volume);
  }

  recordNoteStart(pitch, currentSongTimeMs) {
    this.#recordBuffer.push(pitch, Timing.quantizeTimeToStep(currentSongTimeMs, "loose"));
  }

  recordNoteEnd(pitch, currentSongTimeMs, drawCallback) {
    let startStep = this.#recordBuffer.pop(pitch);
    if (startStep) {
      let durationMs = currentSongTimeMs - Timing.convStepToTimeMs(startStep);

      let stepDurationMs = Timing.calcStepDurationMs();
      if (durationMs < stepDurationMs) {
        durationMs = stepDurationMs;
      }

      let note = new Note(pitch, durationMs);

      this.#pattern.add(note, startStep);

      NoteHistory.add({ channel: this, note: note, startStep: startStep });

      drawCallback?.(this, note, startStep);
    }
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

  getIsArmedForRecording() {
    return this.#isArmedForRecording;
  }

  setVoice(voice) {
    this.#voice = voice;
  }

  setIsMuted(isMuted) {
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
    this.#volume = volume;
  }

  setIsArmedForRecording(isArmedForRecording) {
    this.#isArmedForRecording = isArmedForRecording;
  }
}
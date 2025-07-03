import { Timing } from "./timing.js";
import { Metronome } from "./metronome.js";

export class Player {
  #isSongPlaying = false;
  #songTimer = null;
  #metronome = new Metronome();
  #isMetronomeOn = false;
  #isArmedForRecording = false;
  #isRecording = false;

  #currentSongTimeMs = 0;
  #lastStep = -1;

  #channelRack;

  constructor(channelRack) {
    this.#channelRack = channelRack;
  }

  playSong(updateUICallback) {
    this.#isSongPlaying = true;

    if (this.getIsArmedForRecording()) {
      let countdown = Timing.getTimeSignature().getUpperNumeral() - 1;

      this.#playCountdown(countdown, updateUICallback);

      return;
    }

    this.#startSong(updateUICallback);
  }

  #startSong(updateUICallback) {
    let startTimeMs = Date.now() - this.#currentSongTimeMs;

    this.#songTimer = setTimeout(() => this.#update(startTimeMs, updateUICallback));
  }

  pauseSong() {
    clearTimeout(this.#songTimer);

    this.#isSongPlaying = false;
    this.#isRecording = false;
  }

  stopSong() {
    clearTimeout(this.#songTimer);

    this.#isSongPlaying = false;
    this.#isRecording = false;
    this.#currentSongTimeMs = 0;
    this.#lastStep = -1;
  }

  #playCountdown(countdown, updateUICallback) {
    if (countdown == Timing.getTimeSignature().getUpperNumeral() - 1) {
      this.#metronome.playFirstBeatClick();
    } else {
      this.#metronome.playBeatClick();
    }

    if (countdown == 0) {
      this.#songTimer = setTimeout(
        () => this.#startSong(updateUICallback),
        Timing.calcBeatDurationMs()
      );
      if (this.#isArmedForRecording) {
        this.#isRecording = true;
      }
      return;
    }

    this.#songTimer = setTimeout(
      () => this.#playCountdown(countdown - 1, updateUICallback),
      Timing.calcBeatDurationMs()
    );
  }

  #update(startTimeMs, updateUICallback) {
    const currentTime = Date.now();

    this.#currentSongTimeMs = currentTime - startTimeMs;

    if (this.#currentSongTimeMs >= Timing.calcSongDurationMs()) {
      startTimeMs = currentTime;
      this.#currentSongTimeMs = this.#currentSongTimeMs - Timing.calcSongDurationMs();
    }

    updateUICallback();

    let currentStep = this.getCurrentStep();

    if (currentStep != this.#lastStep) {
      this.#lastStep = currentStep;

      // Play metronome clicks

      if (this.#isMetronomeOn &&
          currentStep % (16 / Timing.getTimeSignature().getLowerNumeral()) == 0 &&
          currentStep != Timing.calcTotalStepCount() - 1) {
        
        if (currentStep % Timing.calcStepCountPerBar() == 0) {
          this.#metronome.playFirstBeatClick();
        } else {
          this.#metronome.playBeatClick();
        }
      }

      // Play MIDI notes

      for (let i = 0; i < this.#channelRack.getChannelCount(); i++) {
        let channel = this.#channelRack.getChannelAt(i);
        let pattern = channel.getPattern();
        let notes = pattern.getNotes(currentStep);

        notes?.forEach(note => {
          if (!note.dontPlay) channel.play(note);
          else note.dontPlay = false;
        });
      }
    }

    this.#songTimer = setTimeout(() => this.#update(startTimeMs, updateUICallback));
  }

  getIsSongPlaying() {
    return this.#isSongPlaying;
  }

  getIsSongPaused() {
    return !this.#isSongPlaying && this.#currentSongTimeMs > 0;
  }

  getIsArmedForRecording() {
    return this.#isArmedForRecording;
  }

  getIsRecording() {
    return this.#isRecording;
  }

  getCurrentSongTimeMs() {
    return this.#currentSongTimeMs;
  }

  getCurrentStep() {
    return Timing.quantizeTimeToStep(this.#currentSongTimeMs, true);
  }

  getIsMetronomeOn() {
    return this.#isMetronomeOn;
  }

  setIsMetronomeOn(isMetronomeOn) {
    this.#isMetronomeOn = isMetronomeOn;
  }

  setIsArmedForRecording(isArmedForRecording) {
    this.#isArmedForRecording = isArmedForRecording;
    
    if (this.#isSongPlaying) {
      this.#isRecording = isArmedForRecording;
    }
  }
}
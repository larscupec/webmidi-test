import { Timing } from "./timing.js";
import { Metronome } from "./metronome.js";

export class Player {
  #isSongPlaying = false;
  #songTimer = null;
  #metronome = new Metronome();
  #isMetronomeOn = false;
  #isArmedForRecording = false;
  #isRecording = false;

  #currentSongTimMs = 0;
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
    let startTimeMs = Date.now() - this.#currentSongTimMs;

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
    this.#currentSongTimMs = 0;
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

    this.#currentSongTimMs = currentTime - startTimeMs;

    if (this.#currentSongTimMs >= Timing.calcSongDurationMs()) {
      startTimeMs = currentTime;
      this.#currentSongTimMs = this.#currentSongTimMs - Timing.calcSongDurationMs();
    }

    updateUICallback();

    let currentStep = this.getCurrentStep();

    if (currentStep != this.#lastStep) {
      this.#lastStep = currentStep;

      // Play metronome clicks

      if ((currentStep + 1) % (16 / Timing.getTimeSignature().getLowerNumeral()) == 1 &&
        this.#isMetronomeOn && currentStep != Timing.calcTotalStepCount() - 1) {
          
        if ((currentStep + 1) % Timing.calcStepCountPerBar() == 1) {
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

  getIsArmedForRecording() {
    return this.#isArmedForRecording;
  }

  getIsRecording() {
    return this.#isRecording;
  }

  getCurrentSongTimeMs() {
    return this.#currentSongTimMs;
  }

  getCurrentStep() {
    return Timing.quantizeTimeToStep(this.#currentSongTimMs);
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
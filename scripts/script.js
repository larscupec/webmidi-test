import { MIDIDevice, VirtualKeyboard } from "./ableton/midi-device.js";
import * as Ableton from "./ableton.js";
import { Timing } from "./ableton/timing.js";
import { NoteHistory } from "./ableton/note-history.js";

// MIDI Input

const inputDevices = [];
let currentInputDevice = null;

// On-screen keyboard

let isKeyboardVisible = true;

// Timers

let playButtonBlinkTimer = null;
let recordButtonBlinkTimer = null;

// Colors

const RECORD_BUTTON_RED = "rgb(237, 40, 57)";
const PLAY_BUTTON_GREEN = "rgb(198, 249, 83)";
const BUTTON_COLOR = "rgb(233, 233, 237)";
const BUTTON_BORDER_COLOR = "rgb(143, 143, 157)";
const BUTTON_ACTIVE_COLOR = "rgb(177, 177, 185)";
const BUTTON_ACTIVE_BORDER_COLOR = "rgb(72, 72, 81)";

// Initialize window function delegates

window.onresize = () => {
  updatePlayheadPosition();
  resizePatternCanvases();
};
window.onload = () => {
  drawChannelRack();
  drawArrangement();
  drawKeyboard();

  document.getElementById("activate-sound").addEventListener("click", async () => {
    await Tone.start();
    document.getElementById("activate-sound").innerText = "Sound ✔";
  });

  if (navigator.userAgent.includes("Chrome")) {
    document.getElementById("splash").innerText = "Hello Chrome!";
  }

  document.addEventListener("keydown", (event) => playKeyPressed(event));
  document.addEventListener("keydown", (event) => pauseKeyPressed(event));
  document.addEventListener("keydown", (event) => recordKeyPressed(event));
  document.addEventListener("keydown", (event) => undoKeyPressed(event));
  document.addEventListener("keydown", (event) => redoKeyPressed(event));
};
window.playPauseSong = () => {
  if (Ableton.player.getIsSongPlaying()) {
    Ableton.player.pauseSong();

    document.getElementById("play-btn").innerText = "▶";

    playButtonBlinkTimer = setTimeout(() => changePlayButtonColor(false));
    clearTimeout(recordButtonBlinkTimer);

    let recordButton = document.getElementById("record-btn");
    if (Ableton.player.getIsArmedForRecording()) {
      recordButton.style.color = RECORD_BUTTON_RED;
    } else {
      recordButton.style.color = "black";
    }
  } else {
    Ableton.player.playSong(() => {
      document.getElementById("song-time").innerText =
        msToMinSecMs(Ableton.player.getCurrentSongTimeMs());

      updatePlayheadPosition();
    });

    document.getElementById("playhead").style.visibility = "visible";

    let playButton = document.getElementById("play-btn");
    playButton.innerText = "⏸";
    playButton.style.color = "black";

    clearTimeout(playButtonBlinkTimer);

    if (Ableton.player.getIsArmedForRecording()) {
      recordButtonBlinkTimer = setTimeout(() => changeRecordButtonColor(true));
    }
  }
};
window.stopSong = () => {
  Ableton.player.stopSong();

  document.getElementById("playhead").style.visibility = "hidden";

  let playButton = document.getElementById("play-btn");
  playButton.innerText = "▶";
  playButton.style.color = "black";

  document.getElementById("song-time").innerText =
    msToMinSecMs(Ableton.player.getCurrentSongTimeMs());

  updatePlayheadPosition();
  clearTimeout(playButtonBlinkTimer);
  clearTimeout(recordButtonBlinkTimer);

  let recordButton = document.getElementById("record-btn");
  if (Ableton.player.getIsArmedForRecording()) {
    recordButton.style.color = RECORD_BUTTON_RED;
  } else {
    recordButton.style.color = "black";
  }
};
window.toggleRecording = () => {
  let isArmed = Ableton.player.getIsArmedForRecording();
  Ableton.player.setIsArmedForRecording(!isArmed);

  let recordButton = document.getElementById("record-btn");

  if (Ableton.player.getIsArmedForRecording()) {
    recordButton.style.color = RECORD_BUTTON_RED;
    if (Ableton.player.getIsSongPlaying()) {
      recordButtonBlinkTimer = setTimeout(() => changeRecordButtonColor(true));
    }
  } else {
    recordButton.style.color = "black";
    clearTimeout(recordButtonBlinkTimer);
  }
};
window.toggleKeyboardVisibility = toggleKeyboardVisibility;
window.toggleMetronome = toggleMetronome;
window.setBPM = setBPM;

// Start WebMidi

WebMidi
  .enable()
  .then(onEnabled)
  .catch(err => alert(err));

function onEnabled() {
  let inputSelect = document.getElementById("input-select");

  WebMidi.inputs.forEach(input => {
    let option = document.createElement("option");
    option.value = `${input.name}`;
    option.innerText = `${input.name}`;

    inputSelect.appendChild(option);

    inputDevices.push(new MIDIDevice(input.name, input));
  });

  let virtualKeyboard = new VirtualKeyboard();

  let option = document.createElement("option");
  option.value = `${virtualKeyboard.getName()}`;
  option.innerText = `${virtualKeyboard.getName()}`;

  inputSelect.appendChild(option);

  inputDevices.push(virtualKeyboard);

  selectInputDevice(inputDevices[0].getName());

  inputSelect.addEventListener("change", (event) => changeInputDevice(event));
  document.addEventListener("keydown", (event) => virtualKeyboard.keyDown(event.key));
  document.addEventListener("keyup", (event) => virtualKeyboard.keyUp(event.key));
}

// Drawing functions

function drawChannelRack() {
  let channelRackElement = document.getElementById("channel-rack");

  for (let i = 0; i < Ableton.channelRack.getChannelCount(); i++) {
    let channel = document.createElement("div");
    channel.className = "channel";
    channel.id = `channel-${i}`;

    channelRackElement.appendChild(channel);

    let channelInfo = document.createElement("div");
    channelInfo.className = "channel-info";

    channel.appendChild(channelInfo);

    let channelName = document.createElement("p");
    channelName.id = `channel-${i}-name`;
    channelName.innerText = `${Ableton.channelRack.getChannelAt(i).getName()}`;

    channelInfo.appendChild(channelName);

    let channelVoice = document.createElement("select");
    channelVoice.id = `channel-${i}-voice`;
    channelVoice.className = `voice-select`;

    for (const voice of Ableton.voices) {
      let voiceOption = document.createElement("option");
      voiceOption.value = `${voice.getName()}`;
      voiceOption.innerText = `${voice.getName()}`;

      channelVoice.appendChild(voiceOption);
    }

    channelVoice.value = Ableton.channelRack.getChannelAt(i).getVoice().getName();

    channelInfo.appendChild(channelVoice);

    let muteSoloButtons = document.createElement("div");
    muteSoloButtons.className = "mute-solo-btn";

    channelInfo.appendChild(muteSoloButtons);

    let muteButton = document.createElement("button");
    muteButton.type = "button";
    muteButton.id = `channel-${i}-mute`;
    muteButton.innerText = "M";

    muteSoloButtons.appendChild(muteButton);

    let soloButton = document.createElement("button");
    soloButton.type = "button";
    soloButton.id = `channel-${i}-solo`;
    soloButton.innerText = "S";

    muteSoloButtons.appendChild(soloButton);

    let volumeFader = document.createElement("input");
    volumeFader.type = "range";
    volumeFader.id = `channel-${i}-volume`;
    volumeFader.className = "channel-fader";
    volumeFader.min = -12;
    volumeFader.max = 3;
    volumeFader.value = 0;
    volumeFader.step = 0.25;

    channelInfo.appendChild(volumeFader);

    let recordButton = document.createElement("button");
    recordButton.type = "button";
    recordButton.id = `channel-${i}-record`;
    recordButton.className = "record-btn";
    recordButton.innerText = "R";

    channelInfo.appendChild(recordButton);

    channel.addEventListener("click", (event) => selectChannel(i));
    channelVoice.addEventListener("change", (event) => setChannelVoice(event, i));
    channelVoice.addEventListener("click", (event) => event.stopPropagation());
    muteButton.addEventListener("click", (event) => toggleMuteChannel(event, i));
    soloButton.addEventListener("click", (event) => toggleSoloChannel(event, i));
    volumeFader.addEventListener("input", (event) => setChannelVolume(event, i));
    volumeFader.addEventListener("click", (event) => event.stopPropagation());
    recordButton.addEventListener("click", (event) => toggleIsChannelArmed(event, i));
  }

  selectChannel(Ableton.channelRack.getChannelIndex(Ableton.channelRack.getCurrentChannel()));
}

function drawArrangement() {
  let trackCount = Ableton.channelRack.getChannelCount();
  let barCount = Timing.getBarCount();
  let division = Timing.getTimeSignature().getUpperNumeral();

  let arrangement = document.getElementById("arrangement");

  for (let i = 0; i < trackCount; i++) {
    let track = document.createElement("div");
    track.className = "track";
    track.id = `track-${i}`;
    track.style = `grid-template-columns: repeat(${barCount}, 1fr); grid-row: ${i + 2};`;

    track.addEventListener("click", (event) => selectChannel(i));

    arrangement.appendChild(track);

    for (let j = 0; j < barCount; j++) {
      let bar = document.createElement("div");
      bar.className = "bar";
      bar.style = `grid-template-columns: repeat(${division}, 1fr); grid-column: ${j + 1};`;

      track.appendChild(bar);

      for (let k = 0; k < division; k++) {
        let beat = document.createElement("div");
        beat.className = "beat";

        bar.appendChild(beat);
      }
    }

    let pattern = document.createElement("div");
    pattern.id = `pattern-${i}`;
    pattern.className = "pattern";
    pattern.style.visibility = "hidden";

    track.appendChild(pattern);

    let patternCanvas = document.createElement("canvas");
    patternCanvas.id = `pattern-${i}-canvas`;
    patternCanvas.innerText = `pattern for track ${i + 1}`;

    let patternBoundingRect = pattern.getBoundingClientRect();
    let patternWidth = patternBoundingRect.right - patternBoundingRect.left;
    let patternHeight = patternBoundingRect.bottom - patternBoundingRect.top;

    patternCanvas.width = Math.floor(patternWidth);
    patternCanvas.height = Math.floor(patternHeight);

    pattern.appendChild(patternCanvas);

    let deletePatternButton = document.createElement("button");
    deletePatternButton.innerText = "X";
    deletePatternButton.addEventListener("click", (event) => deletePattern(event, i));

    pattern.appendChild(deletePatternButton);
  }

  const timeline = document.getElementById("timeline");
  for (let i = 0; i < barCount; i++) {
    timeline.innerHTML += `<p>${i ? i + 1 : ""}</p>`;
  }
}

function drawKeyboard() {
  let notes = ["C", "D", "E", "F", "G", "A", "B"];
  const OCTAVE_COUNT = 8;
  let pianoHTML = "";

  for (let i = 0; i < OCTAVE_COUNT; i++) {
    for (let j = 0; j < notes.length; j++) {
      let note = notes[j];
      let octave = i + 1;
      let hasSharp = note != "E" && note != "B";

      pianoHTML += `<div class="whitenote" 
                      id="${note}${octave}" data-note="${note}${octave}">`;

      if (hasSharp) {
        pianoHTML += `<div class="blacknote" 
                        id="${note}#${octave}" data-note="${note}#${octave}"></div>`;
      }

      if (note == "C") {
        pianoHTML += `<p>C${octave}</p>`;
      }

      pianoHTML += `</div>`;
    }
  }

  document.getElementById("keyboard").innerHTML = pianoHTML;

  for (let i = 0; i < OCTAVE_COUNT; i++) {
    for (let j = 0; j < notes.length; j++) {
      let note = notes[j];
      let octave = i + 1;
      let hasSharp = note != "E" && note != "B";

      let key = document.getElementById(`${note}${octave}`);

      key.addEventListener("mousedown", (event) => keyDown(key.dataset.note, event));
      key.addEventListener("mouseup", (event) => keyUp(key.dataset.note, event));
      key.addEventListener("mouseout", (event) => keyUp(key.dataset.note, event));

      if (hasSharp) {
        let keySharp = document.getElementById(`${note}#${octave}`);

        keySharp.addEventListener("mousedown", (event) => keyDown(keySharp.dataset.note, event));
        keySharp.addEventListener("mouseup", (event) => keyUp(keySharp.dataset.note, event));
        keySharp.addEventListener("mouseout", (event) => keyUp(keySharp.dataset.note, event));
      }
    }
  }
}

// UI callbacks

function setChannelVoice(event, channelIndex) {
  Ableton.channelRack.getChannelAt(channelIndex).setVoice(
    Ableton.voices.find(voice => voice.getName() === event.target.value).clone());
}

function toggleMuteChannel(event, channelIndex) {
  let channel = Ableton.channelRack.getChannelAt(channelIndex);
  let isChannelMuted = channel.getIsMuted();
  channel.setIsMuted(!isChannelMuted);

  event.stopPropagation();

  if (channel.getIsMuted()) {
    event.target.style.backgroundColor = BUTTON_ACTIVE_COLOR;
    event.target.style.borderColor = BUTTON_ACTIVE_BORDER_COLOR;
  } else {
    event.target.style.backgroundColor = BUTTON_COLOR;
    event.target.style.borderColor = BUTTON_BORDER_COLOR;
  }
}

function toggleSoloChannel(event, channelIndex) {
  let channel = Ableton.channelRack.getChannelAt(channelIndex);
  let isChannelSoloed = channel.getIsSoloed();

  channel.setIsSoloed(!isChannelSoloed);
  channel.setIsMuted(false);

  let muteButton = document.getElementById(`channel-${channelIndex}-mute`);
  muteButton.style.backgroundColor = BUTTON_COLOR;
  muteButton.style.borderColor = BUTTON_BORDER_COLOR;

  event.stopPropagation();

  if (channel.getIsSoloed()) {
    event.target.style.backgroundColor = BUTTON_ACTIVE_COLOR;
    event.target.style.borderColor = BUTTON_ACTIVE_BORDER_COLOR;
  } else {
    event.target.style.backgroundColor = BUTTON_COLOR;
    event.target.style.borderColor = BUTTON_BORDER_COLOR;
  }

  for (let i = 0; i < Ableton.channelRack.getChannelCount(); i++) {
    if (i === channelIndex) continue;

    let c = Ableton.channelRack.getChannelAt(i);
    c.setIsMuted(channel.getIsSoloed());
    c.setIsSoloed(false);

    let muteButton = document.getElementById(`channel-${i}-mute`);
    muteButton.style.backgroundColor = c.getIsMuted() ? BUTTON_ACTIVE_COLOR : BUTTON_COLOR;
    muteButton.style.borderColor = c.getIsMuted() ? BUTTON_ACTIVE_BORDER_COLOR : BUTTON_BORDER_COLOR;

    let soloButton = document.getElementById(`channel-${i}-solo`);
    soloButton.style.backgroundColor = c.getIsSoloed() ? BUTTON_ACTIVE_COLOR : BUTTON_COLOR;
    soloButton.style.borderColor = c.getIsSoloed() ? BUTTON_ACTIVE_BORDER_COLOR : BUTTON_BORDER_COLOR;
  }
}

function toggleIsChannelArmed(event, channelIndex) {
  let isChannelArmed = Ableton.channelRack.getChannelAt(channelIndex).getIsArmedForRecording();
  Ableton.channelRack.getChannelAt(channelIndex).setIsArmedForRecording(!isChannelArmed);

  event.stopPropagation();

  if (Ableton.channelRack.getChannelAt(channelIndex).getIsArmedForRecording()) {
    event.target.style.backgroundColor = BUTTON_ACTIVE_COLOR;
    event.target.style.borderColor = BUTTON_ACTIVE_BORDER_COLOR;
    event.target.style.color = "red";
  } else {
    event.target.style.backgroundColor = BUTTON_COLOR;
    event.target.style.borderColor = BUTTON_BORDER_COLOR;
    event.target.style.color = "black";
  }
}

function setChannelVolume(event, channelIndex) {
  let currentChannel = Ableton.channelRack.getChannelAt(channelIndex);
  currentChannel.setVolumeLevel(event.target.value);
  event.stopPropagation();
}

function selectChannel(channelIndex) {
  let currentChannelIndex = Ableton.channelRack.getChannelIndex(Ableton.channelRack.getCurrentChannel());

  let currentChannel = document.getElementById(`channel-${currentChannelIndex}`);
  let currentChannelName = document.getElementById(`channel-${currentChannelIndex}-name`);

  currentChannel.style.backgroundColor = "rgb(190, 190, 190)";
  currentChannelName.style.textDecoration = "none";

  currentChannel = document.getElementById(`channel-${channelIndex}`);
  currentChannelName = document.getElementById(`channel-${channelIndex}-name`);

  currentChannel.style.backgroundColor = "rgb(180, 180, 180)";
  currentChannelName.style.textDecoration = "underline";

  Ableton.channelRack.setCurrentChannelByIndex(channelIndex);
}

function selectInputDevice(deviceName) {
  currentInputDevice?.removeListener("noteon");
  currentInputDevice?.removeListener("noteoff");

  currentInputDevice = inputDevices.find(device => device.getName() === deviceName);

  currentInputDevice?.addListener("noteon", (e) => {
    if (!("identifier" in e.note)) return;

    let pitch = e.note.identifier;
    keyDown(pitch);
  });

  currentInputDevice?.addListener("noteoff", (e) => {
    if (!("identifier" in e.note)) return;

    let pitch = e.note.identifier;
    keyUp(pitch);
  });
}

function changeInputDevice(event) {
  selectInputDevice(event.target.value);
}

function toggleKeyboardVisibility() {
  isKeyboardVisible = !isKeyboardVisible;

  if (isKeyboardVisible) {
    document.getElementById("footer").style.display = "flex";
  } else {
    document.getElementById("footer").style.display = "none";
  }
}

function toggleMetronome() {
  Ableton.player.setIsMetronomeOn(!Ableton.player.getIsMetronomeOn());
}

function setBPM() {
  Timing.setBPM(document.getElementById("bpm-select").value);
}

function deletePattern(event, channelIndex) {
  Ableton.channelRack.getChannelAt(channelIndex).getPattern().clear();

  let patternCanvas = document.getElementById(`pattern-${channelIndex}-canvas`);
  let ctx = patternCanvas.getContext("2d");
  ctx.clearRect(0, 0, patternCanvas.width, patternCanvas.height);

  let pattern = document.getElementById(`pattern-${channelIndex}`);
  pattern.style.visibility = "hidden";

  event.stopPropagation();
}

// MIDI input callbacks

function keyDown(pitch, event = null) {
  let pianoKey = document.getElementById(pitch);

  if (pianoKey) {
    pianoKey.style.background = pitch.includes("#") ? "black" : "rgb(204, 204, 204)";
  }

  event?.stopPropagation();

  let currentChannel = Ableton.channelRack.getCurrentChannel();

  // To avoid the Tone.js timing error, use the original voice instance
  // to play sounds from the user and use clones to play notes from
  // patterns.
  let currentChannelVoice = Ableton.voices.find(
    (voice) => voice.getName() === currentChannel.getVoice().getName()
  );
  currentChannelVoice.playNote(pitch, 0, currentChannel.getVolumeLeveldB());

  if (Ableton.player.getIsRecording() && currentChannel.getIsArmedForRecording()) {
    currentChannel.recordNoteStart(pitch, Ableton.player.getCurrentSongTimeMs());
  }
}

function keyUp(note, event = null) {
  let pianoKey = document.getElementById(note);

  if (pianoKey) {
    pianoKey.style.background = note.includes("#") ? "rgb(75, 75, 75)" : "rgb(236, 236, 236)";
  }

  event?.stopPropagation();

  let currentChannel = Ableton.channelRack.getCurrentChannel();
  let pattern = currentChannel.getPattern();
  let player = Ableton.player;

  if (player.getIsRecording() && currentChannel.getIsArmedForRecording()) {
    let noteOctave = note.replace(/[^0-9]/g, "");
    
    if (noteOctave >= pattern.getLowestOctave() && noteOctave <= pattern.getHighestOctave()) {
      currentChannel.recordNoteEnd(note, Ableton.player.getCurrentSongTimeMs(), drawNote);
    } else {
      currentChannel.recordNoteEnd(note, Ableton.player.getCurrentSongTimeMs(), null);
      redrawPattern(Ableton.channelRack.getChannelIndex(currentChannel));
    }
  }
}

// Key press callbacks

function undoKeyPressed(event) {
  if (event.key === "z" && event.ctrlKey) {
    let lastPlayedNote = NoteHistory.undo();

    if (!lastPlayedNote) return;

    let pattern = lastPlayedNote.channel.getPattern();

    pattern.remove(lastPlayedNote.note, lastPlayedNote.startStep);

    redrawPattern(Ableton.channelRack.getChannelIndex(lastPlayedNote.channel));
  }
}

function redoKeyPressed(event) {
  if (event.key === "y" && event.ctrlKey) {
    let lastDeletedNote = NoteHistory.redo();

    if (!lastDeletedNote) return;

    let pattern = lastDeletedNote.channel.getPattern();

    pattern.add(lastDeletedNote.note, lastDeletedNote.startStep);

    drawNote(lastDeletedNote.channel, lastDeletedNote.note, lastDeletedNote.startStep);
  }
}

function playKeyPressed(event) {
  if (event.key === " ") {
    if (Ableton.player.getIsSongPlaying() || Ableton.player.getCurrentSongTimeMs() != 0) {
      window.stopSong();
    } else {
      window.playPauseSong();
    }
  }
}

function pauseKeyPressed(event) {
  if (event.key === "Pause") {
    window.playPauseSong();
  }
}

function recordKeyPressed(event) {
  if (event.key === "R") {
    window.toggleRecording();
  }
}

// Helper functions

function msToMinSecMs(timeMs) {
  let min = Math.floor(timeMs / 60e3);
  let sec = Math.floor((timeMs % 60e3) / 1000);
  let ms = ((timeMs % 1000) / 10).toFixed(0);

  return (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec) + ":" + (ms < 10 ? "0" + ms : ms);
}

function updatePlayheadPosition() {
  let arrangemenet = document.getElementById("arrangement");
  let playhead = document.getElementById("playhead");

  let arrangementWidth = arrangemenet.getBoundingClientRect().right -
    arrangemenet.getBoundingClientRect().left;
  let songPerc = Ableton.player.getCurrentSongTimeMs() / Timing.calcSongDurationMs();

  playhead.style.left = `${arrangementWidth * songPerc}px`;
}

function changePlayButtonColor(isGreen) {
  if (isGreen) {
    document.getElementById("play-btn").style.color = PLAY_BUTTON_GREEN;
  } else {
    document.getElementById("play-btn").style.color = "black";
  }
  playButtonBlinkTimer = setTimeout(() => changePlayButtonColor(!isGreen), 1000);
}

function changeRecordButtonColor(isRed) {
  if (isRed) {
    document.getElementById("record-btn").style.color = RECORD_BUTTON_RED;
  } else {
    document.getElementById("record-btn").style.color = "black";
  }
  recordButtonBlinkTimer = setTimeout(() => changeRecordButtonColor(!isRed), 1000);
}

function drawNote(channel, note, startStep) {
  let channelIndex = Ableton.channelRack.getChannelIndex(channel);

  let pattern = document.getElementById(`pattern-${channelIndex}`);
  if (pattern.style.visibility != "visible") {
    pattern.style.visibility = "visible";

    let r = Math.floor(Math.random() * (255 - 100) + 100);
    let b = Math.floor(Math.random() * (255 - 100) + 100);
    let g = Math.floor(Math.random() * (255 - 100) + 100);
    
    pattern.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.6)`;
  }

  let patternCanvas = document.getElementById(`pattern-${channelIndex}-canvas`);
  let ctx = patternCanvas.getContext("2d");

  let patternCanvasBoundingRect = patternCanvas.getBoundingClientRect();
  let patternCanvasWidth = patternCanvasBoundingRect.right - patternCanvasBoundingRect.left;
  let patternCanvasHeight = patternCanvasBoundingRect.bottom - patternCanvasBoundingRect.top;

  let songPerc = (startStep - 1) / Timing.calcTotalStepCount();
  let songDurationMs = Timing.calcSongDurationMs();
  let noteLengthPerc = note.getDurationMs() / songDurationMs;

  let patternOctaveRange = channel.getPattern().getOctaveRange();
  let patternLowestOctave = channel.getPattern().getLowestOctave();

  let noteOctave = note.getOctave();
  let notePitchClass = note.getPitchClass();
  let notePitchValue = Ableton.notePitchClassValues.get(notePitchClass);

  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(
    patternCanvasWidth * songPerc,
    (1 - (notePitchValue + ((noteOctave - patternLowestOctave) * 12)) / (patternOctaveRange * 12)) * patternCanvasHeight,
    patternCanvasWidth * noteLengthPerc,
    patternCanvasHeight / (patternOctaveRange * 12)
  );
}

function redrawPattern(channelIndex) {
  let channel = Ableton.channelRack.getChannelAt(channelIndex);
  let pattern = document.getElementById(`pattern-${channelIndex}`);

  let patternCanvas = document.getElementById(`pattern-${channelIndex}-canvas`);
  let ctx = patternCanvas.getContext("2d");
  ctx.clearRect(0, 0, patternCanvas.width, patternCanvas.height);

  let hasNotes = false;

  for (let i = 0; i < Timing.calcTotalStepCount(); i++) {
    let notes = channel.getPattern().getNotes(i + 1);

    notes.forEach(note => {
      hasNotes = true;
      drawNote(channel, note, i + 1);
    });
  }

  if (!hasNotes) {
    pattern.style.visibility = "hidden";
  }
}

function resizePatternCanvases() {
  for (let i = 0; i < Ableton.channelRack.getChannelCount(); i++) {
    let pattern = document.getElementById(`pattern-${i}`);
    let patternCanvas = document.getElementById(`pattern-${i}-canvas`);

    let patternBoundingRect = pattern.getBoundingClientRect();
    let patternWidth = patternBoundingRect.right - patternBoundingRect.left;
    let patternHeight = patternBoundingRect.bottom - patternBoundingRect.top;

    patternCanvas.width = Math.floor(patternWidth);
    patternCanvas.height = Math.floor(patternHeight);

    redrawPattern(i);
  }
}
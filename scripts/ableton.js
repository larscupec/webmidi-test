import { TimeSignature } from "./ableton/time-signature.js";
import { ChannelRack } from "./ableton/channel-rack.js";
import { Player } from "./ableton/player.js";
import { Channel } from "./ableton/channel.js";
import { Timing } from "./ableton/timing.js";
import * as Voices from "./voices.js";

Timing.setBPM(document.getElementById("bpm-select").value);
Timing.setBarCount(4);
Timing.setTimeSignature(new TimeSignature(4, 4));

export const channelRack = new ChannelRack();

export const player = new Player(channelRack);

export const audioContext = Voices.audioContext;

export const voices = [
  Voices.acousticPiano, 
  Voices.electricPiano, 
  Voices.acousticBass, 
  Voices.electricBass,
  Voices.tr808,
];

const channel1 = new Channel("Track 1", Voices.tr808.clone());
const channel2 = new Channel("Track 2", Voices.electricBass.clone());
const channel3 = new Channel("Track 3", Voices.acousticPiano.clone());
const channel4 = new Channel("Track 4", Voices.acousticPiano.clone());

channelRack.add(channel1);
channelRack.add(channel2);
channelRack.add(channel3);
channelRack.add(channel4);

export const notePitchClassValues = new Map();

notePitchClassValues.set("C", 1);
notePitchClassValues.set("C#", 2);
notePitchClassValues.set("D", 3);
notePitchClassValues.set("D#", 4);
notePitchClassValues.set("E", 5);
notePitchClassValues.set("F", 6);
notePitchClassValues.set("F#", 7);
notePitchClassValues.set("G", 8);
notePitchClassValues.set("G#", 9);
notePitchClassValues.set("A", 10);
notePitchClassValues.set("A#", 11);
notePitchClassValues.set("B", 12);
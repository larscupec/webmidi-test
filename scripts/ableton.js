import { TimeSignature } from "./ableton/time-signature.js";
import { ChannelRack } from "./ableton/channel-rack.js";
import { Player } from "./ableton/player.js";
import { Channel } from "./ableton/channel.js";
import { Timing } from "./ableton/timing.js";
import * as Voices from "./voices/voices.js";

Timing.setBPM(document.getElementById("bpm-select").value);
Timing.setBarCount(4);
Timing.setTimeSignature(new TimeSignature(4, 4));

export const channelRack = new ChannelRack();
export const player = new Player(channelRack);
export const audioContext = Voices.audioContext;
export const voices = Voices.voices;

const channel1 = new Channel("Track 1", voices[8]);
const channel2 = new Channel("Track 2", voices[7]);
const channel3 = new Channel("Track 3", voices[0]);
const channel4 = new Channel("Track 4", voices[1]);

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

export { MidiFileWriter } from "./ableton/midi-file-writer.js";
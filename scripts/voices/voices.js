import { Instrument } from "../ableton/instrument.js";
import { TR808 } from "./tr808.js";
import { CasioRZ1 } from "./casiorz1.js";

export const audioContext = new AudioContext();

export const voices = [
    new Instrument("Acoustic Piano", 0, audioContext, "acoustic_grand_piano"),
    new Instrument("Electric Piano", 4, audioContext, "electric_piano_1"),
    new Instrument("Accordion", 21, audioContext, "accordion"),
    new Instrument("Overdriven Guitar", 29, audioContext, "overdriven_guitar"),
    new Instrument("Distortion Guitar", 30, audioContext, "distortion_guitar"),
    new Instrument("Acoustic Bass", 32, audioContext, "acoustic_bass"),
    new Instrument("Electric Bass", 33, audioContext, "electric_bass_finger"),
    new Instrument("Synth Bass", 38, audioContext, "synth_bass_1"),
    new TR808(audioContext),
    new CasioRZ1(audioContext),
];
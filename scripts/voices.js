import { AcousticPiano } from "./voices/acoustic-piano.js";
import { ElectricPiano } from "./voices/electric-piano.js";
import { OverdrivenGuitar } from "./voices/overdriven-guitar.js";
import { AcousticBass } from "./voices/acoustic-bass.js";
import { ElectricBass } from "./voices/electric-bass.js";
import { TR808 } from "./voices/tr808.js";
import { Accordion } from "./voices/accordion.js";
import { DistortionGuitar } from "./voices/distortion-guitar.js";

export const audioContext = new AudioContext();

// Pianos
export const acousticPiano = new AcousticPiano(audioContext);
export const electricPiano = new ElectricPiano(audioContext);
export const accordion = new Accordion(audioContext);

// Guitars
export const overdrivenGuitar = new OverdrivenGuitar(audioContext);
export const distortionGuitar = new DistortionGuitar(audioContext);

// Basses
export const acousticBass = new AcousticBass(audioContext);
export const electricBass = new ElectricBass(audioContext);

// Drums
export const tr808 = new TR808(audioContext);
import { AcousticPiano } from "./voices/acoustic-piano.js";
import { ElectricPiano } from "./voices/electric-piano.js";
import { AcousticBass } from "./voices/acoustic-bass.js";
import { ElectricBass } from "./voices/electric-bass.js";
import { TR808 } from "./voices/tr808.js";

export const audioContext = new AudioContext();

// Pianos
export const acousticPiano = new AcousticPiano(audioContext);
export const electricPiano = new ElectricPiano(audioContext);

// Basses
export const acousticBass = new AcousticBass(audioContext);
export const electricBass = new ElectricBass(audioContext);

// Drums
export const tr808 = new TR808(audioContext);
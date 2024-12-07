import { AcousticPiano } from "./voices/acoustic-piano.js"
import { TR808 } from "./voices/tr808.js";
import { AcousticBass } from "./voices/acoustic-bass.js";

export const audioContext = new AudioContext();

export const acousticPiano = new AcousticPiano(audioContext);
export const tr808 = new TR808(audioContext);
export const acousticBass = new AcousticBass(audioContext);
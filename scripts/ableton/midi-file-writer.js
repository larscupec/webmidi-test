import { Timing } from "./timing.js";

export class MidiFileWriter {
    #file = MIDIfw.createFile({
        tempo: Timing.getBPM(),
        timeSignature: [Timing.getTimeSignature().getUpperNumeral(), Timing.getTimeSignature().getLowerNumeral()]
    });

    addTrack(instrument, channel, pattern) {
        let track = MIDIfw.createTrack({
            channel: channel
        });

        track = track.setInstrument({
            time: 0,
            instrument: instrument
        });

        let time = 0;
        const TIME_PER_STEP = 24;
        let allNotes = [];

        for (let step = 1; step <= Timing.calcTotalStepCount(); step++) {
            const notes = pattern.getNotes(step);

            // First add all note starts
            for (const note of notes) {
                track = track.noteOn({
                    time: time,
                    note: note.getPitch(),
                    velocity: note.getVelocity()
                });
                time = 0;
                note["startStep"] = step;
            }

            allNotes = allNotes.concat(notes);

            // Then add note endings
            for (const note of allNotes) {
                let noteStartMs = Timing.convStepToTimeMs(note.startStep);
                let noteEndStep = Timing.quantizeTimeToStep(noteStartMs + note.getDurationMs(), "loose");

                if (step == noteEndStep) {
                    track = track.noteOff({
                        time: time,
                        note: note.getPitch()
                    });
                    time = 0;
                }
            }

            time += TIME_PER_STEP;
        }

        this.#file.addTrack(track);
    }

    save() {
        const link = document.createElement("a");
        link.download = "song.mid";
        link.href = this.#file.getDataURI();
        link.click();
    }
}